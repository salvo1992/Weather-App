import { useEffect, useRef } from 'react';
import { autocomplete }      from '@algolia/autocomplete-js';
import '@algolia/autocomplete-theme-classic';
import styles from './AutocompleteInput.module.css';   // vedi CSS sotto

const KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default function AutocompleteInput({ onSelect }) {
  const containerRef = useRef(null);

  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!containerRef.current) return;

    const instance = autocomplete({
      container: containerRef.current,
      placeholder: 'Cerca città…',
      detachedMediaQuery: '',          // resta inline anche su mobile
      getSources({ query }) {
        if (!query) return [];
        return [{
          sourceId: 'cities',
          async getItems() {
            const r = await fetch(
              `https://api.openweathermap.org/geo/1.0/direct?q=${query}` +
              `&limit=5&appid=${KEY}`
            );
            return r.json();           // array città
          },
          templates: {
            item({ item }) {
              return `${item.name}, ${item.country}`;
            },
          },
          onSelect({ item }) {
            navigator.vibrate?.(20);   // haptic feedback
            onSelect(item.name);       // passiamo il nome all’App
          },
        }];
      },
    });

    return () => instance.destroy();
  }, [onSelect]);

  /* ------------------------------------------------------------------ */
  // VOICE SEARCH
  const startVoice = () => {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) return alert('Il browser non supporta la voce');
    const rec = new Speech();
    rec.lang = 'it-IT';
    rec.onresult = e => {
      const city = e.results[0][0].transcript;
      onSelect(city);
    };
    rec.start();
  };

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} />
      <button className={styles.voiceBtn} onClick={startVoice}>🎙</button>
    </div>
  );
}

