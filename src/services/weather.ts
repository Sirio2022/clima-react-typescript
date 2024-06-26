import axios from 'axios';

type SearchWeatherProps = {
  lat: number;
  lon: number;
};

export const searchWeather = async ({ lat, lon }: SearchWeatherProps) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
    import.meta.env.VITE_GEOWEATHER_API_KEY
  }`;

  try {
    const { data: weatherData } = await axios.get(weatherUrl);

    return weatherData;
  } catch (error) {
    console.error(error);
  }
};
