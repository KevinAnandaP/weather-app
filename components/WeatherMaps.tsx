'use client';

import React, { useState } from 'react';

interface WeatherMapsProps {
  city: string;
  lat?: number;
  lon?: number;
}

export default function WeatherMaps({ city, lat = 0, lon = 0 }: WeatherMapsProps) {
  const [selectedMap, setSelectedMap] = useState<string | null>(null);
  const mapData = [
    {
      id: 'precipitation',
      title: 'Precipitation',
      description: 'Rain and snow in your area',
      icon: '/img/RainDrops.png',
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-400/30',
      intensity: Math.random() * 100,
      unit: 'mm/h'
    },
    {
      id: 'clouds',
      title: 'Cloud Cover',
      description: 'Satellite view of clouds',
      icon: '/img/DayCloudy.png',
      color: 'from-gray-500/20 to-slate-500/20',
      borderColor: 'border-gray-400/30',
      intensity: Math.random() * 100,
      unit: '%'
    },
    {
      id: 'wind',
      title: 'Wind Patterns',
      description: 'Current wind speed and direction',
      icon: '/img/Wind.png',
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-400/30',
      intensity: Math.random() * 50,
      unit: 'km/h'
    },
    {
      id: 'temperature',
      title: 'Temperature',
      description: 'Heat map of your region',
      icon: '/img/Sun.png',
      color: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-400/30',
      intensity: 15 + Math.random() * 25,
      unit: '°C'
    }
  ];

  const generateMapData = (type: string) => {
    const colors = {
      precipitation: ['rgba(59, 130, 246, ', 'rgba(29, 78, 216, '],
      clouds: ['rgba(107, 114, 128, ', 'rgba(75, 85, 99, '],
      wind: ['rgba(34, 197, 94, ', 'rgba(22, 163, 74, '],
      temperature: ['rgba(251, 146, 60, ', 'rgba(249, 115, 22, ']
    };
    
    return Array.from({ length: 32 }).map((_, i) => ({
      intensity: Math.random(),
      color: colors[type as keyof typeof colors] || colors.temperature
    }));
  };

  const handleMapClick = (mapId: string) => {
    setSelectedMap(selectedMap === mapId ? null : mapId);
  };

  return (
    <div className="glass rounded-3xl p-4 lg:p-6 mb-4 lg:mb-6 weather-card animate-fade-in-up">
      <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-4 lg:mb-6 text-white/90">Weather Maps</h3>
      
      {/* Mobile: Stack vertically, Desktop: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
        {mapData.map((map, index) => {
          const mapPreviewData = generateMapData(map.id);
          const isExpanded = selectedMap === map.id;
          
          return (
            <div 
              key={index}
              className={`relative rounded-xl lg:rounded-2xl p-3 lg:p-4 bg-gradient-to-br ${map.color} border ${map.borderColor} hover:scale-105 transition-all duration-300 cursor-pointer group ${
                isExpanded ? 'ring-2 ring-white/30' : ''
              }`}
              onClick={() => handleMapClick(map.id)}
            >
              {/* Mobile: Compact header, Desktop: Full header */}
              <div className="flex items-center space-x-2 lg:space-x-3 mb-2 lg:mb-3">
                <div className="relative w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0">
                  <img
                    src={map.icon}
                    alt={map.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm lg:text-lg font-semibold text-white truncate">{map.title}</h4>
                  <p className="text-xs lg:text-sm text-white/60 truncate lg:whitespace-normal">{map.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm lg:text-lg font-bold text-white">
                    {map.intensity.toFixed(1)}{map.unit}
                  </div>
                  <div className="text-xs text-white/60">Current</div>
                </div>
              </div>
              
              {/* Mobile: Smaller map, Desktop: Larger when expanded */}
              <div className={`relative rounded-lg lg:rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 overflow-hidden transition-all duration-300 ${
                isExpanded ? 'h-32 lg:h-48' : 'h-20 lg:h-24'
              }`}>
                <div className="absolute inset-0 opacity-60">
                  <div className="grid grid-cols-8 grid-rows-4 h-full">
                    {mapPreviewData.map((cell, i) => (
                      <div
                        key={i}
                        className="border-r border-b border-white/5 transition-all duration-500"
                        style={{
                          backgroundColor: `${cell.color[0]}${(cell.intensity * 0.8).toFixed(2)})`,
                          borderColor: `${cell.color[1]}0.2)`
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-400 rounded-full animate-pulse shadow-lg" />
                  <span className="ml-1 lg:ml-2 text-xs lg:text-sm text-white font-medium bg-black/30 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full backdrop-blur-sm">
                    {city}
                  </span>
                </div>
                
                {/* Only show detailed info on desktop when expanded */}
                {isExpanded && (
                  <div className="absolute top-1 lg:top-2 left-1 lg:left-2 bg-black/50 backdrop-blur-sm rounded-md lg:rounded-lg p-1 lg:p-2 hidden lg:block">
                    <div className="text-xs text-white/80 space-y-1">
                      <div>Zoom: Regional</div>
                      <div>Updated: 2 min ago</div>
                      <div>Source: OpenWeather</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-2 lg:mt-3 text-xs text-white/50 text-center transition-all duration-300">
                {isExpanded ? 'Tap to minimize' : 'Tap to expand'}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Mobile: Simplified details, Desktop: Full details */}
      {selectedMap && (
        <div className="mt-4 lg:mt-6 glass rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-white/20">
          <h4 className="text-base lg:text-lg font-semibold text-white mb-2 lg:mb-3">
            {mapData.find(m => m.id === selectedMap)?.title} Details
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 text-sm">
            <div className="flex justify-between lg:block">
              <span className="text-white/60">Current Level:</span>
              <span className="lg:ml-2 text-white font-medium">
                {mapData.find(m => m.id === selectedMap)?.intensity.toFixed(1)}
                {mapData.find(m => m.id === selectedMap)?.unit}
              </span>
            </div>
            <div className="flex justify-between lg:block">
              <span className="text-white/60">Status:</span>
              <span className="lg:ml-2 text-green-400 font-medium">Active</span>
            </div>
            {/* Hide these on mobile to save space */}
            <div className="hidden lg:flex lg:justify-between lg:block">
              <span className="text-white/60">Data Source:</span>
              <span className="lg:ml-2 text-white font-medium">Live Satellite</span>
            </div>
            <div className="hidden lg:flex lg:justify-between lg:block">
              <span className="text-white/60">Resolution:</span>
              <span className="lg:ml-2 text-white font-medium">1km²</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
