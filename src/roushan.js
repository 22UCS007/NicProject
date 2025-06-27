import React, { useState } from "react";
import Assignment from "./components/Assignment";
import "./index.css";

function App() {
  const [showAssignment, setShowAssignment] = useState(false);

  // Dummy function to handle ACK selection
  const handleAckSelect = (data) => {
    console.log("Selected Ack Data:", data);
    // You can pass this data to a form later if needed
  };

  return (
    <div className="min-h-screen bg-white">
      {/* VATSoft Title */}
      <div className="bg-blue-700 text-white p-3 text-center font-bold text-lg">
        VATSoft - VAT e-Filing System
      </div>

      {/* Charge VII - Red Banner */}
      <div className="bg-red-600 text-white text-center font-semibold py-1 text-sm">
        Charge VII
      </div>

      {/* Purple Main Menu */}
      <nav className="flex flex-wrap space-x-2 bg-purple-700 text-white px-4 py-2 text-sm font-semibold">
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
        <button className="ml-auto text-white underline hover:text-gray-200">Sign Out</button>
      </nav>

      {/* Main Menu Banner */}
      <div className="text-center text-sm mt-4">
        <div className="inline-block border border-purple-700 text-purple-700 font-semibold px-4 py-1 rounded">
          &lt;&lt;&lt; MAIN MENU &gt;&gt;&gt;
        </div>
      </div>

      {/* Render Assignment component with handler */}
      {showAssignment && <Assignment onSelectAck={handleAckSelect} />}
    </div>
  );
}

export default App;
