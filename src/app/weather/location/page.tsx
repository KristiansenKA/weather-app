'use client';
import WeatherLocation from "@/components/weather/WeatherLocation";
import useWeatherQuery from "@/hooks/useWeatherQuery";

export default function Location({
  searchParams,
}: {
  searchParams: { latitude?: string; longitude?: string; name?: string };
}) {
  const { latitude, longitude, name } = searchParams;
  const { data, loading } = useWeatherQuery(
    [latitude ?? ''],
    [longitude ?? '']
  );

  return (
    <div>
      <WeatherLocation
        loading={loading}
        locationName={name ?? ''}
        weather={data[0]}
      />
    </div>
  );
}
