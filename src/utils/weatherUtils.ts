interface WeatherGradient {
  background: string;
  color: string;
}

export const getWeatherGradient = (condition: string, temperature: number): WeatherGradient => {
  const lowercaseCondition = condition.toLowerCase();

  // Night time gradients
  if (lowercaseCondition.includes('night') || lowercaseCondition.includes('dark')) {
    return {
      background: 'linear-gradient(to right, #141e30, #243b55)',
      color: '#ffffff'
    };
  }

  // Rain conditions
  if (lowercaseCondition.includes('rain') || lowercaseCondition.includes('drizzle')) {
    return {
      background: 'linear-gradient(to right, #3f4c6b, #606c88)',
      color: '#ffffff'
    };
  }

  // Thunder conditions
  if (lowercaseCondition.includes('thunder') || lowercaseCondition.includes('storm')) {
    return {
      background: 'linear-gradient(to right, #283048, #859398)',
      color: '#ffffff'
    };
  }

  // Snow conditions
  if (lowercaseCondition.includes('snow') || lowercaseCondition.includes('blizzard')) {
    return {
      background: 'linear-gradient(to right, #E6DADA, #274046)',
      color: '#ffffff'
    };
  }

  // Cloudy conditions
  if (lowercaseCondition.includes('cloud') || lowercaseCondition.includes('overcast')) {
    return {
      background: 'linear-gradient(to right, #757F9A, #D7DDE8)',
      color: '#000000'
    };
  }

  // Foggy/Misty conditions
  if (lowercaseCondition.includes('fog') || lowercaseCondition.includes('mist')) {
    return {
      background: 'linear-gradient(to right, #606c88, #3f4c6b)',
      color: '#ffffff'
    };
  }

  // Clear/Sunny conditions - adjust based on temperature
  if (lowercaseCondition.includes('clear') || lowercaseCondition.includes('sunny')) {
    if (temperature > 30) {
      return {
        background: 'linear-gradient(to right, #FF512F, #F09819)',
        color: '#ffffff'
      };
    }
    if (temperature < 10) {
      return {
        background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
        color: '#ffffff'
      };
    }
    return {
      background: 'linear-gradient(to right, #56CCF2, #2F80ED)',
      color: '#ffffff'
    };
  }

  // Default gradient
  return {
    background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
    color: '#ffffff'
  };
}; 