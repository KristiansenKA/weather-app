import { WeatherType } from "@/types/weather";
import { ReactElement } from "react";

const mapWeatherTypeToIcon = (weatherType: WeatherType): string => {
  switch (weatherType) {
    case WeatherType.ClearSky:
      return "sunny";
    case WeatherType.FewClouds:
      return "cloud";
    case WeatherType.Rain:
      return "rainy";
    case WeatherType.Thunderstorm:
      return "thunderstorm";
    case WeatherType.Snow:
      return "weather_snowy";
    case WeatherType.Mist:
      return "mist";
    default:
      return "sunny";
  }
};

const WeatherIcon = ({ weatherType }: WeatherIconProps): ReactElement => (
  <span className="material-symbols-outlined">
    {mapWeatherTypeToIcon(weatherType)}
  </span>
);

type WeatherIconProps = {
  weatherType: WeatherType;
};

export default WeatherIcon;