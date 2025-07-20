'use client';

import React from 'react';
import Image from 'next/image';
import { CityWeatherSummary } from '@/types/weather';

interface OtherCitiesProps {
  cities: CityWeatherSummary[];
}

export default function OtherCities({ cities }: OtherCitiesProps) {
  return (
    <div className="glass rounded-3xl p-4 lg:p-6 weather-card animate-fade-in-up">
      <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-3 lg:mb-4 text-white/90">Other Cities</h3>
      <div className="space-y-3 lg:space-y-4">
        {cities.map((city, index) => (
          <div key={index} className="flex items-center justify-between py-1 lg:py-2 xl:py-3">
            <div className="flex items-center space-x-3 lg:space-x-4 min-w-0 flex-1">
              <div className="relative w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex-shrink-0">
                <Image
                  src={city.icon}
                  alt={city.condition}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-white text-sm lg:text-base xl:text-lg truncate">{city.city}</div>
                <div className="text-xs lg:text-sm xl:text-base text-white/60 capitalize truncate">{city.condition}</div>
              </div>
            </div>
            <div className="text-xl lg:text-2xl xl:text-3xl font-semibold text-white flex-shrink-0">
              {city.temperature}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
