import { Weather } from "@/types/weather";
import { Location } from "@/types/locations";
import style from "./DailyWeatherRow.module.scss";
import WeatherIcon from "@/components/icons/WeatherIcon";
import IconButton from "@/components/icons/IconButton";
import { getTemperatureString } from "@/domain/weather";
import Draggable from "@/components/draggable/Draggable";
import clsx from "clsx";

const DailyWeatherRow = ({
  location,
  weather,
  showNumberOfDays,
  draggable,
  onDelete,
  onDrag,
}: DailyWeatherRowProps) => (
  <Draggable draggable={draggable} onDrag={onDrag}>
    <div className={style.dailyWeatherRow}>
      <span className={style.locationName}>{location.name}</span>
      <div className={clsx(style.dayContainer, style.item)}>
        {weather.daily?.slice(0, showNumberOfDays).map((day) => (
          <div key={day.time} className={style.day}>
            <WeatherIcon weatherType={day.weatherCode} />
            <span className={style.dayTemperature}>
              {getTemperatureString(day.temperatureMax)}
            </span>
          </div>
        ))}
      </div>
      <IconButton icon="delete" onClick={() => onDelete(location.id)} />
    </div>
  </Draggable>
);

type DailyWeatherRowProps = {
  showNumberOfDays: number;
  weather: Weather;
  location: Location;
  draggable: boolean;
  onDelete: (locationId: number) => void;
  onDrag: (source: number, target: number) => void;
};

export default DailyWeatherRow;
