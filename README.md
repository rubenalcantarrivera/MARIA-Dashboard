# 🌊 MARIA: Monitoreo y Acción Resiliente con Inteligencia Artificial, Monitoring and Resilience with Artificial Intelligence

MARIA is an open-source interactive dashboard to monitor coastal climate risks in real time. Built for the 2025 UN STI Forum Hackathon, it combines geospatial data, AI and citizen participation to protect ecosystems and livelihoods.

## 🚀 Key Features
- **Coastal Risk Map**: low, medium, high risk zones  
- **3-Day Weather Forecast** via OpenWeatherMap API  
- **Recent Tide Levels** via NOAA API  
- **NDVI Trends** (demo values) from Sentinel data  
- **Custom Zones** loaded from `public/data/zones.geojson`

## 🛠 Project Structure
/
├── .env # API keys
├── LICENSE # MIT License
├── package.json # scripts & dependencies
├── public/
│ ├── index.html
│ └── data/zones.geojson
└── src/
├── App.tsx
└── api/
├── openWeather.ts
├── noaa.ts
└── satellite.ts


## 🔧 Setup & Deployment
**API Keys**  
   - OpenWeatherMap: set `REACT_APP_OWM_API_KEY` in `.env`  
   - NOAA Station ID: set `REACT_APP_NOAA_STATION_ID` in `.env`

 **GitHub Pages**  
   - Go to **Settings → Pages**  
   - Source: **main** branch, folder **/root**, Save  
   - Wait 1–2 min, then visit the URL above.

## 📄 License
MIT License © 2025 rubenalcantarrivera
