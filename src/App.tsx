import styles from './App.module.css';
import Footer from './components/footer/Footer';
import Form from './components/form/Form';
import Spinner from './components/spinner/Spinner';
import WeatherDetail from './components/weatherDetail/WeatherDetail';
import { useWheater } from './hooks/useWheater';

function App() {
  const { hasWeather, loading, notFound } = useWheater();

  return (
    <>
      <h1 className={styles.title}>Consulta el clima de tu ciudad</h1>

      <main className={styles.container}>
        <Form />

        {loading && <Spinner />}
        {notFound ? (
          <p className={styles.error}>No se encontraron resultados</p>
        ) : (
          hasWeather && <WeatherDetail />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
