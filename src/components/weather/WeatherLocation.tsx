import HourlyWeatherTable from "@/components/weather/HourlyWeatherTable";
import { Weather } from "@/types/weather";
import { ReactElement } from "react";
import style from "./WeatherLocation.module.scss";
import CurrentWeather from "@/components/weather/CurrentWeather";
import Spinner from "@/components/loading/Spinner";

const WeatherLocation = ({
  locationName,
  weather,
  loading,
}: WeatherLocationProps): ReactElement => (
  <div className={style.weatherNowContainer}>
    {weather && !loading && (
      <>
        <CurrentWeather locationName={locationName} weather={weather} />
        <HourlyWeatherTable weather={weather} />
      </>
    )}
    {loading && (
      <div className={style.loadingContainer}>
        <Spinner />
      </div>
    )}
  </div>
);

type WeatherLocationProps = {
  locationName: string;
  loading: boolean;
  weather?: Weather;
};

export default WeatherLocation;
