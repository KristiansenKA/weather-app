import { LocationsRequest } from "@/types/locations";

const DEFAULT_COUNT = 10;

export async function GET(request: LocationsRequest) {
  const urlSearchParams = new URLSearchParams({
    name: request.name,
    count: DEFAULT_COUNT.toString(),
  });

  const res = await fetch("https://geocoding-api.open-meteo.com/v1/search" + urlSearchParams);

  const data = await res.json();

  return Response.json(data);
}