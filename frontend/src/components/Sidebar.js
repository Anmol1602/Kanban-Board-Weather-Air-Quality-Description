// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';  // Menu icon
import { GiSun, GiWindmill } from 'react-icons/gi';  // Weather and Air Quality icons
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';  // Collapse/Expand icons

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`w-${isCollapsed ? '20' : '64'} bg-blue-400 h-screen p-4 flex flex-col items-start transition-all duration-300`}>
      {/* Sidebar Header with Collapse Icon */}
      <div className="flex items-center justify-between mb-4 w-full">
        <h2 className={`text-xl text-white font-semibold ${isCollapsed ? 'hidden' : ''}`}>
          <FiMenu className="inline-block mr-2 text-xl" />
          Menu
        </h2>
        <button onClick={toggleSidebar} className="text-white">
          {isCollapsed ? (
            <MdChevronRight className="text-2xl" />
          ) : (
            <MdChevronLeft className="text-2xl" />
          )}
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="flex flex-col w-full">
        <li className="mb-2 w-full">
          <Link
            to="/kanban/weather"
            className="hover:bg-gray-600 p-2 block rounded text-white no-underline hover:no-underline w-full"
          >
            <GiSun className="inline-block mr-2 text-xl" />
            <span className={`${isCollapsed ? 'hidden' : 'inline'}`}>Weather Details</span>
          </Link>
        </li>
        <li className="mb-2 w-full">
          <Link
            to="/kanban/airquality"
            className="hover:bg-gray-600 p-2 block rounded text-white no-underline hover:no-underline w-full"
          >
            <GiWindmill className="inline-block mr-2 text-xl" />
            <span className={`${isCollapsed ? 'hidden' : 'inline'}`}>Air Quality Details</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
