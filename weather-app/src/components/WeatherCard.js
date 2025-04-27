import { WiHumidity, WiStrongWind, WiThermometer } from 'react-icons/wi';
import { motion }   from 'framer-motion';

import HourlyChart  from './HourlyChart';
import AirBadge     from './AirBadge';
import styles       from './WeatherCard.module.css';

export default function WeatherCard({ data }) {
  const w = data.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${w.icon}@4x.png`;

  return (
    <motion.div
      className={styles.card}
      layout
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, y:-20 }}
      transition={{ duration:.4 }}
    >
      <img src={iconUrl} alt={w.description} className={styles.icon} />

      <h2 className={styles.city}>{data.name}</h2>
      <p  className={styles.desc}>{w.description}</p>

      <div className={styles.tempMain}>{Math.round(data.main.temp)}°C</div>

      <div className={styles.row}>
        <span><WiThermometer /> Sembra {Math.round(data.main.feels_like)}°</span>
        <span><WiHumidity /> {data.main.humidity}%</span>
        <span><WiStrongWind /> {Math.round(data.wind.speed)} m/s</span>
        <AirBadge lat={data.coord.lat} lon={data.coord.lon} />
      </div>

      <HourlyChart city={data.name} className={styles.HourlyChart} />

    </motion.div>
  );
}


