'use client';

import React from 'react';
import Image from 'next/image';
import { WeatherData } from '@/types/weather';

interface SunTimesProps {
  weather: WeatherData;
}

export default function SunTimes({ weather }: SunTimesProps) {
  return (
    <div className="glass rounded-3xl p-4 lg:p-6 mb-4 lg:mb-6 weather-card animate-fade-in-up">
      <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-4 lg:mb-6 text-white/90">Sun & Moon</h3>
      <div className="grid grid-cols-2 gap-3 lg:gap-6">
        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="relative w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 flex-shrink-0">
            <Image
              src="/img/SunRise.png"
              alt="Sunrise"
              fill
              className="object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="text-white/60 text-xs lg:text-sm xl:text-base">Sunrise</div>
            <div className="text-base lg:text-xl xl:text-2xl font-semibold text-orange-400">
              {weather.sunrise}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="relative w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 flex-shrink-0">
            <Image
              src="/img/SunSet.png"
              alt="Sunset"
              fill
              className="object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="text-white/60 text-xs lg:text-sm xl:text-base">Sunset</div>
            <div className="text-base lg:text-xl xl:text-2xl font-semibold text-orange-400">
              {weather.sunset}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-white/20">
        <div className="grid grid-cols-2 gap-3 lg:gap-4 xl:gap-6">
          <div>
            <div className="text-white/60 text-xs lg:text-sm xl:text-base">Pressure</div>
            <div className="text-sm lg:text-lg xl:text-xl font-medium">{weather.pressure} hPa</div>
          </div>
          <div className="text-right lg:text-left">
            <div className="text-white/60 text-xs lg:text-sm xl:text-base">Visibility</div>
            <div className="text-sm lg:text-lg xl:text-xl font-medium">10 km</div>
          </div>
        </div>
      </div>
    </div>
  );
}
