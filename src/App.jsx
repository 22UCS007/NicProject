import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { NavBar } from './components/index.js';
import Loginpage from "./pages/Loginpage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Finish from "./forms/Finish.jsx";

function App() {
  return (
    <Router>
      <NavBar />

      <div className="min-h-screen bg-gray-100 pt-6 px-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/finish" element={<Finish />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
