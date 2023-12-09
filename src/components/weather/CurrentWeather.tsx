import { Weather } from "@/types/weather";
import style from "./CurrentWeather.module.scss";
import Icon from "@/components/icons/Icon";
import WeatherIcon from "@/components/icons/WeatherIcon";
import { getRainString, getTemperatureString } from "@/domain/weather";

const CurrentWeather = ({ locationName, weather }: CurrentWeatherProps) => {
  const dateNow = new Date();
  dateNow.setMinutes(0);
  const dateNowIsoString = dateNow.toISOString().substring(0, 10);
  const currentWeather = weather.hourly?.find(
    (hour) => hour.time.startsWith(dateNowIsoString)
  );

  if (!currentWeather) {
    return <div>no data</div>;
  }

  return (
    <div className={style.currentWeatherCard}>
      <div className={style.header}>
        <Icon icon="schedule" />
        <span>Weather now in {locationName}</span>
      </div>
      <div className={style.weatherInformation}>
        <WeatherIcon weatherType={currentWeather.weatherCode} />
        <div className={style.item}>
          <Icon icon="thermostat" />
          <span>{getTemperatureString(currentWeather.temperature)}</span>
        </div>
        <div className={style.item}>
          <Icon icon="water_drop" />
          <span>{getRainString(currentWeather.rain)}</span>
        </div>
        <div className={style.item}>
          <Icon icon="air" />
          <span>{currentWeather.windSpeed} m/s</span>
        </div>
      </div>
    </div>
  );
};

type CurrentWeatherProps = {
  locationName: string;
  weather: Weather;
};

export default CurrentWeather;
