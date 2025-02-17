import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useWeather } from '../../context/WeatherContext';
import CurrentWeather from './CurrentWeather';
import ForecastSection from './ForecastSection';

const WeatherDisplay: React.FC = () => {
  const { weatherData, loading, error } = useWeather();
  const [selectedDate, setSelectedDate] = useState<string>('');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !weatherData) {
    return null;
  }

  const handleDaySelect = (date: string) => {
    setSelectedDate(date);
    // Additional logic for showing hourly data
  };

  return (
    <Box sx={{ mt: 4 }}>
      <CurrentWeather />
      <ForecastSection 
        forecast={weatherData.forecast}
        onDaySelect={handleDaySelect}
      />
    </Box>
  );
};

export default WeatherDisplay; 