// src/api/noaa.js
export async function getRecentTides(station) {
  const url =
    `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter` +
    `?product=water_level&application=MARIA&station=${station}` +
    `&format=json&units=metric&time_zone=lst_ldt&interval=6`;
  const res = await fetch(url);
  return await res.json();
}
