'use client';

import React from 'react';
import Image from 'next/image';
import { WeatherData } from '@/types/weather';
import { getTemperatureColor } from '@/utils/weather';

interface CurrentWeatherProps {
  weather: WeatherData;
}

export default function CurrentWeather({ weather }: CurrentWeatherProps) {
  return (
    <div className="glass rounded-3xl p-8 mb-6 weather-card animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">{weather.city}</h1>
          <p className="text-white/70 text-lg lg:text-xl capitalize">{weather.description}</p>
        </div>
        <div className="relative w-24 h-24 lg:w-32 lg:h-32">
          <Image
            src={weather.icon}
            alt={weather.description}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline">
          <span className={`text-7xl lg:text-8xl font-thin ${getTemperatureColor(weather.temperature)}`}>
            {weather.temperature}
          </span>
          <span className="text-3xl lg:text-4xl font-light text-white/60 ml-2">°C</span>
        </div>
        <div className="text-right">
          <div className="text-white/70 text-sm lg:text-base mb-1">Feels like</div>
          <div className="text-2xl lg:text-3xl font-medium">{weather.feelsLike}°</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 text-center border-t border-white/20 pt-6">
        <div>
          <div className="text-white/60 text-sm lg:text-base mb-1">Low</div>
          <div className="text-xl lg:text-2xl font-medium">{weather.low}°</div>
        </div>
        <div>
          <div className="text-white/60 text-sm lg:text-base mb-1">High</div>
          <div className="text-xl lg:text-2xl font-medium">{weather.high}°</div>
        </div>
        <div>
          <div className="text-white/60 text-sm lg:text-base mb-1">Humidity</div>
          <div className="text-xl lg:text-2xl font-medium">{weather.humidity}%</div>
        </div>
        <div>
          <div className="text-white/60 text-sm lg:text-base mb-1">Wind</div>
          <div className="text-xl lg:text-2xl font-medium">{Math.round(weather.windSpeed)} km/h</div>
        </div>
      </div>
    </div>
  );
}
