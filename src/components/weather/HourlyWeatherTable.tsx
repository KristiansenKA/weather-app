import { Weather } from "@/types/weather";
import style from "./HourlyWeatherTable.module.scss";
import WeatherIcon from "@/components/icons/WeatherIcon";
import {
  getRainString,
  getTemperatureString,
  getTimeByIsoString,
  getWindSpeedString,
} from "@/domain/weather";

const WindSpeed = ({ windSpeed }: { windSpeed: number }) => {
  return <span className={style.wind}>{getWindSpeedString(windSpeed)}</span>;
};

const Rain = ({ rain }: { rain: number }) => {
  return <span className={style.rain}>{getRainString(rain)}</span>;
};

const WeatherType = ({ weatherType }: { weatherType: number }) => {
  return (
    <span className={style.weather}>
      <WeatherIcon weatherType={weatherType} />
    </span>
  );
};
const HourlyWeatherTable = ({ weather }: WeatherTableProps) => (
  <div className={style.weatherTableContainer}>
    <div className={style.hourlyWeatherTable}>
      <div className={style.header}>
        <span className={style.weatherHeader}>Weather</span>
        <span className={style.tempHeader}>Temperature</span>
        <span className={style.windHeader}>Wind</span>
        <span className={style.rainHeader}>Rain</span>
      </div>
      {weather.hourly?.map((hour, index) => (
        <div className={style.weatherRow} key={index}>
          <span className={style.time}>{getTimeByIsoString(hour.time)}</span>
          <WeatherType weatherType={hour.weatherCode} />
          <span className={style.temp}>
            {getTemperatureString(hour.temperature)}
          </span>
          <WindSpeed windSpeed={hour.windSpeed} />
          <Rain rain={hour.rain} />
        </div>
      ))}
    </div>
  </div>
);

type WeatherTableProps = {
  weather: Weather;
};

export default HourlyWeatherTable;
