import { useEffect, useState } from 'react';
import ForecastItem from './ForecastItem';
import styles from './ForecastList.module.css';

export default function ForecastList({ city }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!city) { setItems([]); return; }

    const key = process.env.REACT_APP_WEATHER_API_KEY;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${key}`)
      .then(r => r.json())
      .then(json => {
        const map = new Map();                  // raggruppa per giorno (5)
        json.list.forEach(el => {
          const day = el.dt_txt.split(' ')[0];  // "YYYY-MM-DD"
          if (!map.has(day) && map.size < 5) map.set(day, el);
        });
        setItems(Array.from(map.values()));
      })
      .catch(() => setItems([]));
  }, [city]);

  if (!items.length) return null;

  return (
    <div className={styles.slider}>
      {items.map(it => <ForecastItem key={it.dt} data={it} />)}
    </div>
  );
}
