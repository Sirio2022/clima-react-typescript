import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type WeatherState = {
  weather: {
    name: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
  };
  setWeather: (data: WeatherState['weather']) => void;
  loading?: boolean;
  setLoading: (value: boolean) => void;
  notFound?: boolean;
  setNotFound: (value: boolean) => void;
  resetState: () => void;
};

const initialState = {
  weather: {
    name: '',
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
    },
  },
  loading: false,
  notFound: false,
};

export const useWeatherStore = create<WeatherState>()(
  devtools((set) => ({
    ...initialState,

    setWeather: (data) =>
      set(() => ({
        weather: data,
      })),

    setLoading: (value) => set(() => ({ loading: value })),
    setNotFound: (value) => set(() => ({ notFound: value })),
    resetState: () => set(() => ({ ...initialState })),
  }))
);
