const API_KEY = 'ceae91f8278743edaae53344251306';

export async function fetchWeatherData() {
  if (!API_KEY) {
    throw new Error('Weather API key is not configured. Please set REACT_APP_WEATHER_API_KEY environment variable.');
  }

  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Colombo&aqi=no`
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your WeatherAPI configuration.');
    } else if (response.status === 403) {
      throw new Error('API access forbidden. Please check your WeatherAPI subscription.');
    } else if (response.status >= 500) {
      throw new Error('Weather service is temporarily unavailable. Please try again later.');
    } else {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
  }

  const data = await response.json();
  return data;
}

export function getUVDescription(uv) {
  if (uv <= 2) return 'Low';
  if (uv <= 5) return 'Moderate';
  if (uv <= 7) return 'High';
  if (uv <= 10) return 'Very High';
  return 'Extreme';
}

export function getUVColor(uv) {
  if (uv <= 2) return 'green';
  if (uv <= 5) return 'yellow';
  if (uv <= 7) return 'orange';
  return 'red';
}