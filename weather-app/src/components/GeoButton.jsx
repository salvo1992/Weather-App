function GeoButton({ onCity }) {
    const handleClick = () => {
      navigator.geolocation.getCurrentPosition(async pos => {
        const { latitude, longitude } = pos.coords;
        const key = process.env.REACT_APP_WEATHER_API_KEY;
        const r = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${key}`
        );
        const j = await r.json();
        if (j[0]) onCity(j[0].name);
      });
    };
  
    return <button onClick={handleClick}>📍 Qui</button>;
  }
  export default GeoButton;
  