// src/pages/About.js
import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6 md:p-12">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          About Us
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Welcome to our application! We are a passionate team dedicated to simplifying your daily life through our innovative and intuitive tools. Our mission is to empower you to efficiently manage your tasks, stay organized, and remain informed about global weather and time updates.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Our platform is built with user-friendliness and accessibility in mind, ensuring that you can seamlessly integrate our features into your daily routine. Whether you're managing projects, coordinating with international teams, or just planning your day, we are here to help.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Behind the scenes, our team of developers, designers, and strategists work tirelessly to improve and enhance your experience. We value your feedback and are always striving to meet and exceed your expectations.
        </p>
        <div className="bg-blue-100 rounded-lg p-4 text-center">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Our Vision
          </h3>
          <p className="text-gray-700">
            To create a world where technology bridges the gap between productivity and simplicity, helping individuals and teams achieve their goals effortlessly.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
            onClick={() => window.location.href = '/contact'}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
