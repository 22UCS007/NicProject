import React, { useState, useEffect } from 'react';

const AssignmentForm = ({ data, onBack, isDisabled = false }) => {
  const [inspector, setInspector] = useState('');
  const [assigned, setAssigned] = useState(false);

  // Reset form when data changes
  useEffect(() => {
    setInspector('');
    setAssigned(false);
  }, [data]);

  // If there's no data and not in disabled mode, return nothing
  if (!data && !isDisabled) return null;

  const handleAssign = () => {
    if (inspector) {
      setAssigned(true);
    } else {
      alert('Please select an inspector.');
    }
  };

  const handleExit = () => {
    if (onBack) onBack();
  };

  return (
    <div className="max-w-5xl mx-auto bg-white border p-4 rounded shadow">
      {/* Header */}
      <div className="bg-blue-500 text-white px-4 py-2 text-lg font-bold text-center mb-2 rounded">
        :.Assignment.:
      </div>

      {/* Assignment Status */}
      <div className="flex gap-6 justify-center mb-4 text-sm">
        <label className="inline-flex items-center">
          <input type="radio" name="status" checked readOnly className="mr-1" />
          Unassigned
        </label>
        <label className="inline-flex items-center">
          <input type="radio" name="status" disabled className="mr-1" />
          Assigned
        </label>
      </div>

      {/* Registration Types */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Registration Types:</label>
        <div className="flex flex-wrap gap-4 text-sm">
          {["VAT/CST Registration", "Transporter Registration", "Registration Amendment", "De-Registration (VAT/CST)", "Transfer", "Suspension/Revoke"].map((type, i) => (
            <label key={i}>
              <input type="radio" name="regtype" className="mr-1" disabled /> {type}
            </label>
          ))}
        </div>
      </div>

      {/* Basic Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold">Ack. No.:</label>
          <input
            value={data?.ackNo || ''}
            readOnly
            disabled
            className="border px-2 py-1 w-full rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Applicant Name:</label>
          <input
            value={data?.applicant || ''}
            readOnly
            disabled
            className="border px-2 py-1 w-full rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Trade Name:</label>
          <input
            value={data?.tradeName || ''}
            readOnly
            disabled
            className="border px-2 py-1 w-full rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Inspector:</label>
          <select
            value={inspector}
            onChange={(e) => setInspector(e.target.value)}
            className="border px-2 py-1 w-full rounded"
            disabled={isDisabled}
          >
            <option value="">-- Select Inspector --</option>
            <option value="Kabita Das">Kabita Das</option>
            <option value="Inspector A">Inspector A</option>
            <option value="Inspector B">Inspector B</option>
          </select>
        </div>
      </div>

      {/* Fee Table */}
      <h3 className="text-md font-semibold mb-2 mt-4">Details of Fees</h3>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm text-center">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="px-2 py-1">PAY MODE</th>
              <th className="px-2 py-1">PAY NO</th>
              <th className="px-2 py-1">PAY DATE</th>
              <th className="px-2 py-1">BANK NAME</th>
              <th className="px-2 py-1">TOTAL AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-2 py-1">{data?.feeDetails?.payMode || '-'}</td>
              <td className="px-2 py-1">{data?.feeDetails?.payNo || '-'}</td>
              <td className="px-2 py-1">{data?.feeDetails?.payDate || '-'}</td>
              <td className="px-2 py-1">{data?.feeDetails?.bankName || '-'}</td>
              <td className="px-2 py-1">{data?.feeDetails?.totalAmount || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-4 justify-center">
        {!isDisabled && (
          <>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
              onClick={handleAssign}
            >
              Assign
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded"
              onClick={handleExit}
            >
              Exit
            </button>
          </>
        )}
      </div>

      {/* Assignment Message */}
      {assigned && inspector && (
        <p className="mt-4 text-center text-red-600 font-semibold text-sm">
          {data.ackNo} assigned to {inspector}
        </p>
      )}
    </div>
  );
};

export default AssignmentForm;
