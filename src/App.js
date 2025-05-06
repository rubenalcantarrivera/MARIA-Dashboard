// src/App.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getThreeDayForecast } from './api/openWeather';
import { getNDVI }              from './api/satellite';
import AnalysisPanel           from './AnalysisPanel';

const App = () => {
  const [geoData,  setGeoData]  = useState(null);
  const [zone,     setZone]     = useState(null);
  const [forecast, setForecast] = useState(null);
  const [ndvi,     setNdvi]     = useState(null);

  useEffect(() => {
    const LAT = 19.1738, LON = -96.1342; // Veracruz Coast

    // load coastal zones
    fetch('/data/zones.geojson')
      .then(r => r.json())
      .then(setGeoData)
      .catch(console.error);

    // 3-day weather forecast
    getThreeDayForecast(LAT, LON)
      .then(setForecast)
      .catch(console.error);

    // demo NDVI values
    getNDVI(LAT, LON)
      .then(setNdvi)
      .catch(console.error);
  }, []);

  const onEach = (feature, layer) =>
    layer.on({ click: () => setZone(feature.properties) });

  const style = feature => ({
    color: feature.properties.risk_level === 'high'
      ? 'red'
      : feature.properties.risk_level === 'medium'
        ? 'orange'
        : 'green',
    weight:      1,
    fillOpacity: 0.5
  });

  return (
    <div style={{ height:'100vh', width:'100%', position:'relative' }}>
      <MapContainer
        center={[19.1738, -96.1342]}
        zoom={11}
        style={{ height:'100%', width:'100%' }}
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

      {/* Basic data panel appears when a zone is clicked */}
      {zone && (
        <div style={{
          position:     'absolute',
          top:          10,
          right:        10,
          background:   '#fff',
          padding:      10,
          borderRadius: 6,
          boxShadow:    '0 2px 6px rgba(0,0,0,0.2)',
          maxWidth:     250,
          zIndex:       1000
        }}>
          <h3>{zone.name}</h3>
          <p><strong>Risk Level:</strong> {zone.risk_level}</p>
          <p><strong>Population:</strong> {zone.population}</p>
          <p><strong>Recommendation:</strong> {zone.recommendation}</p>
        </div>
      )}

      {/* Analysis and recommendations always visible */}
      {forecast && ndvi && (
        <AnalysisPanel
          zone={zone}
          forecast={forecast}
          ndvi={ndvi}
        />
      )}
    </div>
  );
};

export default App;
