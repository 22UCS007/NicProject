
// src/components/Assignment.js

import { useState } from "react";
import AckTable from "./AckTable";
import AssignmentForm from "./AssignmentForm";

function Assignment() {
  const [status, setStatus] = useState("unassigned");
  const [regType, setRegType] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  const handleAckSelect = (ackData) => {
    setSelectedData(ackData);
  };

  if (selectedData) {
    return (
      <AssignmentForm
        ack={selectedData}
        onBack={() => setSelectedData(null)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-6 p-6 border border-gray-300 rounded shadow text-sm bg-white">
      <div className="font-semibold text-blue-700 text-center mb-4 text-base">
        .: Assignment :.
      </div>

      {/* Assignment Status */}
      <div className="flex items-center gap-6 justify-center mb-4">
        {["unassigned", "assigned"].map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="status"
              value={value}
              checked={status === value}
              onChange={(e) => setStatus(e.target.value)}
              className="mr-1"
            />
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </label>
        ))}
      </div>

      {/* Registration Type */}
      <div className="flex flex-wrap gap-4 mb-4 items-center justify-center">
        <label className="font-semibold">Registration Type:</label>
        {[
          "VAT/CST Registration",
          "Transporter Registration",
          "Registration Amendment",
          "De-Registration (VAT/CST)",
          "Transfer",
          "Suspension/Revoke",
        ].map((type) => (
          <label key={type}>
            <input
              type="radio"
              name="regType"
              value={type}
              onChange={(e) => setRegType(e.target.value)}
              className="mr-1"
            />
            {type}
          </label>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold">Ack. No.:</label>
          <input
            type="text"
            className="border border-gray-400 w-full px-2 py-1 rounded"
            value={selectedData?.ackNo || ""}
            readOnly
          />
        </div>
        <div>
          <label className="block font-semibold">Applicant Name:</label>
          <input
            type="text"
            className="border border-gray-400 w-full px-2 py-1 rounded"
            value={selectedData?.applicantName || ""}
            readOnly
          />
        </div>
        <div>
          <label className="block font-semibold">Trade Name:</label>
          <input
            type="text"
            className="border border-gray-400 w-full px-2 py-1 rounded"
            value={selectedData?.tradeName || ""}
            readOnly
          />
        </div>
        <div>
          <label className="block font-semibold">Inspector:</label>
          <select
            className="border border-gray-400 w-full px-2 py-1 rounded"
            value={selectedData?.inspector || ""}
            onChange={(e) => setSelectedData((prev) => ({
              ...prev,
              inspector: e.target.value,
            }))}
          >
            <option value="">-- Select Inspector --</option>
            <option value="Kabita Das">Kabita Das</option>
            <option value="R. Roy">R. Roy</option>
            <option value="A. Bhattacharya">A. Bhattacharya</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Details of Fees:</label>
        {/* Add actual fee fields later if needed */}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          type="button"
          className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-1 rounded"
        >
          Assign
        </button>
        <button
          type="button"
          className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-1 rounded"
          onClick={() => setSelectedData(null)}
        >
          Exit
        </button>
      </div>

      {/* Table */}
      <AckTable onSelect={handleAckSelect} />
    </div>
  );
}

export default Assignment;
