import { useForm } from 'react-hook-form';
import { SearchType } from '../types';
import axios from 'axios';
import { object, string, number, parse } from 'valibot';
import { useWeatherStore } from '../store';
import { useMemo } from 'react';

export function useWheater() {
  const setWeather = useWeatherStore((state) => state.setWeather);
  const weather = useWeatherStore((state) => state.weather);
  const loading = useWeatherStore((state) => state.loading);
  const setLoading = useWeatherStore((state) => state.setLoading);
  const notFound = useWeatherStore((state) => state.notFound);
  const setNotFound = useWeatherStore((state) => state.setNotFound);
  const resetState = useWeatherStore((state) => state.resetState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SearchType>();

  const weatherSearch = async (data: SearchType) => {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${
      data.city
    },${data.country}&appid=${import.meta.env.VITE_GEOWEATHER_API_KEY}`;

    resetState();
    setLoading(true);

    try {
      const { data } = await axios.get(geoUrl);

      if (data.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_GEOWEATHER_API_KEY
      }`;
      const { data: weatherData } = await axios.get(weatherUrl);

      const WeatherSchema = object({
        name: string(),
        main: object({
          temp: number(),
          temp_min: number(),
          temp_max: number(),
        }),
      });

      const result = parse(WeatherSchema, weatherData);
      setWeather(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    reset();
  };

  const hasWeather = useMemo(() => {
    return weather.name;
  }, [weather]);

  return {
    register,
    handleSubmit,
    errors,
    reset,
    weatherSearch,
    hasWeather,
    weather,
    loading,
    notFound,
  };
}
