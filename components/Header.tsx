'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="hidden lg:block mb-8">
      <div className="text-center">
        <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4">
          WeatherApp
        </h1>
        <p className="text-xl text-white/70">
          Real-time weather information and forecasts
        </p>
      </div>
    </header>
  );
}
