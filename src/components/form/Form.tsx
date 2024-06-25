import { useId } from 'react';
import { countries } from '../../data/countries';
import styles from './Form.module.css';
import Error from '../error/Error';
import { useWheater } from '../../hooks/useWheater';

export default function Form() {
  const city = useId();
  const country = useId();

  const { register, handleSubmit, errors, weatherSearch } = useWheater();

  return (
    <form className={styles.form} onSubmit={handleSubmit(weatherSearch)}>
      <div className={styles.field}>
        <label htmlFor={city}>Ciudad</label>
        <input
          type="text"
          id={city}
          placeholder="Ciudad"
          {...register('city', {
            required: 'La ciudad es obligatoria',
          })}
        />
        {errors.city && <Error>{errors.city.message}</Error>}
      </div>

      <div className={styles.field}>
        <label htmlFor={country}>País</label>
        <select
          id={country}
          {...register('country', {
            required: 'El país es obligatorio',
          })}
        >
          <option value="">-- Selecciona un País --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && <Error>{errors.country.message}</Error>}
      </div>

      <input type="submit" value="Buscar Clima" className={styles.submit} />
    </form>
  );
}
