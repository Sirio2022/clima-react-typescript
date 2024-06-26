import { useForm } from 'react-hook-form';
import { SearchType } from '../types';
import { object, string, number, parse } from 'valibot';
import { useWeatherStore } from '../store';
import { useMemo } from 'react';
import { fetchWeather } from '../services/geoWeather';
import { searchWeather } from '../services/weather';

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
    const geoResponse = await fetchWeather(data);

    resetState();
    setLoading(true);

    try {
      if (geoResponse.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }

      const lat = geoResponse[0].lat;
      const lon = geoResponse[0].lon;

      const searchWeatherResult = await searchWeather({ lat, lon });

      const WeatherSchema = object({
        name: string(),
        main: object({
          temp: number(),
          temp_min: number(),
          temp_max: number(),
        }),
      });

      const result = parse(WeatherSchema, searchWeatherResult);
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
