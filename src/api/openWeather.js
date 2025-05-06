// src/api/openWeather.js
export async function getThreeDayForecast(lat, lon) {
  const key = process.env.REACT_APP_OWM_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=24&appid=${key}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.list.filter((_, i) => i % 8 === 0);
}
