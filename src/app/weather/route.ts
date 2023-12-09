import { NextRequest } from "next/server";

const DEFAULT_HOURLY_VARIABLES = "temperature_2m,weather_code,wind_speed_10m,rain";
const DEFAULT_DAILY_VARIABLES = "temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max,rain_sum";

export async function GET(request: NextRequest) {
  const latitude = request.nextUrl.searchParams.get("latitude");
  const longitude = request.nextUrl.searchParams.get("longitude");
  const forecastDays = request.nextUrl.searchParams.get("forecast_days");
  const hourly = request.nextUrl.searchParams.get("hourly");
  const daily = request.nextUrl.searchParams.get("daily");

  if (!latitude || !longitude) {
    return Response.json(
      {
        error: "Missing latitude or longitude query parameter",
      },
      { status: 400 }
    );
  }

  const urlSearchParams = new URLSearchParams({
    latitude,
    longitude,
    forecast_days: forecastDays || '1',
  });

  if (hourly === 'true') {
    urlSearchParams.append("hourly", DEFAULT_HOURLY_VARIABLES);
  }

  if (daily === 'true') {
    urlSearchParams.append("daily", DEFAULT_DAILY_VARIABLES);
  }

  const res = await fetch("https://api.open-meteo.com/v1/forecast?" + urlSearchParams);

  const data = await res.json();

  return Response.json(Array.isArray(data) ? data : [data]);
}