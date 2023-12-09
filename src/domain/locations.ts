import { API_PATH } from "@/constants/common";
import { LocationsResponse } from "@/types/locations";

const LOCATIONS_PATH = "/locations";

export const getLocations = async (
  name: string,
): Promise<LocationsResponse> => {
  const urlSearchParams = new URLSearchParams({
    name,
  });

  const res = await fetch(API_PATH + LOCATIONS_PATH + `?${urlSearchParams}`);

  const data = await res.json();
  return data;
};
