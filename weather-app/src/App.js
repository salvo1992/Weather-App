import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence }   from 'framer-motion';

import Header         from './components/Header';
import Background      from './components/Background';
import AutocompleteInput from './components/AutocompleteInput';
import GeoButton       from './components/GeoButton';
import WeatherCard     from './components/WeatherCard';
import ForecastList    from './components/ForecastList';
import Footer          from './components/Footer';
import useDayPhase     from './hooks/useDayPhase'; // custom hook
import './App.css';                      // CSS globale (non module)

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

/* ------------------------------------------------------------------ */
export default function App() {
  const [city,    setCity]    = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  /* richiesta meteo --------------------------------------------------- */
  const fetchWeather = useCallback(async name => {
    try {
      setLoading(true); setError('');
      const r = await fetch(
        `https://api.openweathermap.org/data/2.5/weather` +
        `?q=${encodeURIComponent(name)}&units=metric&lang=it&appid=${API_KEY}`
      );
      if (r.status === 401) throw new Error('API-Key non valida o non attiva.');
      if (!r.ok)            throw new Error('Città non trovata.');

      setWeather(await r.json());
    } catch (e) {
      setWeather(null);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /* debounce sull’input ---------------------------------------------- */
  useEffect(() => {
    if (city.length < 3) { setWeather(null); setError(''); return; }
    const t = setTimeout(() => fetchWeather(city), 500);
    return () => clearTimeout(t);
  }, [city, fetchWeather]);

  /* tema giorno / notte ---------------------------------------------- */
  const phase = useDayPhase(weather);                 // 'day' | 'night'
  useEffect(() => {
    document.documentElement.style.setProperty('--bg1', `var(--bg1-${phase})`);
    document.documentElement.style.setProperty('--bg2', `var(--bg2-${phase})`);
  }, [phase]);

  /* ------------------------------------------------------------------ */
  return (
    <div className="page">
      <Header city={weather?.name} temp={weather?.main?.temp} />
      <Background city={weather?.name} code={weather?.weather?.[0].id} />

      <main className="main">
        {/*  input + geo  */}
        <div className="search-row">
          <AutocompleteInput onSelect={setCity} />
          <GeoButton onCity={setCity} />
        </div>

        {/*  messaggi / card con animazione  */}
        <AnimatePresence mode="wait">
          {loading && <p className="msg-load">Caricamento…</p>}
          {error   && <p className="msg-err">{error}</p>}
          {weather && <WeatherCard key={weather.name} data={weather} />}
        </AnimatePresence>

        {/*  forecast 5 giorni  */}
        {weather && <ForecastList city={weather.name} />}
      </main>

      <Footer />
    </div>
  );
}



