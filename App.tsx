import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { GeoJsonObject, Feature } from 'geojson';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

interface ZoneProperties {
  name: string;
  risk_level: 'high' | 'medium' | 'low';
  population: number;
  recommendation: string;
}

const App: React.FC = () => {
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);
  const [selectedZone, setSelectedZone] = useState<ZoneProperties | null>(null);

  useEffect(() => {
    axios.get('/data/zones.geojson')
      .then(res => setGeoData(res.data))
      .catch(err => console.error('Error loading geojson:', err));
  }, []);

  const onEachZone = (feature: Feature, layer: any) => {
    layer.on({
      click: () => setSelectedZone(feature.properties as ZoneProperties)
    });
  };

  const getStyle = (feature: Feature) => {
    const level = (feature.properties as ZoneProperties).risk_level;
    return {
      color: level === 'high' ? 'red' : level === 'medium' ? 'orange' : 'green',
      weight: 1,
      fillOpacity: 0.5,
    };
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[19.43, -99.13]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && (
          <GeoJSON data={geoData} onEachFeature={onEachZone} style={getStyle} />
        )}
      </MapContainer>

      {selectedZone && (
        <div style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
        }}>
          <h3>{selectedZone.name}</h3>
          <p><strong>Risk Level:</strong> {selectedZone.risk_level}</p>
          <p><strong>Population:</strong> {selectedZone.population}</p>
          <p><strong>Recommendation:</strong> {selectedZone.recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default App;
