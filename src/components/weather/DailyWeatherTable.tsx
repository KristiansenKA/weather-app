import Spinner from "@/components/loading/Spinner";
import useWeatherQuery from "@/hooks/useWeatherQuery";
import { Location } from "@/types/locations";
import { Weather } from "@/types/weather";
import style from "./DailyWeatherTable.module.scss";
import DailyWeatherRow from "@/components/weather/DailyWeatherRow";
import { getWeekDayByIsoString } from "@/domain/weather";

const DailyWeatherTable = ({
  locations,
  showNumberOfDays,
  onClickLocation,
  onDelete,
  onDrag,
}: DailyWeatherTableProps) => {
  const { data, loading } = useWeatherQuery(
    locations.map((location) => location.latitude.toString()),
    locations.map((location) => location.longitude.toString()),
    showNumberOfDays,
    false,
    true
  );

  return (
    <div className={style.weatherTableContainer}>
      <div className={style.dailyWeatherTable}>
        {loading && <Spinner />}
        {!loading && (
          <>
            <div className={style.header}>
              {data.map((weather: Weather) => (
                <div
                  className={style.days}
                  key={weather.latitude + weather.longitude}
                >
                  {weather.daily?.slice(0, showNumberOfDays).map((day) => (
                    <span key={day.time}>
                      {getWeekDayByIsoString(day.time)}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            {data.map((weather: Weather, index) => {
              return (
                <DailyWeatherRow
                  key={locations[index].id}
                  location={locations[index]}
                  weather={weather}
                  showNumberOfDays={showNumberOfDays}
                  draggable={locations.length > 1}
                  onClickLocation={onClickLocation}
                  onDelete={onDelete}
                  onDrag={onDrag}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

type DailyWeatherTableProps = {
  locations: Location[];
  showNumberOfDays: number;
  onClickLocation: (location: Location) => void;
  onDelete: (locationId: number) => void;
  onDrag: (source: number, target: number) => void;
};

export default DailyWeatherTable;
