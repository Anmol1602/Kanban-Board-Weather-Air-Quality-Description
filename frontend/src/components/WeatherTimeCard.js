import React from 'react';

const WeatherTimeCard = ({ country, weather, time, additionalInfo, iconCode }) => {
  // Construct the weather icon URL based on the provided icon code
  const iconUrl = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <h3 className="font-semibold text-lg">{country}</h3>
      <p className="text-sm text-gray-600">Weather: {weather}</p>
      <p className="text-sm text-gray-600">Time: {time}</p>
      
      {iconCode && (
        <div className="mt-2">
          <img src={iconUrl} alt="Weather Icon" className="w-12 h-12" />
        </div>
      )}

      {additionalInfo && (
        <div className="mt-2">
          {additionalInfo.temperature && (
            <p className="text-sm text-gray-600">Temperature: {additionalInfo.temperature}°C</p>
          )}
          {additionalInfo.maxTemp && (
            <p className="text-sm text-gray-600">Max Temp: {additionalInfo.maxTemp}°C</p>
          )}
          {additionalInfo.minTemp && (
            <p className="text-sm text-gray-600">Min Temp: {additionalInfo.minTemp}°C</p>
          )}
          {additionalInfo.windSpeed && (
            <p className="text-sm text-gray-600">Wind Speed: {additionalInfo.windSpeed} m/s</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherTimeCard;
