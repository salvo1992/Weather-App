import { useEffect, useState } from 'react';
import styles from './Background.module.css';
import phase from '../hooks/useDayPhase'; // custom hook


const UNSPLASH = 'https://source.unsplash.com/1600x900/?';

export default function Background({ city, code }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!city) return;

    // foto per la città; se fallisce usa gradiente per codice meteo
    const img = new Image();
    img.src = `${UNSPLASH}${encodeURIComponent(city)}`;
    img.onload  = () => setUrl(img.src);
    img.onerror = () => setUrl('');          // ricade sul gradiente
  }, [city]);

  const klass = styles[`bg${code}`] ?? styles.bgDefault;

  return (
    <div
    className={`${styles.hero} ${phase==='night' ? styles.bgStars : ''}`}
    style={url ? {backgroundImage:`url(${url})`} : undefined}
  />
  );
}
