import { ChangeEvent, MutableRefObject, ReactElement, forwardRef } from "react";
import style from './SearchInput.module.scss';
import clsx from "clsx";

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  value,
  placeholder,
  openList,
  onChange,
}, ref): ReactElement => (
  <input
    ref={ref}
    className={clsx(style.searchInput, openList && style.openList)}
    type="search"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
));

SearchInput.displayName = "SearchInput";

type SearchInputProps = {
  value: string;
  placeholder: string;
  openList?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default SearchInput;
