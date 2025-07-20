'use client';

import React from 'react';
import { WeatherData } from '@/types/weather';

interface WeatherDetailsProps {
  weather: WeatherData;
}

export default function WeatherDetails({ weather }: WeatherDetailsProps) {
  const getUVIndex = () => Math.floor(Math.random() * 11) + 1; // Mock UV index
  const getAirQuality = () => {
    const levels = ['Good', 'Moderate', 'Poor'];
    return levels[Math.floor(Math.random() * levels.length)];
  };

  const uvIndex = getUVIndex();
  const airQuality = getAirQuality();

  const getUVColor = (uv: number) => {
    if (uv <= 2) return 'text-green-400';
    if (uv <= 5) return 'text-yellow-400';
    if (uv <= 7) return 'text-orange-400';
    if (uv <= 10) return 'text-red-400';
    return 'text-purple-400';
  };

  const getAirQualityColor = (quality: string) => {
    switch (quality) {
      case 'Good': return 'text-green-400';
      case 'Moderate': return 'text-yellow-400';
      case 'Poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="glass rounded-3xl p-4 lg:p-6 mb-4 lg:mb-6 weather-card animate-fade-in-up">
      <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-4 lg:mb-6 text-white/90">Weather Details</h3>
      
      <div className="grid grid-cols-2 gap-3 lg:gap-6">
        {/* UV Index */}
        <div className="text-center">
          <div className="relative w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 lg:mb-3">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm lg:text-lg">UV</span>
            </div>
          </div>
          <div className="text-white/60 text-xs lg:text-sm xl:text-base mb-1">UV Index</div>
          <div className={`text-lg lg:text-xl xl:text-2xl font-bold ${getUVColor(uvIndex)}`}>
            {uvIndex}
          </div>
          <div className="text-xs text-white/50 mt-1">
            {uvIndex <= 2 ? 'Low' : uvIndex <= 5 ? 'Moderate' : uvIndex <= 7 ? 'High' : uvIndex <= 10 ? 'Very High' : 'Extreme'}
          </div>
        </div>

        {/* Air Quality */}
        <div className="text-center">
          <div className="relative w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 lg:mb-3">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs lg:text-sm">AQI</span>
            </div>
          </div>
          <div className="text-white/60 text-xs lg:text-sm xl:text-base mb-1">Air Quality</div>
          <div className={`text-sm lg:text-lg xl:text-xl font-bold ${getAirQualityColor(airQuality)}`}>
            {airQuality}
          </div>
          <div className="text-xs text-white/50 mt-1">
            {Math.floor(Math.random() * 100) + 1} AQI
          </div>
        </div>

        {/* Dew Point */}
        <div className="text-center">
          <div className="relative w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 lg:mb-3">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm lg:text-lg">💧</span>
            </div>
          </div>
          <div className="text-white/60 text-xs lg:text-sm xl:text-base mb-1">Dew Point</div>
          <div className="text-lg lg:text-xl xl:text-2xl font-bold text-cyan-400">
            {Math.round(weather.temperature - 5)}°
          </div>
        </div>

        {/* Cloud Cover */}
        <div className="text-center">
          <div className="relative w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 lg:mb-3">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm lg:text-lg">☁️</span>
            </div>
          </div>
          <div className="text-white/60 text-xs lg:text-sm xl:text-base mb-1">Cloud Cover</div>
          <div className="text-lg lg:text-xl xl:text-2xl font-bold text-gray-300">
            {Math.floor(Math.random() * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}
