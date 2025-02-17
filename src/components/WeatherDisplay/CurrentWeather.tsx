import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { useWeather } from '../../context/WeatherContext';
import { getWeatherGradient } from '../../utils/weatherUtils';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SpeedIcon from '@mui/icons-material/Speed';

const CurrentWeather: React.FC = () => {
  const { weatherData, currentLocation } = useWeather();

  if (!weatherData || !currentLocation) {
    return null;
  }

  const { current } = weatherData;
  const gradient = getWeatherGradient(current.condition, current.temperature);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const WeatherProperty = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      '& .MuiSvgIcon-root': {
        fontSize: '1.2rem',
        opacity: 0.9
      }
    }}>
      {icon}
      <Typography>
        {label}: {value}
      </Typography>
    </Box>
  );

  return (
    <Card 
      elevation={0}
      sx={{
        background: gradient.background,
        color: gradient.color,
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        '& .MuiTypography-root': {
          color: gradient.color
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          borderRadius: 'inherit'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">
            {currentLocation.name}
            {currentLocation.country && `, ${currentLocation.country}`}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="subtitle1">
              {getCurrentTime()}
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h2">{Math.round(current.temperature)}°C</Typography>
              <Typography variant="h6">{current.condition}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1.5,
              '& .MuiTypography-root': {
                opacity: 0.9
              }
            }}>
              <WeatherProperty 
                icon={<WaterDropIcon />} 
                label="Humidity" 
                value={`${current.humidity}%`}
              />
              <WeatherProperty 
                icon={<AirIcon />} 
                label="Wind" 
                value={`${current.windSpeed} km/h ${current.windDirection}`}
              />
              <WeatherProperty 
                icon={<WbSunnyIcon />} 
                label="UV Index" 
                value={`${current.uvIndex}`}
              />
              <WeatherProperty 
                icon={<VisibilityIcon />} 
                label="Visibility" 
                value={`${current.visibility} km`}
              />
              <WeatherProperty 
                icon={<SpeedIcon />} 
                label="Pressure" 
                value={`${current.pressure} mb`}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather; 