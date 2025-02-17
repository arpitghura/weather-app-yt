import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';
import Header from './components/Header/Header';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a73e8',
    },
    background: {
      default: '#f8fafc',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
        }
      }
    }
  },
  shape: {
    borderRadius: 12
  }
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WeatherProvider>
        <Box sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #f0f7ff 0%, #f8fafc 100%)',
          py: 3
        }}>
          <Container maxWidth="lg">
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}>
              <Header />
              <WeatherDisplay />
            </Box>
          </Container>
        </Box>
      </WeatherProvider>
    </ThemeProvider>
  );
};

export default App; 