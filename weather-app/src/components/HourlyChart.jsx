import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default function HourlyChart({ city }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!city) return;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&cnt=8&appid=${KEY}`)
      .then(r => r.json())
      .then(j => {
        setData(j.list.map(el => ({
          hour: format(new Date(el.dt * 1000), 'HH:mm'),
          temp: Math.round(el.main.temp),
        })));
      });
  }, [city]);

  if (!data.length) return null;

  return (
    <ResponsiveContainer width={320} height={160}>
      <LineChart data={data}>
        <XAxis dataKey="hour" stroke="#fff" tick={{ fontSize:12 }} />
        <Tooltip />
        <Line type="monotone" dataKey="temp" stroke="#fff" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
