import { API_PATH } from "@/constants/common";
import { Weather, WeatherRequest, WeatherResponse } from "@/types/weather";

const WEATHER_PATH = "/weather";

export const getWeather = async ({
  latitude,
  longitude,
  foreCastLengthInDays,
  hourly,
  daily,
}: WeatherRequest): Promise<Weather[]> => {
  const urlSearchParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    forecast_days: foreCastLengthInDays.toString(),
    hourly: hourly?.toString() ?? "false",
    daily: daily?.toString() ?? "false",
  });
  const res = await fetch(API_PATH + WEATHER_PATH + `?${urlSearchParams}`);

  const data: WeatherResponse = await res.json();

  const weather: Weather[] = [];

  for (let i = 0; i < data.length; i++) {
    const hourlyWeather = [];
    const dailyWeather = [];
    if (data[i].hourly) {
      for (let j = 0; j < data[i].hourly.time.length; j++) {
        hourlyWeather.push({
          time: data[i].hourly.time[j],
          temperature: data[i].hourly.temperature_2m[j],
          weatherCode: data[i].hourly.weather_code[j],
          rain: data[i].hourly.rain[j],
          windSpeed: data[i].hourly.wind_speed_10m[j],
        });
      }
    }
    if (data[i].daily) {
      for (let j = 0; j < data[i].daily.time.length; j++) {
        dailyWeather.push({
          time: data[i].daily.time[j],
          temperatureMax: data[i].daily.temperature_2m_max[j],
          temperatureMin: data[i].daily.temperature_2m_min[j],
          weatherCode: data[i].daily.weather_code[j],
          rain: data[i].daily.rain_sum[j],
          windSpeed: data[i].daily.wind_speed_10m_max[j],
        });
      }
    }
    weather.push({
      latitude: data[i].latitude,
      longitude: data[i].longitude,
      hourly: hourlyWeather,
      daily: dailyWeather,
    });
  }
  return weather;
};

export const getTemperatureString = (temperature: number): string => {
  return temperature.toFixed(1) + "°C";
};

export const getRainString = (rain: number): string => {
  return rain.toFixed(1) + "mm";
};

export const getWindSpeedString = (windSpeed: number): string => {
  return windSpeed.toFixed(1) + "m/s";
};

export const getTimeByIsoString = (isoString: string): string => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  return hours + ":" + minutes.substring(-2);
};

export const getWeekDayByIsoString = (isoString: string): string => {
  const date = new Date(isoString);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
};
