export type Weather = {
  latitude: number;
  longitude: number;
  hourly: {
    time: number;
    temperature: number;
    weatherCode: number;
  }[],
  daily: {
    time: number;
    temperatureMax: number;
    temperatureMin: number;
    weatherCodes: number;
  }[],
}

export type WeatherRequest = {
  latitude: number[];
  longitude: number[];
  hourly: boolean;
  daily: boolean;
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
  generationtime_ms: number
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
    time: number[];
    temperature_2m: number[];
    weather_code: number[];
  };
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  daily: {
    time: number[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}[];
