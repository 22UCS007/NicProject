// import { useState } from 'react'
// import './App.css'
// import { NavBar } from './components/index.js'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <NavBar/>
//     </>
//   )
// }

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import { NavBar } from "./components"; // Make sure it's correctly exported
import React from "react";

function App() {
  return (
    <Router>
      <NavBar /> {/* ✅ always visible */}

      {/* ✅ Page content */}
      <div className="min-h-screen bg-gray-100 pt-6 px-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

