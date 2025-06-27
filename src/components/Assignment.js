// src/components/Assignment.js
import React, { useState } from "react";
import AckTable from "./AckTable";
import AssignmentForm from "./AssignmentForm";

function Assignment() {
  const [status, setStatus] = useState("unassigned");
  const [regType, setRegType] = useState("");
  const [ackNo, setAckNo] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [inspector, setInspector] = useState("");
  const [selectedData, setSelectedData] = useState(null); // <== used for switching to form

  // Function triggered when "Select" is clicked in table
  const handleAckSelect = (ackData) => {
    setSelectedData(ackData); // now show the detailed form
  };

  if (selectedData) {
    // Only show the detailed assignment form after selecting an Ack
    return (
   <AssignmentForm
  ack={selectedData}  // ✅ CORRECT PROP NAME
  onBack={() => setSelectedData(null)} 
/>

    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-6 p-6 border border-gray-300 rounded shadow text-sm bg-white">
      <div className="font-semibold text-blue-700 text-center mb-2 text-base">
        .: Assignment :.
      </div>

      {/* Status (Assigned/Unassigned) */}
      <div className="flex items-center gap-6 justify-center mb-4">
        <label><input type="radio" name="status" value="unassigned" checked={status === "unassigned"} onChange={(e) => setStatus(e.target.value)} className="mr-1" /> Unassigned</label>
        <label><input type="radio" name="status" value="assigned" checked={status === "assigned"} onChange={(e) => setStatus(e.target.value)} className="mr-1" /> Assigned</label>
      </div>

      {/* Registration Type */}
      <div className="flex flex-wrap gap-4 mb-4 items-center justify-center">
        <label className="font-semibold">Registration Type:</label>
        <label><input type="radio" name="regType" onChange={(e) => setRegType(e.target.value)} className="mr-1" /> VAT/CST Registration</label>
        <label><input type="radio" name="regType" onChange={(e) => setRegType(e.target.value)} className="mr-1" /> Transporter Registration</label>
        <label><input type="radio" name="regType" onChange={(e) => setRegType(e.target.value)} className="mr-1" /> Registration Amendment</label>
        <label><input type="radio" name="regType" onChange={(e) => setRegType(e.target.value)} className="mr-1" /> De-Registration (VAT/CST)</label>
        <label><input type="radio" name="regType" onChange={(e) => setRegType(e.target.value)} className="mr-1" /> Transfer</label>
        <label><input type="radio" name="regType" onChange={(e) => setRegType(e.target.value)} className="mr-1" /> Suspension/Revoke</label>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold">Ack. No.:</label>
          <input type="text" className="border border-gray-400 w-full px-2 py-1 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Applicant Name:</label>
          <input type="text" className="border border-gray-400 w-full px-2 py-1 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Trade Name:</label>
          <input type="text" className="border border-gray-400 w-full px-2 py-1 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Inspector:</label>
          <select className="border border-gray-400 w-full px-2 py-1 rounded">
            <option>-- Select Inspector --</option>
            <option>Kabita Das</option>
            <option>R. Roy</option>
            <option>A. Bhattacharya</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Details of Fees:</label>
      </div>

      <div className="flex justify-center gap-6 mb-6">
        <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-1 rounded">Assign</button>
        <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-1 rounded">Exit</button>
      </div>

      {/* Show the table with Select button */}
      <AckTable onSelect={handleAckSelect} />
    </div>
  );
}

export default Assignment;
