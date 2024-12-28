// src/pages/OurTeam.js
import React from 'react';

const OurTeamPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="font-bold text-2xl mb-4">Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg">John Doe</h3>
          <p className="text-sm text-gray-600">Lead Developer</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg">Jane Smith</h3>
          <p className="text-sm text-gray-600">UI/UX Designer</p>
        </div>
        {/* Add more team members as needed */}
      </div>
    </div>
  );
};

export default OurTeamPage;
