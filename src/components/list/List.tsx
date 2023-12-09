import { ListItemProps } from "@/components/list/ListItem";
import {
  MutableRefObject,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import style from "./List.module.scss";
import Spinner from "@/components/loading/Spinner";

const List = <T,>({ loading, children, parentElement }: ListProps<T>) => {
  const { current } = parentElement;
  const [position, setPosition] = useState<
    Pick<DOMRect, "top" | "left" | "width" | "height"> | undefined
  >(undefined);

  
  const calculatePosition = useCallback(() => {
    if (!current) {
      return;
    }

    const { top, left, width, height } = current.getBoundingClientRect();

    return {
      top: top + height,
      left: left - width / 10,
      width,
      height,
    };
  }, [current]);

  useEffect(() => {
    const handleOnResize = () => {
      setPosition(calculatePosition());
    };

    handleOnResize();

    window.addEventListener("resize", handleOnResize);

    return () => {
      window.removeEventListener("resize", handleOnResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, calculatePosition]);

  return (
    <div
      style={{
        top: position?.top,
        left: position?.left
      }}
      className={style.list}
    >
      {loading ? <Spinner /> : children}
    </div>
  );
};

type ListProps<T> = {
  loading?: boolean;
  children: ReactElement<ListItemProps<T>>;
  parentElement: MutableRefObject<HTMLElement | null>;
};

export default List;
