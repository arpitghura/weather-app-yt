export interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    condition: string;
    precipitation: number;
    uvIndex: number;
    visibility: number;
    pressure: number;
  };
  forecast: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  highTemp: number;
  lowTemp: number;
  precipitation: number;
  condition: string;
  windSpeed: number;
  hourly: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  precipitation: number;
}

export interface Location {
  lat: number;
  lon: number;
  name: string;
  country: string;
} 