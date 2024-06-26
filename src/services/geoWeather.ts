import axios from "axios";
import { SearchType } from "../types";

export const fetchWeather = async (data: SearchType) => {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${
    data.city
  },${data.country}&appid=${import.meta.env.VITE_GEOWEATHER_API_KEY}`;

  try {
    const { data } = await axios.get(geoUrl);
    
    return data;

  } catch (error) {
    console.log(error);
    
  }
};