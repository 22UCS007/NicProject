
// src/components/AssignmentForm.js

import { useState } from "react";

const inspectorList = ["Kabita Das", "R. Roy", "A. Bhattacharya"];

function AssignmentForm({ ack, onBack }) {
  const [inspector, setInspector] = useState("");
  const [message, setMessage] = useState("");

  if (!ack) {
    return (
      <div className="text-center text-red-600">
        No Acknowledgement Selected
      </div>
    );
  }

  const feeDetails = {
    payMode: "Online",
    payNo: "TXN1256",
    payDate: "12/06/2025",
    bankName: "SBI",
    totalAmount: "₹50",
  };

  const handleAssign = () => {
    if (!inspector) {
      setMessage("Please select an inspector before assigning.");
      return;
    }

    setMessage(`✅ Assigned "${inspector}" to Ack No: ${ack.ackNo}`);
    // In real case, trigger PUT API call here
  };

  return (
    <div className="p-6 border border-gray-300 rounded shadow text-sm bg-white mt-4">
      <div className="font-semibold text-blue-700 text-center mb-4 text-base">
        .: Assignment :.
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-semibold mb-1">Ack. No.:</label>
          <input
            type="text"
            value={ack.ackNo}
            readOnly
            className="border border-gray-400 w-full px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Applicant Name:</label>
          <input
            type="text"
            value={ack.applicantName}
            readOnly
            className="border border-gray-400 w-full px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Trade Name:</label>
          <input
            type="text"
            value={ack.tradeName}
            readOnly
            className="border border-gray-400 w-full px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Inspector:</label>
          <select
            className="border border-gray-400 w-full px-2 py-1 rounded"
            value={inspector}
            onChange={(e) => setInspector(e.target.value)}
          >
            <option value="">-- Select Inspector --</option>
            {inspectorList.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Details of Fees Table */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Details of Fees:</label>
        <div className="overflow-auto">
          <table className="w-full border border-blue-800 text-sm">
            <thead className="bg-sky-200 text-black">
              <tr>
                <th className="border border-blue-800 px-2 py-1">Pay Mode</th>
                <th className="border border-blue-800 px-2 py-1">Pay No</th>
                <th className="border border-blue-800 px-2 py-1">Pay Date</th>
                <th className="border border-blue-800 px-2 py-1">Bank Name</th>
                <th className="border border-blue-800 px-2 py-1">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border border-blue-800 px-2 py-1">
                  {feeDetails.payMode}
                </td>
                <td className="border border-blue-800 px-2 py-1">
                  {feeDetails.payNo}
                </td>
                <td className="border border-blue-800 px-2 py-1">
                  {feeDetails.payDate}
                </td>
                <td className="border border-blue-800 px-2 py-1">
                  {feeDetails.bankName}
                </td>
                <td className="border border-blue-800 px-2 py-1">
                  {feeDetails.totalAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center mb-4">
        <button
          type="button"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-1 rounded"
          onClick={handleAssign}
        >
          Assign
        </button>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-1 rounded"
          onClick={onBack}
        >
          Exit
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="text-center text-red-600 font-semibold">
          {message}
        </div>
      )}
    </div>
  );
}

export default AssignmentForm;
