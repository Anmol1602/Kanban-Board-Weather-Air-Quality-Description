// src/components/WeatherDetails.js
import React, { useState } from 'react';
import WeatherTimeCard from './WeatherTimeCard';

const WeatherDetails = () => {
  const [weatherData, setWeatherData] = useState({
    currentWeather: null,
    historicalWeather: [],
    forecast: [],
  });
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  const [selectedOption, setSelectedOption] = useState('current'); // 'current', 'historical', or 'forecast'

  const weatherbitApiKey = 'a4546b52e92c4b85a750828240e5a227';

  const handleFetchWeatherData = async () => {
    setError(null); // Clear previous errors
    setWeatherData({ currentWeather: null, historicalWeather: [], forecast: [] }); // Reset weather data

    try {
      if (selectedOption === 'current') {
        const cityQuery = city && country ? `${city},${country}` : city;
        const queryString = cityQuery
          ? `&city=${encodeURIComponent(cityQuery)}`
          : `&lat=${lat}&lon=${lon}`;
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/current?key=${weatherbitApiKey}${queryString}&include=minutely`
        );
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setWeatherData((prev) => ({
            ...prev,
            currentWeather: data.data[0],
          }));
        } else {
          setError('No current weather data found.');
        }
      } else if (selectedOption === 'historical') {
        if (lat && lon && startDay && endDay) {
          const response = await fetch(
            `https://api.weatherbit.io/v2.0/normals?lat=${lat}&lon=${lon}&start_day=${startDay}&end_day=${endDay}&tp=daily&key=${weatherbitApiKey}`
          );
          const data = await response.json();
          setWeatherData((prev) => ({
            ...prev,
            historicalWeather: data.data || [],
          }));
        } else {
          setError('Please provide the necessary inputs for historical data.');
        }
      } else if (selectedOption === 'forecast') {
        const cityQuery = city && country ? `${city},${country}` : city;
        const queryString = cityQuery
          ? `&city=${encodeURIComponent(cityQuery)}`
          : `&lat=${lat}&lon=${lon}`;
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherbitApiKey}${queryString}`
        );
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setWeatherData((prev) => ({
            ...prev,
            forecast: data.data,
          }));
        } else {
          setError('No forecast data found.');
        }
      } else {
        setError('Invalid option selected.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="p-2 border border-gray-300 rounded max-w-xs w-full"
          style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}
        >
          <option value="current">Current Weather</option>
          <option value="historical">Historical Weather for 1920-2020</option>
          <option value="forecast">Forecast for next 16 days</option>
        </select>

        {selectedOption === 'forecast' || selectedOption === 'current' ? (
          <>
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="ml-2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Enter country (optional)"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="ml-2 p-2 border border-gray-300 rounded"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="ml-2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Longitude"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              className="ml-2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Start day (MM-DD)"
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
              className="ml-2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="End day (MM-DD)"
              value={endDay}
              onChange={(e) => setEndDay(e.target.value)}
              className="ml-2 p-2 border border-gray-300 rounded"
            />
          </>
        )}

        <button
          onClick={handleFetchWeatherData}
          className="ml-2 mt-2 bg-blue-500 text-white p-2 rounded w-full sm:w-auto"
        >
          Fetch Weather Data
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {selectedOption === 'current' && weatherData.currentWeather && (
          <WeatherTimeCard
            country="Current Weather"
            weather={weatherData.currentWeather.weather.description}
            time="Now"
            iconCode={weatherData.currentWeather.weather.icon} // Pass icon code
            additionalInfo={{
              temperature: weatherData.currentWeather.temp,
              windSpeed: weatherData.currentWeather.wind_spd,
            }}
          />
        )}

        {selectedOption === 'historical' &&
          weatherData.historicalWeather.map((data, index) => (
            <WeatherTimeCard
              key={index}
              country="Historical Weather"
              weather={`Temperature: ${data.temp}°C`}
              time={`${data.month}-${data.day}`}
              additionalInfo={{
                maxTemp: data.max_temp,
                minTemp: data.min_temp,
                windSpeed: data.wind_spd,
              }}
            />
          ))}

        {selectedOption === 'forecast' &&
          weatherData.forecast.map((data, index) => (
            <WeatherTimeCard
              key={index}
              country="Forecast"
              weather={data.weather.description}
              time={data.valid_date}
              iconCode={data.weather.icon} // Pass icon code
              additionalInfo={{
                maxTemp: data.max_temp,
                minTemp: data.min_temp,
                windSpeed: data.wind_spd,
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
