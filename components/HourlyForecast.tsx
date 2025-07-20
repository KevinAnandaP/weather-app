'use client';

import React from 'react';

interface HourlyForecastProps {
  currentTemp: number;
}

export default function HourlyForecast({ currentTemp }: HourlyForecastProps) {
  // Generate hourly data for the next 24 hours
  const generateHourlyData = () => {
    const hours = [];
    const now = new Date();
    
    for (let i = 0; i < 24; i++) {
      const hour = new Date(now.getTime() + i * 60 * 60 * 1000);
      const temp = currentTemp + Math.floor(Math.random() * 10) - 5; // Vary temperature ±5°
      const isNight = hour.getHours() >= 19 || hour.getHours() <= 6;
      
      const conditions = ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain'];
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      
      const icons = isNight 
        ? ['/img/Moon.png', '/img/NightPartlyCloudy.png', '/img/NightCloudy.png', '/img/NightRainDrops.png']
        : ['/img/Sun.png', '/img/DayPartlyCloudyWithWind.png', '/img/DayCloudy.png', '/img/DayRainDrops.png'];
      
      hours.push({
        time: i === 0 ? 'Now' : hour.toLocaleTimeString('en-US', { hour: 'numeric', hour12: false }),
        temp,
        icon: icons[Math.floor(Math.random() * icons.length)],
        condition
      });
    }
    return hours;
  };

  const hourlyData = generateHourlyData();

  return (
    <div className="glass rounded-3xl p-4 lg:p-6 mb-4 lg:mb-6 weather-card animate-fade-in-up">
      <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-4 lg:mb-6 text-white/90">24-Hour Forecast</h3>
      
      <div className="overflow-x-auto">
        <div className="flex space-x-3 lg:space-x-4 pb-2" style={{ minWidth: 'max-content' }}>
          {hourlyData.map((hour, index) => (
            <div key={index} className="flex flex-col items-center space-y-1 lg:space-y-2 min-w-[60px] lg:min-w-[80px] text-center">
              <div className="text-xs lg:text-sm text-white/60 font-medium">
                {hour.time}
              </div>
              <div className="relative w-6 h-6 lg:w-8 lg:h-8">
                <img
                  src={hour.icon}
                  alt={hour.condition}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-sm lg:text-lg font-semibold text-white">
                {hour.temp}°
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
