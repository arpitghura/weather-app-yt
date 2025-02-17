import React from 'react';
import { TextField, Box } from '@mui/material';
import { useWeather } from '../../context/WeatherContext';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const DateFilter: React.FC = () => {
  const { date, setDate } = useWeather();

  return (
    <Box sx={{ maxWidth: 300, ml: 'auto' }}>
      <TextField
        type="date"
        value={date.split('T')[0]}
        onChange={(e) => setDate(new Date(e.target.value).toISOString())}
        fullWidth
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <CalendarTodayIcon sx={{ mr: 1, opacity: 0.7, fontSize: '1.2rem' }} />
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255,255,255,0.9)',
            borderRadius: 2,
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'rgba(255,255,255,1)',
            },
            '&.Mui-focused': {
              background: 'rgba(255,255,255,1)',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            }
          },
          '& .MuiOutlinedInput-input': {
            padding: '8px 14px',
          }
        }}
      />
    </Box>
  );
};

export default DateFilter; 