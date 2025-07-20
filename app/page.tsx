'use client';

import React, { useState, useEffect } from 'react';
import CurrentWeather from '@/components/CurrentWeather';
import Forecast from '@/components/Forecast';
import SunTimes from '@/components/SunTimes';
import SearchBar from '@/components/SearchBar';
import OtherCities from '@/components/OtherCities';
import LoadingSpinner from '@/components/LoadingSpinner';
import Header from '@/components/Header';
import WeatherDetails from '@/components/WeatherDetails';
import HourlyForecast from '@/components/HourlyForecast';
import WeatherMaps from '@/components/WeatherMaps';
import { WeatherData, ForecastData, CityWeatherSummary } from '@/types/weather';

export default function HomePage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Sample other cities data with day/night variations
  const otherCities: CityWeatherSummary[] = [
    { city: 'New York', temperature: 18, condition: 'Partly Cloudy', icon: '/img/DayPartlyCloudyWithWind.png' },
    { city: 'London', temperature: 12, condition: 'Rainy', icon: '/img/NightRainy.png' },
    { city: 'Tokyo', temperature: 25, condition: 'Clear', icon: '/img/Sun.png' },
  ];

  const fetchWeatherData = async (city: string = 'Jakarta') => {
    try {
      setError(null);
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`/api/weather?city=${encodeURIComponent(city)}`),
        fetch(`/api/forecast?city=${encodeURIComponent(city)}`)
      ]);

      if (!weatherRes.ok || !forecastRes.ok) {
        throw new Error('City not found');
      }

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const handleSearch = async (city: string) => {
    setSearchLoading(true);
    await fetchWeatherData(city);
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-white/70 text-lg">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass rounded-3xl p-8 max-w-md mx-4">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Oops!</h2>
          <p className="text-white/70 mb-6">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              fetchWeatherData();
            }}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Mobile Layout */}
      <div className="max-w-md mx-auto lg:hidden">
        <SearchBar onSearch={handleSearch} isLoading={searchLoading} />
        
        {error && (
          <div className="glass rounded-2xl p-4 mb-6 border-l-4 border-red-400">
            <p className="text-red-400 font-medium">{error}</p>
          </div>
        )}
        
        {weather && (
          <>
            <CurrentWeather weather={weather} />
            {forecast && <Forecast forecast={forecast.forecast} />}
            <HourlyForecast currentTemp={weather.temperature} />
            <WeatherDetails weather={weather} />
            <WeatherMaps city={weather.city} />
            <SunTimes weather={weather} />
            <OtherCities cities={otherCities} />
          </>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block max-w-7xl mx-auto">
        <Header />
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={searchLoading} />
        </div>
        
        {error && (
          <div className="glass rounded-2xl p-4 mb-6 border-l-4 border-red-400 max-w-2xl">
            <p className="text-red-400 font-medium">{error}</p>
          </div>
        )}
        
        {weather && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Main Weather */}
            <div className="xl:col-span-2 space-y-6">
              <CurrentWeather weather={weather} />
              {forecast && <Forecast forecast={forecast.forecast} />}
              <HourlyForecast currentTemp={weather.temperature} />
              <WeatherMaps city={weather.city} />
            </div>
            
            {/* Right Column - Additional Info */}
            <div className="space-y-6">
              <SunTimes weather={weather} />
              <WeatherDetails weather={weather} />
              <OtherCities cities={otherCities} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
