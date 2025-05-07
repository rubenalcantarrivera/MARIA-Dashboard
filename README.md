# 🌊 MARIA: Monitoreo y Acción Resiliente con Inteligencia Artificial, Monitoring and Resilience with Artificial Intelligence

MARIA is an open-source interactive dashboard to monitor coastal climate risks in real time. Built for the 2025 UN STI Forum Hackathon, it combines geospatial data, AI and citizen participation to protect ecosystems and livelihoods. MARIA delivers precise, data-driven alerts and localized risk metrics to coastal authorities and residents. By integrating live weather forecasts and vegetation health indices, it directs focused mangrove restorations and community-led interventions, tangibly lowering flood exposure and preserving marine habitats. MARIA translates complex climate data into targeted actions that directly cut vulnerability and boost ecosystem recovery.

## 🚀 Key Features
- **Coastal Risk Map**: low, medium, high risk zones  
- **3-Day Weather Forecast** via OpenWeatherMap API  
- **Recent Tide Levels** via NOAA API  
- **NDVI Trends** (demo values) from Sentinel data  
- **Custom Zones** loaded from `public/data/zones.geojson`

- 🎯 SDG Alignment

SDG 13: Climate Action – Proactive monitoring and alerts for climate hazards.


├── .env                   # API keys (REACT_APP_OWM_API_KEY)
├── LICENSE                # MIT License
├── package.json           # scripts & dependencies
├── public/
│   ├── index.html
│   └── data/
│       └── zones.geojson  # coastal GeoJSON for Veracruz
└── src/
├── index.js           # app entrypoint
├── index.css          # global styles reset
├── App.js             # main dashboard component
├── AnalysisPanel.js   # insights & recommendations panel
└── api/
├── openWeather.js # OpenWeatherMap 3-day forecast
└── satellite.js    # demo NDVI data




## 🔧 Setup & Deployment
**API Keys**  
   - OpenWeatherMap: set `REACT_APP_OWM_API_KEY` in `.env`  
   - NOAA Station ID: set `REACT_APP_NOAA_STATION_ID` in `.env`



## 📄 License
MIT License © 2025 rubenalcantarrivera

<!-- bump -->
