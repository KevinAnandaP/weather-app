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
    const fetchResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=24`
    );
    
    if (!fetchResponse.ok) {
      throw new Error('City not found');
    }
    
    const data = await fetchResponse.json();
    
    // Get timezone offset from city data
    const timezoneOffset = data.city.timezone || 0;
    
    // Group forecast by date and get daily data
    const dailyForecast = processForecastData(data.list, timezoneOffset);
    
    const forecastData = {
      city: data.city.name,
      country: data.city.country,
      forecast: dailyForecast.slice(0, 3) // Get next 3 days
    };
    
    const response = NextResponse.json(forecastData);
    
    // Add cache control headers
    response.headers.set('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch forecast data' },
      { status: 404 }
    );
  }
}

function processForecastData(forecastList: any[], timezoneOffset: number = 0) {
  const dailyData: { [key: string]: any } = {};
  
  forecastList.forEach((item) => {
    // Use timezone-aware date
    const date = new Date((item.dt + timezoneOffset) * 1000);
    const dateKey = date.toISOString().split('T')[0]; // Use ISO date format for consistency
    
    if (!dailyData[dateKey]) {
      dailyData[dateKey] = {
        date: dateKey,
        temps: [],
        conditions: [],
        icons: [],
      };
    }
    
    dailyData[dateKey].temps.push(item.main.temp);
    dailyData[dateKey].conditions.push(item.weather[0].main);
    dailyData[dateKey].icons.push(item.weather[0].icon);
  });
  
  return Object.values(dailyData).map((day: any) => {
    const temps = day.temps;
    const mostCommonCondition = getMostCommon(day.conditions);
    const mostCommonIcon = getMostCommon(day.icons);
    const dayDate = new Date(day.date + 'T12:00:00Z'); // Use noon UTC to avoid timezone issues
    
    return {
      date: dayDate.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        timeZone: 'UTC'
      }),
      high: Math.round(Math.max(...temps)),
      low: Math.round(Math.min(...temps)),
      condition: mostCommonCondition,
      icon: getLocalIcon(mostCommonIcon, mostCommonCondition),
      dayName: dayDate.toLocaleDateString('en-US', { 
        weekday: 'short',
        timeZone: 'UTC'
      })
    };
  });
}

function getMostCommon(arr: string[]): string {
  const frequency: { [key: string]: number } = {};
  arr.forEach(item => {
    frequency[item] = (frequency[item] || 0) + 1;
  });
  
  return Object.keys(frequency).reduce((a, b) => 
    frequency[a] > frequency[b] ? a : b
  );
}

function getLocalIcon(iconCode: string, condition: string): string {
  const isNight = iconCode.includes('n');
  const baseCondition = condition.toLowerCase();
  
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
