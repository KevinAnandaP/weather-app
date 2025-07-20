export const formatTime = (timeString: string): string => {
  return timeString;
};

export const getDayName = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
};

export const getGradientByCondition = (condition: string): string => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
    return 'from-orange-400 via-yellow-400 to-orange-600';
  } else if (conditionLower.includes('cloud')) {
    return 'from-slate-600 via-slate-700 to-slate-800';
  } else if (conditionLower.includes('rain') || conditionLower.includes('storm')) {
    return 'from-blue-600 via-blue-700 to-blue-900';
  } else if (conditionLower.includes('snow')) {
    return 'from-blue-100 via-blue-200 to-blue-400';
  } else {
    return 'from-slate-700 via-slate-800 to-slate-900';
  }
};

export const getTemperatureColor = (temp: number): string => {
  if (temp >= 30) return 'text-orange-400';
  if (temp >= 20) return 'text-yellow-400';
  if (temp >= 10) return 'text-green-400';
  if (temp >= 0) return 'text-blue-400';
  return 'text-cyan-400';
};
