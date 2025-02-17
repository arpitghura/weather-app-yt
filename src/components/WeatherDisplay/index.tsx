import React, { useState } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
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

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!weatherData) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="info">No weather data available</Alert>
      </Box>
    );
  }

  const handleDaySelect = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2 }}>
      <CurrentWeather />
      <ForecastSection 
        forecast={weatherData.forecast}
        onDaySelect={handleDaySelect}
      />
    </Box>
  );
};

export default WeatherDisplay; 