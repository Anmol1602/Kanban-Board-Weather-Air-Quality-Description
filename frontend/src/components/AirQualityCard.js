import React from 'react';

const AirQualityCard = ({
  cityName,
  aqi,
  o3,
  so2,
  no2,
  co,
  pm10,
  pm25,
  timestamp,
  pollenLevel = { tree: 'N/A', grass: 'N/A', weed: 'N/A' },
}) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-2">{cityName} - Air Quality</h3>
      <div className="mb-2">
        <strong>Timestamp: </strong>{timestamp}
      </div>
      <div className="mb-2">
        <strong>AQI: </strong>{aqi}
      </div>
      <div className="mb-2">
        <strong>O3: </strong>{o3} µg/m³
      </div>
      <div className="mb-2">
        <strong>SO2: </strong>{so2} µg/m³
      </div>
      <div className="mb-2">
        <strong>NO2: </strong>{no2} µg/m³
      </div>
      <div className="mb-2">
        <strong>CO: </strong>{co} µg/m³
      </div>
      <div className="mb-2">
        <strong>PM10: </strong>{pm10} µg/m³
      </div>
      <div className="mb-2">
        <strong>PM2.5: </strong>{pm25} µg/m³
      </div>
      <div className="mb-2">
        <strong>Pollen Levels: </strong>
        Trees: {pollenLevel.tree} | Grass: {pollenLevel.grass} | Weed: {pollenLevel.weed}
      </div>
    </div>
  );
};

export default AirQualityCard;
