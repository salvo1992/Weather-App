import CityBadge from './CityBadge';
import TempBadge from './TempBadge';
import styles    from './Header.module.css';

export default function Header({ city, temp }) {
  return (
    <header className={styles.header}>
      {city && <CityBadge name={city} />}
      {temp && <TempBadge value={temp} />}
      <h1 className={styles.title}>Weather App</h1>
    </header>
  );
}
