import { ListItemProps } from "@/components/list/ListItem";
import { ReactElement } from "react";
import style from "./List.module.scss";
import Spinner from "@/components/loading/Spinner";

const List = <T,>({ loading, children }: ListProps<T>) => {
  return <div className={style.list}>{loading ? <Spinner /> : children}</div>;
};

type ListProps<T> = {
  loading?: boolean;
  children: ReactElement<ListItemProps<T>>;
};

export default List;
