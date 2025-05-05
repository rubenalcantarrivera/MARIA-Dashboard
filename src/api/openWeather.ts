export interface WeatherForecast {
  dt_txt: string;
  main: { temp: number; humidity: number };
  weather: { description: string }[];
}
export async function getThreeDayForecast(lat: number, lon: number): Promise<WeatherForecast[]> {
  const key = process.env.REACT_APP_OWM_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=24&appid=${key}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.list.filter((_: any, i: number) => i % 8 === 0);
}
