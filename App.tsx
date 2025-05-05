import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { GeoJsonObject, Feature } from 'geojson';
import 'leaflet/dist/leaflet.css';

import { getThreeDayForecast, WeatherForecast } from './api/openWeather';
import { getRecentTides, TideData }            from './api/noaa';
import { getNDVI, NDVIData }                   from './api/satellite';

interface ZoneProperties {
  name: string;
  risk_level: 'high' | 'medium' | 'low';
  population: number;
  recommendation: string;
}

const App: React.FC = () => {
  const [geoData, setGeoData]   = useState<GeoJsonObject| null>(null);
  const [zone, setZone]         = useState<ZoneProperties| null>(null);
  const [forecast, setForecast] = useState<WeatherForecast[]| null>(null);
  const [tides, setTides]       = useState<TideData[]| null>(null);
  const [ndvi, setNdvi]         = useState<NDVIData[]| null>(null);

  useEffect(() => {
    // 1) Carga GeoJSON local
    fetch('/data/zones.geojson')
      .then(res => res.json())
      .then(setGeoData)
      .catch(console.error);

    // 2) Clima (3 días)
    getThreeDayForecast(19.43, -99.13)
      .then(setForecast)
      .catch(console.error);

    // 3) Mareas recientes
    getRecentTides(process.env.REACT_APP_NOAA_STATION_ID!)
      .then(setTides)
      .catch(console.error);

    // 4) NDVI demo
    getNDVI(19.43, -99.13)
      .then(setNdvi)
      .catch(console.error);
  }, []);

  const onEach = (feature: Feature, layer: any) =>
    layer.on({ click: () => setZone(feature.properties as ZoneProperties) });

  const style = (feature: Feature) => {
    const lvl = (feature.properties as ZoneProperties).risk_level;
    return {
      color: lvl === 'high'   ? 'red' :
             lvl === 'medium' ? 'orange' : 'green',
      weight: 1,
      fillOpacity: 0.5,
    };
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[19.43, -99.13]} zoom={13} style={{ height:'100%', width:'100%' }}>
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && <GeoJSON data={geoData} onEachFeature={onEach} style={style} />}
      </MapContainer>

      {zone && (
        <div style={{
          position:'absolute', top:10, right:10,
          background:'#fff', padding:10, borderRadius:6,
          boxShadow:'0 2px 6px rgba(0,0,0,0.2)'
        }}>
          <h3>{zone.name}</h3>
          <p><b>Riesgo:</b> {zone.risk_level}</p>
          <p><b>Población:</b> {zone.population}</p>
          <p><b>Recomendación:</b> {zone.recommendation}</p>

          {forecast && <>
            <h4>Pronóstico 3 días</h4>
            <ul>
              {forecast.map(f =>
                <li key={f.dt_txt}>
                  {f.dt_txt.slice(0,16)} – {f.main.temp}°C, {f.weather[0].description}
                </li>
              )}
            </ul>
          </>}

          {tides && <>
            <h4>Mareas recientes</h4>
            <ul>
              {tides.map((t,i) =>
                <li key={i}>{t.t} – {t.v} m</li>
              )}
            </ul>
          </>}

          {ndvi && <>
            <h4>NDVI (Vegetación)</h4>
            <ul>
              {ndvi.map(n =>
                <li key={n.date}>{n.date} – {n.ndvi}</li>
              )}
            </ul>
          </>}
        </div>
      )}
    </div>
  );
};

export default App;

