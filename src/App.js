// src/App.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getThreeDayForecast } from './api/openWeather';
import { getNDVI }              from './api/satellite';

const App = () => {
  const [geoData,   setGeoData]   = useState(null);
  const [zone,      setZone]      = useState(null);
  const [forecast,  setForecast]  = useState(null);
  const [ndvi,      setNdvi]      = useState(null);

  useEffect(() => {
    const LAT = 19.1738, LON = -96.1342; // Coordenadas de Veracruz

    // Carga polígonos costeros
    fetch('/data/zones.geojson')
      .then(r => r.json())
      .then(setGeoData)
      .catch(console.error);

    // Pronóstico a 3 días desde OpenWeatherMap
    getThreeDayForecast(LAT, LON)
      .then(setForecast)
      .catch(console.error);

    // Valores de NDVI (demo)
    getNDVI(LAT, LON)
      .then(setNdvi)
      .catch(console.error);
  }, []);

  const onEach = (feature, layer) =>
    layer.on({ click: () => setZone(feature.properties) });

  const style = (feature) => {
    const lvl = feature.properties.risk_level;
    return {
      color: lvl === 'high'   ? 'red'
           : lvl === 'medium' ? 'orange'
           : 'green',
      weight: 1,
      fillOpacity: 0.5
    };
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[19.1738, -96.1342]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            onEachFeature={onEach}
            style={style}
          />
        )}
      </MapContainer>

      {zone && (
        <div style={{
          position:   'absolute',
          top:        10,
          right:      10,
          background: '#fff',
          padding:    10,
          borderRadius: 6,
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
        }}>
          <h3>{zone.name}</h3>
          <p><strong>Risk:</strong> {zone.risk_level}</p>
          <p><strong>Population:</strong> {zone.population}</p>
          <p><strong>Recommendation:</strong> {zone.recommendation}</p>

          {forecast && (
            <>
              <h4>3-Day Forecast</h4>
              <ul>
                {forecast.map(f => (
                  <li key={f.dt_txt}>
                    {f.dt_txt.slice(0,16)} — {f.main.temp}°C, {f.weather[0].description}
                  </li>
                ))}
              </ul>
            </>
          )}

          {ndvi && (
            <>
              <h4>NDVI Trends</h4>
              <ul>
                {ndvi.map((n, i) => (
                  <li key={i}>
                    {n.date} — {n.ndvi}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
