export type Weather = {
  latitude: number;
  longitude: number;
  hourly?: {
    time: string;
    temperature: number;
    weatherCode: number;
    rain: number;
    windSpeed: number;
  }[];
  daily?: {
    time: string;
    temperatureMax: number;
    temperatureMin: number;
    weatherCode: number;
    rain: number;
    windSpeed: number;
  }[];
};

export type WeatherRequest = {
  latitude: string[];
  longitude: string[];
  hourly?: boolean;
  daily?: boolean;
  foreCastLengthInDays: number;
};

export type WeatherCode = {
  code: number[];
  weatherType: WeatherType;
};

export enum WeatherType {
  ClearSky = 0,
  FewClouds = 1,
  Rain = 2,
  Thunderstorm = 3,
  Snow = 4,
  Mist = 5,
}

export type WeatherResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    temperature_2m: string;
    weather_code: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    wind_speed_10m: number[];
    rain: number[];
  };
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    wind_speed_10m_max: number;
    rain_sum: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    wind_speed_10m_max: number[];
    rain_sum: number[];
  };
}[];
