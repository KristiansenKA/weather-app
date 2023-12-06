import ListItem from "@/components/list/ListItem";
import { Location } from "@/types/locations";
import { ReactElement } from "react";

const LocationListItems = ({
  locations,
  onClickLocation,
}: LocationListItemsProps): ReactElement[] =>
  locations.map((location) => (
    <ListItem<Location>
      key={location.id}
      item={location}
      onClick={onClickLocation}
    >
      <span>{location.name}</span>
    </ListItem>
  ));

type LocationListItemsProps = {
  locations: Location[];
  onClickLocation: (location: Location) => void;
};

export default LocationListItems;
