import { getWeather } from "@/domain/weather";
import useInterval from "@/hooks/useInterval";
import { Weather } from "@/types/weather";
import { useEffect, useState } from "react";

const useWeatherQuery = (
  latitude: string[],
  longitude: string[],
  foreCastLengthInDays = 1,
  hourly = true,
  daily?: boolean
): {
  data: Weather[];
  loading: boolean;
} => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Weather[]>([]);

  useEffect(() => {
    getWeatherInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foreCastLengthInDays])

  /** Update weather info once an hour */
  useInterval(
    () => {
      getWeatherInfo();
    },
    1000 * 60 * 60,
    true,
  );

  const getWeatherInfo = async () => {
    setLoading(true);
    const weatherData = await getWeather({
      latitude,
      longitude,
      foreCastLengthInDays,
      hourly,
      daily,
    });
    setData(weatherData);
    setLoading(false);
  };

  return {
    data,
    loading,
  };
};

export default useWeatherQuery;
