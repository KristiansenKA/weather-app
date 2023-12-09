"use client";
import SearchInput from "@/components/search/SearchInput";
import { ChangeEvent, useCallback, useState, useRef } from "react";
import style from "./Dashboard.module.scss";
import { Location } from "@/types/locations";
import List from "@/components/list/List";
import LocationListItems from "@/components/list/LocationListItems";
import { getLocations } from "@/domain/locations";
import { debounce } from "@/utils/common";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import DailyWeatherTable from "@/components/weather/DailyWeatherTable";
import Slider from "@/components/slider/Slider";

const DashBoard = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [showNumberOfDays, setShowNumberOfDays] = useState(4);
  const { data: locationsInLocalStorage, setData: setLocalStorageData } =
    useLocalStorage<Location[]>("locations");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleOnGetLocations = async (searchValue: string) => {
    setLoading(true);
    const locations = await getLocations(searchValue);
    locations.results && setLocations(locations.results);
    setLoading(false);
  };

  const debouncedGetLocations = debounce(handleOnGetLocations);

  const handleOnInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
      debouncedGetLocations(event.target.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locations]
  );

  const handleOnClickLocation = (location: Location) => {
    const locationInLocalStorage = locationsInLocalStorage?.find(
      (locationInLocalStorage) => locationInLocalStorage.id === location.id
    );
    if (!locationInLocalStorage) {
      setLocalStorageData([...(locationsInLocalStorage ?? []), location]);
    }
    const queryParams = new URLSearchParams({
      name: location.name,
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
    });
    router.push("/weather/location?" + queryParams);
  };

  const handleOnDrag = (source: number, target: number) => {
    const newLocations = [...(locationsInLocalStorage ?? [])];
    const [swapped] = newLocations.splice(source, 1);
    newLocations.splice(target, 0, swapped);
    setLocalStorageData(newLocations);
  };

  const handleOnDelete = (locationId: number) => {
    const newLocations = locationsInLocalStorage?.filter(
      (location) => location.id !== locationId
    );
    newLocations && setLocalStorageData(newLocations);
  };

  const openList = (locations.length > 0 || loading) && searchValue.length > 0;

  return (
    <div className={style.dashboardContainer}>
      <SearchInput
        ref={searchRef}
        value={searchValue}
        onChange={handleOnInputChange}
        placeholder={"Search for a city"}
        openList={openList}
      />
      {openList && (
        <List parentElement={searchRef}>
          <LocationListItems
            locations={locations}
            onClickLocation={handleOnClickLocation}
          />
        </List>
      )}
      {locationsInLocalStorage && locationsInLocalStorage.length > 0 && (
        <>
          <Slider
            min={1}
            max={7}
            value={showNumberOfDays}
            label={"Show number of days:"}
            onChange={(event) =>
              setShowNumberOfDays(parseInt(event.target.value))
            }
          />
          <DailyWeatherTable
            locations={locationsInLocalStorage}
            showNumberOfDays={showNumberOfDays}
            onDrag={handleOnDrag}
            onDelete={handleOnDelete}
          />
        </>
      )}
    </div>
  );
};

export default DashBoard;
