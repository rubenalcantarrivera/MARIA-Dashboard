// src/AnalysisPanel.js
import React from 'react';

const AnalysisPanel = ({ zone, forecast, ndvi }) => {
  // Cálculos generales
  const highRiskMsg = zone?.risk_level === 'high'
    ? '⚠️ Esta zona es de muy alto riesgo: priorizar restauración.'
    : 'ℹ️ Riesgo moderado.';

  const tempAlerts = forecast?.some(f => f.main.temp > 35)
    ? '🔥 Se esperan temperaturas >35°C en los próximos 3 días.'
    : null;

  const ndviDrop = ndvi && ndvi.length >= 2 && ndvi[1].ndvi < ndvi[0].ndvi
    ? '📉 Disminución reciente de cubierta vegetal (NDVI).'
    : null;

  return (
    <div style={{
      position:   'absolute',
      bottom:     10,
      left:       10,
      background: '#fff',
      padding:    12,
      borderRadius: 6,
      maxWidth:   320,
      boxShadow:  '0 2px 6px rgba(0,0,0,0.2)',
      fontSize:   '0.9rem',
      lineHeight: 1.4,
      zIndex:     1000
    }}>
      <h4>🔍 Análisis de Veracruz</h4>

      {zone
        ? <p><strong>Zona seleccionada:</strong> {zone.name}</p>
        : <p><strong>Región:</strong> Costa de Veracruz</p>
      }

      <ul style={{ paddingLeft: '1em' }}>
        <li>{highRiskMsg}</li>
        {tempAlerts && <li>{tempAlerts}</li>}
        {ndviDrop &&   <li>{ndviDrop}</li>}
      </ul>

      <h5>Propuestas de acción</h5>
      <ul style={{ paddingLeft: '1em' }}>
        <li>🌱 Restaurar manglares y vegetación ribereña.</li>
        <li>🛠 Construir defensas verdes (dique permeable).</li>
        <li>📲 Enviar alertas SMS/WhatsApp en eventos extremos.</li>
        <li>🤝 Organizar brigadas ciudadanas de monitoreo.</li>
      </ul>
    </div>
  );
};

export default AnalysisPanel;
