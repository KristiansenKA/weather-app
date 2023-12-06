import { WeatherCode, WeatherType } from "@/types/weather";

export const WEATHER_CODES: WeatherCode[] = [
  {
    code: [0],
    weatherType: WeatherType.ClearSky,
  },
  {
    code: [1, 2, 3],
    weatherType: WeatherType.FewClouds,
  },
  {
    code: [45, 48],
    weatherType: WeatherType.Mist,
  },
  {
    code: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
    weatherType: WeatherType.Rain,
  },
  {
    code: [71, 73, 75, 77, 80, 81, 82, 85, 86],
    weatherType: WeatherType.Snow,
  },
  {
    code: [95, 96, 99],
    weatherType: WeatherType.Thunderstorm,
  },
];
