import { ReactElement } from "react";
import style from './List.module.scss';

const ListItem = <T,>({ item, children, onClick}: ListItemProps<T>): ReactElement => {
  return (
    <div className={style.listItem} onClick={() => onClick(item)}>
      {children}
    </div>
  );
}

export type ListItemProps<T> = {
  item: T;
  children: ReactElement;
  onClick: (item: T) => void;
}

export default ListItem;