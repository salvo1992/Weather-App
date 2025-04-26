import { motion }    from 'framer-motion';
import { format }    from 'date-fns';
import { WiDaySunny } from 'react-icons/wi';
import styles        from './ForecastItem.module.css';

export default function ForecastItem({ data }) {
  const icon = data.weather?.[0]?.icon;
  const iconUrl = icon
    ? `https://openweathermap.org/img/wn/${icon}@2x.png`
    : null;

  return (
    <motion.div
      className={styles.card}
      layout
      initial={{ opacity:0, y:10 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, y:-10 }}
      transition={{ duration:.3 }}
    >
      <p className={styles.day}>
        {format(new Date(data.dt * 1000), 'EEE dd')}
      </p>

      {iconUrl
        ? <img src={iconUrl} alt="" className={styles.icon}/>
        : <WiDaySunny size={48} />}
      
      <p className={styles.temp}>{Math.round(data.main.temp)}°C</p>
    </motion.div>
  );
}
