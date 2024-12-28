import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import WeatherDetails from './WeatherDetails';
import AirQualityDetails from './AirQualityDetails';

const KanbanBoard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data
    const fetchedUser = {
      id: 1,
      name: 'John Doe',
      subscription: 'premium', // or 'free'
    };
    setUser(fetchedUser);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow p-4">
        <Routes>
          <Route path="/weather" element={<WeatherDetails user={user} />} />
          <Route path="/airquality" element={<AirQualityDetails user={user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default KanbanBoard;
