import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'Jakarta';
  
  const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
  
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    const data = await response.json();
    
    const weatherData = {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      low: Math.round(data.main.temp_min),
      high: Math.round(data.main.temp_max),
      description: data.weather[0].description,
      icon: getLocalIcon(data.weather[0].icon, data.weather[0].main),
      condition: data.weather[0].main,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      feelsLike: Math.round(data.main.feels_like),
    };
    
    return NextResponse.json(weatherData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 404 }
    );
  }
}

function getLocalIcon(iconCode: string, condition: string): string {
  const isNight = iconCode.includes('n');
  const baseCondition = condition.toLowerCase();
  
  // Map OpenWeatherMap conditions to our local icons
  const iconMap: { [key: string]: string } = {
    // Clear sky
    'clear_day': '/img/Sun.png',
    'clear_night': '/img/Moon.png',
    
    // Few clouds / Partly cloudy
    'few_clouds_day': '/img/DayPartlyCloudyWithWind.png',
    'few_clouds_night': '/img/NightPartlyCloudy.png',
    
    // Scattered clouds
    'scattered_clouds_day': '/img/CloudySunnyClouds.png',
    'scattered_clouds_night': '/img/NightPartlyCloudy.png',
    
    // Broken/Overcast clouds
    'broken_clouds_day': '/img/DayCloudy.png',
    'broken_clouds_night': '/img/NightCloudy.png',
    
    // Light rain / Drizzle
    'light_rain_day': '/img/DayRainDrops.png',
    'light_rain_night': '/img/NightRainDrops.png',
    
    // Moderate rain
    'rain_day': '/img/DayRainy.png',
    'rain_night': '/img/NightRainy.png',
    
    // Heavy rain
    'heavy_rain_day': '/img/DayPartlyCloudyWithRain.png',
    'heavy_rain_night': '/img/NightPartlyCloudyWithRain.png',
    
    // Thunderstorm
    'thunderstorm_day': '/img/DayCloudWithLightning.png',
    'thunderstorm_night': '/img/NightCloudWithLightning.png',
    
    // Snow
    'snow_day': '/img/DayAngledRainy.png',
    'snow_night': '/img/NightAngledRainy.png',
    
    // Mist/Fog
    'mist_day': '/img/DayCloudWithWind.png',
    'mist_night': '/img/NightCloudWithWind.png',
    
    // Wind
    'wind_day': '/img/DayWindy.png',
    'wind_night': '/img/NightWindy.png',
  };
  
  // Determine the icon key based on condition and time of day
  let iconKey = '';
  
  if (baseCondition.includes('clear')) {
    iconKey = isNight ? 'clear_night' : 'clear_day';
  } else if (baseCondition.includes('few clouds')) {
    iconKey = isNight ? 'few_clouds_night' : 'few_clouds_day';
  } else if (baseCondition.includes('scattered clouds')) {
    iconKey = isNight ? 'scattered_clouds_night' : 'scattered_clouds_day';
  } else if (baseCondition.includes('broken clouds') || baseCondition.includes('overcast')) {
    iconKey = isNight ? 'broken_clouds_night' : 'broken_clouds_day';
  } else if (baseCondition.includes('shower rain') || baseCondition.includes('light rain')) {
    iconKey = isNight ? 'light_rain_night' : 'light_rain_day';
  } else if (baseCondition.includes('rain')) {
    if (baseCondition.includes('heavy')) {
      iconKey = isNight ? 'heavy_rain_night' : 'heavy_rain_day';
    } else {
      iconKey = isNight ? 'rain_night' : 'rain_day';
    }
  } else if (baseCondition.includes('thunderstorm')) {
    iconKey = isNight ? 'thunderstorm_night' : 'thunderstorm_day';
  } else if (baseCondition.includes('snow')) {
    iconKey = isNight ? 'snow_night' : 'snow_day';
  } else if (baseCondition.includes('mist') || baseCondition.includes('fog') || baseCondition.includes('haze')) {
    iconKey = isNight ? 'mist_night' : 'mist_day';
  } else if (baseCondition.includes('wind')) {
    iconKey = isNight ? 'wind_night' : 'wind_day';
  } else {
    // Default fallback based on general cloud conditions
    if (baseCondition.includes('cloud')) {
      iconKey = isNight ? 'broken_clouds_night' : 'broken_clouds_day';
    } else {
      iconKey = isNight ? 'clear_night' : 'clear_day';
    }
  }
  
  return iconMap[iconKey] || '/img/Sun.png';
}
