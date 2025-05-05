// src/api/satellite.ts
export interface NDVIData {
  date: string;
  ndvi: number;
}

export async function getNDVI(lat: number, lon: number): Promise<NDVIData[]> {
  const url = `https://services.sentinel-hub.com/ogc/wms/YOUR_INSTANCE_ID` +
    `?SERVICE=WMS&REQUEST=GetMap&LAYERS=NDVI&WIDTH=512&HEIGHT=512` +
    `&BBOX=${lon-0.01},${lat-0.01},${lon+0.01},${lat+0.01}` +
    `&TIME=2025-01-01/2025-05-01&FORMAT=image/png`;
  // Aquí deberías procesar la imagen y extraer valores; para demo devolvemos datos simulados:
  return [
    { date: '2025-04-01', ndvi: 0.65 },
    { date: '2025-05-01', ndvi: 0.60 }
  ];
}
