// src/components/KanbanBoard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import WeatherDetails from './WeatherDetails';
import AirQualityDetails from './AirQualityDetails';

const KanbanBoard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow p-4">
        <Routes>
          <Route path="/weather" element={<WeatherDetails />} />
          <Route path="/airquality" element={<AirQualityDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default KanbanBoard;
