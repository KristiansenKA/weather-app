import * as React from 'react';
import {
  ReactElement,
  forwardRef,
  ReactNode,
  useState,
  useRef,
  MouseEvent,
  MutableRefObject,
} from 'react';
import clsx from 'clsx';
import style from './Draggable.module.scss';

const useDrag = (
  dragRef: MutableRefObject<HTMLDivElement | null>,
  onDrag: (source: number, target: number) => void,
  draggable: boolean,
) => {
  const [dragging, setDragging] = useState(false);
  const swapDrag = useRef({ source: 0, target: 0 });
  const currentDraggingEle = useRef<HTMLDivElement | null>(null);
  const position = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const isAbove = (nodeA: Element, nodeB: Element) => {
    // Get the bounding rectangle of nodes
    const rectA = nodeA?.getBoundingClientRect();
    const rectB = nodeB?.getBoundingClientRect();

    return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
  };

  const swap = (nodeA: Element, nodeB: Element) => {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB?.parentNode?.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA?.insertBefore(nodeB, siblingA);
  };

  const mouseMoveHandler = (e: Event) => {
    e.preventDefault();
    const ePage = e as unknown as MouseEvent;

    if (!currentDraggingEle.current) return;

    const draggingEle: HTMLElement = currentDraggingEle.current;

    const parentNodeEl = (
      draggingEle?.parentNode as HTMLDivElement
    ).getBoundingClientRect();

    // Calculate the mouse position
    draggingEle.classList.add('dragging');
    draggingEle.style.position = 'fixed';
    draggingEle.style.top = `${ePage.pageY - position.current.y}px`;
    draggingEle.style.left = `${parentNodeEl.x}px`;
    draggingEle.style.width = `${position.current.width}px`;
    draggingEle.style.height = `${position.current.height}px`;

    if (!dragging) {
      // Update the flag
      setDragging(true);

      // Let the placeholder take the height of dragging element
      // So the next element won't move up
      const node = document.getElementById('new-child-node');
      if (!node) {
        const placeholder = document.createElement('div');
        placeholder.id = 'new-child-node';
        placeholder.classList.add('placeholder');
        placeholder.classList.add('draggableItem');

        if (draggingEle?.parentNode) {
          draggingEle?.parentNode.insertBefore(
            placeholder,
            draggingEle.nextSibling,
          );
        }

        // Set the placeholder's height
        placeholder.style.height = `${position.current.height}px`;
      } else {
        const prevEle = draggingEle.previousElementSibling as HTMLDivElement;
        const nextEle = node.nextElementSibling as HTMLDivElement;

        // User moves item to the top
        if (prevEle && isAbove(draggingEle, prevEle)) {
          // The current order    -> The new order
          // prevEle              -> placeholder
          // draggingEle          -> draggingEle
          // placeholder          -> prevEle
          swap(node, draggingEle);
          swap(node, prevEle);

          swapDrag.current = {
            source: parseInt(draggingEle.dataset.id as string),
            target: parseInt(prevEle.dataset.id as string),
          };

          return;
        }

        // User moves the dragging element to the bottom
        if (nextEle && isAbove(nextEle, draggingEle)) {
          // The current order    -> The new order
          // draggingEle          -> nextEle
          // placeholder          -> placeholder
          // nextEle              -> draggingEle
          swap(nextEle, node);
          swap(nextEle, draggingEle);

          swapDrag.current = {
            source: parseInt(draggingEle.dataset.id as string),
            target: parseInt(nextEle.dataset.id as string),
          };
        }
      }
    }
  };

  const mouseUpHandler = () => {
    if (!currentDraggingEle?.current) return;

    setDragging(false);

    // Remove the position styles
    const draggingEle: HTMLElement = currentDraggingEle?.current;
    draggingEle?.classList.remove('dragging');
    draggingEle.style.removeProperty('top');
    draggingEle.style.removeProperty('left');
    draggingEle.style.removeProperty('width');
    draggingEle.style.removeProperty('height');
    draggingEle.style.removeProperty('position');

    const node = document.getElementById('new-child-node');
    if (node?.parentNode) {
      node.parentNode.removeChild(node);
    }

    currentDraggingEle.current = null;
    position.current = { x: 0, y: 0, width: 0, height: 0 };

    if (swapDrag.current.source !== swapDrag.current.target)
      onDrag(swapDrag.current.source, swapDrag.current.target);
    swapDrag.current = { source: 0, target: 0 };

    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  function handleMouseDown(e: MouseEvent) {
    currentDraggingEle.current =
      dragRef && dragRef?.current?.contains(e.target as HTMLDivElement)
        ? dragRef.current
        : (e.target as HTMLDivElement);

    // Calculate the mouse position
    const rect = (
      currentDraggingEle?.current as unknown as HTMLDivElement
    ).getBoundingClientRect();
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top;
    const width = rect.width;
    const height = rect.height;
    position.current = { x, y, width, height };

    setDragging(true);

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  const bindTrigger = {
    onMouseDown: draggable
      ? handleMouseDown
      : () => {
          return;
        },
  };

  return bindTrigger;
};

const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  (
    {
      children,
      className,
      draggable = true,
      onDrag,
      ...props
    },
    ref,
  ): ReactElement => {
    const dragUseRef = useRef<HTMLDivElement | null>(null);

    const dragRef =
      typeof ref === 'function'
        ? (ref as unknown as MutableRefObject<HTMLDivElement>)
        : ref
        ? ref
        : dragUseRef;

    const { onMouseDown } = useDrag(dragRef, onDrag, draggable);

    return (
      <div
        draggable={draggable}
        onMouseDown={onMouseDown}
        ref={dragRef}
        {...props}
      >
        <div
          className={clsx(
            className,
            draggable && style.draggableItem,
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);

Draggable.displayName = 'Draggable';

export interface DraggableProps {
  children: ReactNode;
  className?: string;
  draggable?: boolean;
  onDrag(source: number, target: number): void;
}

export default Draggable;
