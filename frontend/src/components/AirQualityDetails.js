import React, { useState, useEffect } from 'react';
import AirQualityCard from './AirQualityCard';

const AirQualityDetails = ({ user }) => {
  const [airQualityData, setAirQualityData] = useState({
    current: null,
    forecast: [],
    historical: [],
  });
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('current'); // 'current', 'forecast', or 'historical'

  const weatherbitApiKey = 'a4546b52e92c4b85a750828240e5a227';

  useEffect(() => {
    // Automatically reset selectedOption if user.subscription changes to free
    if (user && user.subscription === 'free') {
      setSelectedOption('current'); // Reset to current as 'historical' and 'forecast' are premium
    }
  }, [user]);

  const handleFetchAirQualityData = async () => {
    setError(null);
    setAirQualityData({ current: null, forecast: [], historical: [] });

    try {
      let url = '';
      if (selectedOption === 'current') {
        url = `https://api.weatherbit.io/v2.0/current/airquality?city=${city}&key=${weatherbitApiKey}`;
      } else if (selectedOption === 'forecast') {
        if (user.subscription === 'free') {
          setError('Air quality forecast is not available for free users.');
          return;
        }
        url = `https://api.weatherbit.io/v2.0/forecast/airquality?city=${city}&key=${weatherbitApiKey}`;
      } else if (selectedOption === 'historical' && startDate && endDate) {
        if (user.subscription === 'free') {
          setError('Historical air quality data is not available for free users.');
          return;
        }
        url = `https://api.weatherbit.io/v2.0/history/airquality?city=${city}&start_date=${startDate}&end_date=${endDate}&key=${weatherbitApiKey}`;
      } else {
        setError('Please provide valid inputs.');
        return;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        if (selectedOption === 'current') {
          setAirQualityData((prev) => ({ ...prev, current: data.data[0] }));
        } else if (selectedOption === 'forecast') {
          setAirQualityData((prev) => ({ ...prev, forecast: data.data }));
        } else if (selectedOption === 'historical') {
          setAirQualityData((prev) => ({ ...prev, historical: data.data }));
        }
      } else {
        setError('No data found for the specified option.');
      }
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      setError('Failed to fetch air quality data.');
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
        >
          <option value="current">Current Air Quality</option>
          {user && user.subscription !== 'free' && (
            <>
              <option value="historical">Historical Air Quality</option>
              <option value="forecast">Air Quality Forecast</option>
            </>
          )}
          {user && user.subscription === 'free' && (
            <>
              <option disabled value="historical">
                Historical Air Quality (Premium Only)
              </option>
              <option disabled value="forecast">
                Air Quality Forecast (Premium Only)
              </option>
            </>
          )}
        </select>

        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="ml-2 p-2 border border-gray-300 rounded"
        />

        {selectedOption === 'historical' && (
          <>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="ml-2 p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="ml-2 p-2 border border-gray-300 rounded"
            />
          </>
        )}

        <button
          onClick={handleFetchAirQualityData}
          className="ml-2 mt-2 bg-blue-500 text-white p-2 rounded"
        >
          Fetch Air Quality Data
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {selectedOption === 'current' && airQualityData.current && (
          <AirQualityCard
            title="Current Air Quality"
            aqi={airQualityData.current.aqi}
            pollutants={airQualityData.current}
          />
        )}

        {selectedOption === 'forecast' &&
          airQualityData.forecast.map((forecast, index) => (
            <AirQualityCard
              key={index}
              title={`Air Quality (${forecast.timestamp_local})`}
              timestamp={forecast.timestamp_local}
              aqi={forecast.aqi}
              pollutants={forecast}
            />
          ))}

        {selectedOption === 'historical' &&
          airQualityData.historical.map((data, index) => (
            <AirQualityCard
              key={index}
              title="Historical Air Quality"
              timestamp={data.timestamp_local}
              aqi={data.aqi}
              pollutants={data}
            />
          ))}
      </div>
    </div>
  );
};

export default AirQualityDetails;
