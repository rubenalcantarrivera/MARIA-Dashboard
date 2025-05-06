// src/App.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getThreeDayForecast } from './api/openWeather';
import { getRecentTides }       from './api/noaa';
import { getNDVI }              from './api/satellite';

const App = () => {
  const [geoData, setGeoData]   = useState(null);
  const [zone, setZone]         = useState(null);
  const [forecast, setForecast] = useState(null);
  const [tides, setTides]       = useState(null);
  const [ndvi, setNdvi]         = useState(null);

  useEffect(() => {
    fetch('/data/zones.geojson')
      .then(r => r.json()).then(setGeoData);
    getThreeDayForecast(19.43, -99.13).then(setForecast);
    getRecentTides(process.env.REACT_APP_NOAA_STATION_ID).then(setTides);
    getNDVI(19.43, -99.13).then(setNdvi);
  }, []);

  const onEach = (feature, layer) =>
    layer.on({ click: () => setZone(feature.properties) });

  const style = (feature) => {
    const lvl = feature.properties.risk_level;
    return {
      color: lvl==='high' ? 'red' :
             lvl==='medium' ? 'orange' : 'green',
      weight: 1,
      fillOpacity: 0.5
    };
  };

  return (
    <div style={{ height:'100vh', width:'100%' }}>
      <MapContainer center={[19.43, -99.13]} zoom={13} style={{ height:'100%', width:'100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geoData && <GeoJSON data={geoData} onEachFeature={onEach} style={style} />}
      </MapContainer>

      {zone && (
        <div style={{
          position:'absolute', top:10, right:10,
          background:'#fff', padding:10, borderRadius:6,
          boxShadow:'0 2px 6px rgba(0,0,0,0.2)'
        }}>
          <h3>{zone.name}</h3>
          <p><b>Risk:</b> {zone.risk_level}</p>
          <p><b>Pop:</b> {zone.population}</p>
          <p><b>Rec:</b> {zone.recommendation}</p>

          {forecast && <>
            <h4>3-Day Forecast</h4>
            <ul>
              {forecast.map(f =>
                <li key={f.dt_txt}>{f.dt_txt.slice(0,16)} – {f.main.temp}°C, {f.weather[0].description}</li>
              )}
            </ul>
          </>}
          {tides && <>
            <h4>Recent Tides</h4>
            <ul>{tides.map((t,i)=><li key={i}>{t.t} – {t.v} m</li>)}</ul>
          </>}
          {ndvi && <>
            <h4>NDVI</h4>
            <ul>{ndvi.map((n,i)=><li key={i}>{n.date} – {n.ndvi}</li>)}</ul>
          </>}
        </div>
      )}
    </div>
  );
};

export default App;
