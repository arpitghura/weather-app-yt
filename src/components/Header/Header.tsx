import React from 'react';
import { Box, Typography, AppBar, Toolbar, Grid, Card } from '@mui/material';
import SearchBar from './SearchBar';
import DateFilter from '../DateFilter/DateFilter';

const Header: React.FC = () => {
  return (
    <Card 
      elevation={0}
      sx={{ 
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar sx={{ py: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <Typography 
              variant="h5" 
              component="h1"
              sx={{ 
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1a73e8 30%, #34a853 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Weather Forecast
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <SearchBar />
          </Grid>
          <Grid item xs={12} sm={12} md={3} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <DateFilter />
          </Grid>
        </Grid>
      </Toolbar>
    </Card>
  );
};

export default Header; 