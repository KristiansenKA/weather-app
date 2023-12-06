import { WeatherRequest } from "@/types/weather";

const DEFAULT_VARIABLES = "temperature_2m,weather_code"

export async function GET(request: WeatherRequest) {
  const urlSearchParams = new URLSearchParams({
    latitude: request.latitude.toString(),
    longitude: request.longitude.toString(),
    forecast_days: request.foreCastLengthInDays.toString(),
  });

  if (request.hourly) {
    urlSearchParams.append("hourly", DEFAULT_VARIABLES);
  }

  if (request.daily) {
    urlSearchParams.append("daily", DEFAULT_VARIABLES);
  }

  const res = await fetch("https://api.open-meteo.com/v1/forecast" + urlSearchParams);

  const data = await res.json();

  return Response.json(data);
}