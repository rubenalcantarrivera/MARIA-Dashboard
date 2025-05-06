// src/AnalysisPanel.js
import React from 'react';

const AnalysisPanel = ({ zone, forecast, ndvi }) => {
  // Hallazgos
  const highRisk = zone?.risk_level === 'high';
  const tempAlerts = forecast?.some(f => f.main.temp > 35);
  const ndviDrop = ndvi && ndvi.length >= 2 && ndvi[1].ndvi < ndvi[0].ndvi;

  return (
    <div style={{
      position: 'absolute',
      bottom: 10, left: 10,
      background: '#fff', padding: 12,
      borderRadius: 6, maxWidth: 300,
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      fontSize: '0.9rem',
      lineHeight: 1.4
    }}>
      <h4>🔍 Análisis y Propuestas</h4>

      {zone && (
        <>
          <p><strong>Zona:</strong> {zone.name}</p>
          {highRisk && <p style={{color:'red'}}>- 🤚 Muy alto riesgo: priorizar restauración.</p>}
        </>
      )}

      {forecast && (
        <>
          <p><strong>Pronóstico:</strong></p>
          <ul>
            {forecast.map(f=>(
              <li key={f.dt_txt}>
                {f.dt_txt.slice(5,16)}: {f.main.temp}°C
              </li>
            ))}
          </ul>
          {tempAlerts && <p style={{color:'orange'}}>- 🔥 Temperaturas >35°C      (alerta de calor)</p>}
        </>
      )}

      {ndvi && (
        <>
          <p><strong>Tendencia NDVI:</strong></p>
          <ul>
            {ndvi.map((n,i)=>(
              <li key={i}>{n.date}: {n.ndvi}</li>
            ))}
          </ul>
          {ndviDrop && <p style={{color:'green'}}>- 📉 Caída de vegetación detectada.</p>}
        </>
      )}

      <h5>Propuestas:</h5>
      <ul>
        <li>🌱 Restaurar manglares en zonas rojas.</li>
        <li>🛠 Defensas verdes (diques permeables).</li>
        <li>📲 Alertas tempranas vía SMS/WhatsApp.</li>
        <li>🤝 Brigadas ciudadanas de monitoreo.</li>
      </ul>
    </div>
  );
};

export default AnalysisPanel;
