import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { ForecastDay } from '../../types/weather';
import { getWeatherGradient } from '../../utils/weatherUtils';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';

interface ForecastSectionProps {
  forecast: ForecastDay[];
  onDaySelect: (date: string) => void;
}

const ForecastSection: React.FC<ForecastSectionProps> = ({ forecast, onDaySelect }) => {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2 
      }}>
        <Typography variant="h6">
          7-Day Forecast
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          color: 'text.secondary'
        }}>
          <AccessTimeIcon fontSize="small" />
          <Typography variant="body2">
            Last updated: {getCurrentTime()}
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {forecast.map((day) => {
          const gradient = getWeatherGradient(day.condition, day.highTemp);
          
          return (
            <Grid item xs={12} sm={6} md={3} key={day.date}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  position: 'relative',
                  background: gradient.background,
                  color: gradient.color,
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
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
                onClick={() => onDaySelect(day.date)}
              >
                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}
                  >
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 'bold',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        {Math.round(day.highTemp)}°
                      </Typography>
                      <Typography 
                        sx={{ 
                          fontSize: '1.1rem',
                          opacity: 0.9,
                          textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                        }}
                      >
                        {Math.round(day.lowTemp)}°
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mt: 1,
                        fontWeight: 'medium',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                      }}
                    >
                      {day.condition}
                    </Typography>
                    <Box sx={{ 
                      mt: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5
                    }}>
                      <Typography sx={{ 
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        opacity: 0.9,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                      }}>
                        <Box sx={{ 
                          width: '60px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}>
                          <WaterDropIcon sx={{ fontSize: '1rem' }} />
                          <span>Rain:</span>
                        </Box>
                        {day.precipitation}mm
                      </Typography>
                      <Typography sx={{ 
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        opacity: 0.9,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                      }}>
                        <Box sx={{ 
                          width: '60px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}>
                          <AirIcon sx={{ fontSize: '1rem' }} />
                          <span>Wind:</span>
                        </Box>
                        {Math.round(day.windSpeed)} km/h
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ForecastSection; 