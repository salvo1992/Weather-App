import { useEffect, useState } from 'react';
import styles from './AirBadge.module.css';
const KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default function AirBadge({ lat, lon }) {
  const [aqi, setAqi] = useState(null);

  useEffect(() => {
    if (!lat) return;
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${KEY}`)
      .then(r => r.json())
      .then(j => setAqi(j.list[0].main.aqi));
  }, [lat, lon]);

  if (!aqi) return null;

  const label = ['Buono','Discreto','Moderato','Scarso','Pessimo'][aqi-1];
  return <span className={`${styles.badge} ${styles['q'+aqi]}`}>{label}</span>;
}
