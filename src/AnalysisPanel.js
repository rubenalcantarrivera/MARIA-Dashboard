// src/AnalysisPanel.js
import React from 'react';

const AnalysisPanel = ({ zone, forecast, ndvi }) => {
  // Compute messages
  const highRiskMsg = zone?.risk_level === 'high'
    ? '⚠️ This zone is very high risk: prioritize restoration.'
    : 'ℹ️ Moderate risk zone.';

  const tempAlerts = forecast?.some(f => f.main.temp > 35)
    ? '🔥 Temperatures above 35 °C expected in the next 3 days.'
    : null;

  const ndviDrop = ndvi && ndvi.length >= 2 && ndvi[1].ndvi < ndvi[0].ndvi
    ? '📉 Recent decrease in vegetation cover (NDVI detected).'
    : null;

  return (
    <div style={{
      position:     'absolute',
      bottom:       10,
      left:         10,
      background:   '#fff',
      padding:      12,
      borderRadius: 6,
      maxWidth:     320,
      boxShadow:    '0 2px 6px rgba(0,0,0,0.2)',
      fontSize:     '0.9rem',
      lineHeight:   1.4,
      zIndex:       1000
    }}>
      <h4>🔍 Veracruz Coast Analysis</h4>

      {zone
        ? <p><strong>Selected area:</strong> {zone.name}</p>
        : <p><strong>Region:</strong> Veracruz Coast</p>
      }

      <ul style={{ paddingLeft: '1em' }}>
        <li>{highRiskMsg}</li>
        {tempAlerts && <li>{tempAlerts}</li>}
        {ndviDrop &&   <li>{ndviDrop}</li>}
      </ul>

      <h5>Recommended Actions</h5>
      <ul style={{ paddingLeft: '1em' }}>
        <li>🌱 Restore mangroves and riparian vegetation.</li>
        <li>🛠 Build green defenses (permeable levees).</li>
        <li>📲 Send SMS/WhatsApp alerts during extreme events.</li>
        <li>🤝 Organize citizen monitoring brigades.</li>
      </ul>
    </div>
  );
};

export default AnalysisPanel;
