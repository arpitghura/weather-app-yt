import React, { createContext, useContext, useState, useEffect } from 'react';
import { WeatherData, Location } from '../types/weather';
import { 
  getWeatherData, 
  getUserLocation, 
  searchLocation as searchLocationApi 
} from '../services/weatherService';

interface WeatherContextType {
  weatherData: WeatherData | null;
  currentLocation: Location | null;
  loading: boolean;
  error: string | null;
  searchLocation: (query: string) => Promise<void>;
  setSelectedDate: (date: Date) => void;
  setWeatherData: (data: WeatherData | null) => void;
  date: string;
  setDate: (date: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    initializeLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      fetchWeatherData(currentLocation, date);
    }
  }, [date]);

  const initializeLocation = async () => {
    try {
      setLoading(true);
      const location = await getUserLocation();
      setCurrentLocation(location);
      await fetchWeatherData(location, date);
    } catch (err) {
      setError('Failed to get weather data. Please try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (location: Location, selectedDate: string) => {
    try {
      setLoading(true);
      const data = await getWeatherData(location, selectedDate);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const searchLocation = async (query: string) => {
    try {
      setLoading(true);
      const locations = await searchLocationApi(query);
      
      if (locations.length > 0) {
        const selectedLocation = locations[0];
        setCurrentLocation(selectedLocation);
        await fetchWeatherData(selectedLocation, date);
      } else {
        setError('No locations found for your search');
      }
    } catch (err) {
      setError('Location search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const setSelectedDate = (selectedDate: Date) => {
    setDate(selectedDate.toISOString().split('T')[0]);
  };

  const value = {
    weatherData,
    currentLocation,
    loading,
    error,
    searchLocation,
    setSelectedDate,
    setWeatherData,
    date,
    setDate
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}; 