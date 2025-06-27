import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { NavBar } from './components/index.js';
import Loginpage from "./pages/Loginpage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Finish from "./forms/Finish.jsx";
import Assignment from "./components/Assignment";

function App() {
  const [showAssignment, setShowAssignment] = useState(false);

  const handleAckSelect = (data) => {
    console.log("Selected Ack Data:", data);
  };

  return (
    <Router>
      <NavBar />

      <div className="min-h-screen bg-gray-100 pt-6 px-4">
        {/* React Router Pages */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/finish" element={<Finish />} />
        </Routes>

        {/* Purple Menu UI */}
        <div className="mt-6">
          <header className="bg-blue-700 text-white p-3 text-center font-bold text-lg">
            VATSoft - VAT e-Filing System
          </header>

          <div className="bg-red-600 text-white text-center font-semibold py-1 text-sm">
            Charge VII
          </div>

          <nav className="flex flex-wrap items-center bg-purple-700 text-white px-4 py-2 text-sm font-semibold space-x-2">
            <div className="relative group">
              <button className="hover:bg-purple-800 px-3 py-1 rounded">
                e-registration
              </button>

              {/* Dropdown */}
              <div className="absolute left-0 top-full bg-white text-black w-56 mt-1 shadow-lg hidden group-hover:block z-10">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Approval</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Reports</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Appointments</li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-bold"
                    onClick={() => setShowAssignment(true)}
                  >
                    Assignment
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Closing of Appointments</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Transfer In</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Duplicate Certificate</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Dealer (Backlog)</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">CST (Backlog)</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Entry, Modify</li>
                </ul>
              </div>
            </div>

            <button className="hover:bg-purple-800 px-3 py-1 rounded">e-WayBill</button>
            <button className="hover:bg-purple-800 px-3 py-1 rounded">e-Audit</button>
            <button className="hover:bg-purple-800 px-3 py-1 rounded">e-CST Forms</button>
            <button className="hover:bg-purple-800 px-3 py-1 rounded">MIS Reports</button>
            <button className="hover:bg-purple-800 px-3 py-1 rounded">UPDATION</button>
            <button className="hover:bg-purple-800 px-3 py-1 rounded">Others</button>
            <button className="hover:bg-purple-800 px-3 py-1 rounded">DLR.ADMIN</button>
            <button className="hover:bg-purple-800 px-3 py-1 rounded">Returns</button>

            <button className="ml-auto underline hover:text-gray-200">Sign Out</button>
          </nav>

          {/* Main Menu Banner */}
          <div className="text-center text-sm mt-4">
            <div className="inline-block border border-purple-700 text-purple-700 font-semibold px-4 py-1 rounded">
              &lt;&lt;&lt; MAIN MENU &gt;&gt;&gt;
            </div>
          </div>

          {/* Assignment Section */}
          {showAssignment && <Assignment onSelectAck={handleAckSelect} />}
        </div>
      </div>
    </Router>
  );
}

export default App;
