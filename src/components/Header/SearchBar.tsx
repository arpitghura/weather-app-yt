import React, { useState } from 'react';
import { 
  TextField, 
  InputAdornment, 
  Autocomplete, 
  CircularProgress 
} from '@mui/material';
import { useWeather } from '../../context/WeatherContext';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash/debounce';
import { Location } from '../../types/weather';

const SearchBar: React.FC = () => {
  const { searchLocation, loading } = useWeather();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      setLoadingSuggestions(true);
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error('Failed to fetch suggestions');
      const data = await response.json();
      setSuggestions(data.slice(0, 5).map((item: any) => ({
        name: item.name || '',
        country: item.country || '',
        lat: Number(item.lat),
        lon: Number(item.lon)
      })));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    debouncedFetchSuggestions(value);
  };

  const handleSelection = (location: Location | null) => {
    if (location && location.name) {
      searchLocation(location.name);
      setSearchValue(`${location.name}, ${location.country}`);
      setSuggestions([]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && searchValue.trim()) {
      searchLocation(searchValue);
      setSuggestions([]);
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={suggestions}
      loading={loadingSuggestions}
      getOptionLabel={(option) => 
        typeof option === 'string' 
          ? option 
          : `${option.name}, ${option.country}`
      }
      filterOptions={(x) => x}
      value={searchValue}
      onChange={(_, newValue) => 
        handleSelection(typeof newValue === 'string' ? null : newValue)
      }
      onInputChange={(_, newValue) => setSearchValue(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Search location..."
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loadingSuggestions ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          sx={{
            backgroundColor: 'white',
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            }
          }}
        />
      )}
    />
  );
};

export default SearchBar; 