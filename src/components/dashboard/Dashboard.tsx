"use client";
import SearchInput from "@/components/search/SearchInput";
import { ChangeEvent, useState } from "react";
import style from "./Search.module.scss";
import { Location } from "@/types/locations";
import List from "@/components/list/List";
import ListItem from "@/components/list/ListItem";
import LocationListItems from "@/components/list/LocationListItems";

const DashBoard = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleOnSearch = () => {
    console.log(searchValue);
  };

  const handleOnClickLocation = (location: Location) => {
    console.log(location);
  };

  return (
    <div className={style.searchContainer}>
      <SearchInput
        value={searchValue}
        onChange={handleOnInputChange}
        placeholder={"Search for a city"}
      />
      {locations.length > 0 ||
        (loading && (
          <List>
            <LocationListItems
              locations={locations}
              onClickLocation={handleOnClickLocation}
            />
          </List>
        ))}
    </div>
  );
};

export default DashBoard;
