import { WeatherData, Location } from '../types/weather';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

// Default location (Delhi, India)
const DEFAULT_LOCATION: Location = {
  lat: 28.6139,
  lon: 77.2090,
  name: 'Delhi',
  country: 'India'
};

export const getUserLocation = async (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      resolve(DEFAULT_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Get location name from coordinates using WeatherAPI
          const response = await fetch(
            `${BASE_URL}/search.json?key=${API_KEY}&q=${position.coords.latitude},${position.coords.longitude}`
          );
          
          if (!response.ok) {
            throw new Error('Failed to get location details');
          }

          const data = await response.json();
          
          if (data && data.length > 0) {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
              name: data[0].name,
              country: data[0].country
            });
          } else {
            resolve(DEFAULT_LOCATION);
          }
        } catch (error) {
          console.error('Error getting location details:', error);
          resolve(DEFAULT_LOCATION);
        }
      },
      () => {
        // If geolocation is denied or fails, use default location
        resolve(DEFAULT_LOCATION);
      }
    );
  });
};

export const getWeatherData = async (location: Location, date?: string): Promise<WeatherData> => {
  try {
    const query = location.name || `${location.lat},${location.lon}`;
    const today = new Date().toISOString().split('T')[0];
    const isHistoricalData = date && date !== today;
    
    let url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=yes`;
    if (isHistoricalData) {
      url = `${BASE_URL}/history.json?key=${API_KEY}&q=${query}&dt=${date}`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }

    const data = await response.json();
    
    // Update location data with API response
    if (!location.name) {
      location.name = data.location.name;
      location.country = data.location.country;
    }

    // For historical data, use the first forecast day as current
    const currentData = isHistoricalData ? data.forecast.forecastday[0].day : data.current;
    
    return {
      current: {
        temperature: isHistoricalData ? currentData.avgtemp_c : currentData.temp_c,
        humidity: isHistoricalData ? currentData.avghumidity : currentData.humidity,
        windSpeed: isHistoricalData ? currentData.maxwind_kph : currentData.wind_kph,
        windDirection: isHistoricalData ? 'N/A' : currentData.wind_dir,
        condition: isHistoricalData ? currentData.condition.text : currentData.condition.text,
        precipitation: isHistoricalData ? currentData.totalprecip_mm : currentData.precip_mm,
        uvIndex: isHistoricalData ? currentData.uv : currentData.uv,
        visibility: isHistoricalData ? currentData.avgvis_km : currentData.vis_km,
        pressure: isHistoricalData ? currentData.pressure_mb : currentData.pressure_mb
      },
      forecast: (data.forecast.forecastday || []).map((day: any) => ({
        date: day.date,
        highTemp: day.day.maxtemp_c,
        lowTemp: day.day.mintemp_c,
        precipitation: day.day.totalprecip_mm,
        condition: day.day.condition.text,
        windSpeed: day.day.maxwind_kph,
        hourly: (day.hour || []).map((hour: any) => ({
          time: hour.time,
          temperature: hour.temp_c,
          condition: hour.condition.text,
          precipitation: hour.precip_mm
        }))
      }))
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const searchLocation = async (query: string): Promise<Location[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Location search failed');
    }

    const data = await response.json();
    
    return data.map((location: any) => ({
      lat: location.lat,
      lon: location.lon,
      name: location.name,
      country: location.country
    }));
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
}; 