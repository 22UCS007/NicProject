<<<<<<< HEAD
import React, { useState } from "react";
import { nicLogo } from "../assets/index.js";

const Footer = () => {
  const [name, setName] = useState("Amit chowdhury");
  const [designation, setDesignation] = useState("Superintendent");
  const date = new Date();

  return (
    <footer className="bg-blue-600 text-white p-4 rounded-lg shadow-lg mx-auto w-full max-w-full md:max-w-7xl mb-4">
      <div className="flex flex-col md:flex-row justify-between items-center text-center space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex-1 text-sm md:text-base text-center">
          <p>{name} / VAT Officer /</p>
          <p>{designation}</p>
        </div>

        <div className="flex-col items-center justify-center space-x-2">
          <img src={nicLogo} alt="NIC Logo" className="h-16 bg-white rounded" />
          <span>@National Informatics Center</span>
        </div>

        <div className="flex-1 text-sm md:text-base text-center">
          <p>{date.toLocaleDateString()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
=======
import React from 'react'

const Footer = () => {
  return (
    <div>
      
    </div>
  )
}

export default Footer
>>>>>>> origin/development
