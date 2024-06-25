import { useWeatherStore } from '../../store';
import { temperatureConverter } from '../../utils';
import styles from './WeatherDetails.module.css';

export default function WeatherDetail() {
  const { weather } = useWeatherStore();

  return (
    <div className={styles.container}>
      <h2>Clima de: {weather.name}</h2>
      <p className={styles.current}>
        {temperatureConverter(weather.main.temp)}°C
      </p>
      <div className={styles.temperatures}>
        <p>
          Min: <span>{temperatureConverter(weather.main.temp_min)}°C</span>
        </p>
        <p>
          Max: <span>{temperatureConverter(weather.main.temp_max)}°C</span>
        </p>
      </div>
    </div>
  );
}
