import { ChangeEvent, ReactElement } from "react";
import style from './SearchInput.module.scss';
import clsx from "clsx";

const SearchInput = ({
  value,
  placeholder,
  openList,
  onChange,
}: SearchInputProps): ReactElement => (
  <input
    className={clsx(style.searchInput, openList && style.openList)}
    type="search"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

type SearchInputProps = {
  value: string;
  placeholder: string;
  openList?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default SearchInput;
