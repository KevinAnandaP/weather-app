'use client';

import React from 'react';
import Image from 'next/image';
import { ForecastDay } from '@/types/weather';
import { getDayName } from '@/utils/weather';

interface ForecastProps {
  forecast: ForecastDay[];
}

export default function Forecast({ forecast }: ForecastProps) {
  return (
    <div className="glass rounded-3xl p-6 mb-6 weather-card animate-fade-in-up">
      <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-white/90">3-Day Forecast</h3>
      
      {/* Mobile Layout */}
      <div className="space-y-4 lg:hidden">
        {forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={day.icon}
                  alt={day.condition}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-medium text-white">
                  {getDayName(day.date)}
                </div>
                <div className="text-sm text-white/60 capitalize">
                  {day.condition}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-right">
              <div>
                <span className="text-white font-medium">{day.high}°</span>
                <span className="text-white/50 ml-2">{day.low}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {forecast.map((day, index) => (
          <div key={index} className="glass-strong rounded-2xl p-6 text-center weather-card">
            <div className="text-lg font-semibold text-white mb-2">
              {getDayName(day.date)}
            </div>
            <div className="relative w-16 h-16 mx-auto mb-4">
              <Image
                src={day.icon}
                alt={day.condition}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-sm text-white/70 capitalize mb-3">
              {day.condition}
            </div>
            <div className="flex justify-center items-center space-x-3">
              <span className="text-2xl font-bold text-white">{day.high}°</span>
              <span className="text-lg text-white/50">{day.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
