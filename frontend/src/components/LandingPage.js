import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">Welcome to the Kanban Board</h1>
      <p className="text-xl text-gray-700 mb-6 text-center">
        Organize your tasks, stay updated with weather and time around the world, and manage your projects seamlessly.
      </p>

      {/* Conditionally render Sign Up and Log In buttons */}
      {!user ? (
        <div className="flex space-x-4">
          <Link
            to="/signup"
            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-white text-blue-500 border border-blue-500 px-6 py-3 rounded-md shadow-lg hover:bg-blue-100"
          >
            Log In
          </Link>
        </div>
      ) : (
        <div className="mt-10">
          <Link
            to="/kanban"
            className="bg-white text-blue-500 border border-blue-500 px-6 py-3 rounded-md shadow-lg hover:bg-blue-100 no-underline hover:no-underline w-full"
          >
            Explore the Kanban Board
          </Link>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
