import React from 'react';

const NavBar = ({ onLoginClick }) => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-black bg-opacity-50 text-white">
      <div className="relative w-1/2">
        <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
        <input
          type="text"
          placeholder="Search VAT content..."
          className="pl-10 pr-4 py-2 rounded w-full text-black"
        />
      </div>

      <button
        onClick={onLoginClick}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>
    </div>
  );
};

export default NavBar;


