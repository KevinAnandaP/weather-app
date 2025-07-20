export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  low: number;
  high: number;
  description: string;
  icon: string;
  condition: string;
  sunrise: string;
  sunset: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  feelsLike: number;
}

export interface ForecastDay {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  dayName: string;
}

export interface ForecastData {
  city: string;
  country: string;
  forecast: ForecastDay[];
}

export interface CityWeatherSummary {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}
