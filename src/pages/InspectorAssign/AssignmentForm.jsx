import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; //  for  authentication purpose

const AssignmentForm = ({ data, onBack, isDisabled = false }) => {
  const [inspector, setInspector] = useState('');
  const [inspectorList, setInspectorList] = useState([]);
  const [assigned, setAssigned] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const ackNo = data?.ackNo;

  useEffect(() => {
    const fetchInspectors = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        setError('Authentication token not found.');
        return;
      }

      try {
        const response = await fetch(
          'https://vat-portal-backend-nic.onrender.com/api/inspectors',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Failed to fetch inspectors');

        const inspectorData = await response.json();
        setInspectorList(inspectorData);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    if (data) {
      fetchInspectors();
    }
  }, [data]);

  useEffect(() => {
    setInspector('');
    setAssigned(false);
    setSuccessMsg('');
  }, [data]);

  if (!data && !isDisabled) return null;

  const handleAssign = async () => {
    if (!inspector) {
      alert('Please select an inspector.');
      return;
    }

    const token = Cookies.get('authToken');
    if (!token) {
      alert('Authentication token not found.');
      return;
    }

    try {
      const response = await fetch(
        `https://vat-portal-backend-nic.onrender.com/api/assign/${ackNo}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inspectorName: inspector }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Assignment failed');
      }

      const responseData = await response.json();
      setAssigned(true);
      setSuccessMsg(`${responseData.ackNo} assigned to ${responseData.assignedTo}`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleExit = () => {
    if (onBack) onBack();
  };

  return (
    <div className="max-w-5xl mx-auto bg-white border p-4 rounded shadow">
      <div className="bg-blue-500 text-white px-4 py-2 text-lg font-bold text-center mb-2 rounded">
        :.Assignment.:
      </div>

      <div className="flex gap-6 justify-center mb-4 text-sm">
        <label
          className={`inline-flex items-center ${
            !assigned ? 'text-blue-600 font-semibold' : 'text-gray-600'
          }`}
        >
          <input type="radio" name="status" checked={!assigned} readOnly className="mr-1" />
          Unassigned
        </label>
        <label
          className={`inline-flex items-center ${
            assigned ? 'text-blue-600 font-semibold' : 'text-gray-600'
          }`}
        >
          <input type="radio" name="status" checked={assigned} readOnly className="mr-1" />
          Assigned
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1 text-blue-800">Registration Types:</label>
        <div className="flex flex-wrap gap-4 text-sm">
          {[
            'VAT registration',
            'CST Registartion',
            'VAT',
            'BOTH',
            'New',
            'Renewal',
            'Amendment',
          ].map((type, i) => (
            <label
              key={i}
              className={`px-2 py-1 rounded ${
                data?.registrationType === type
                  ? 'text-blue-700 font-semibold'
                  : 'text-gray-600'
              }`}
            >
              <input
                type="radio"
                name="regtype"
                className="mr-1"
                checked={data?.registrationType === type}
                readOnly
              />
              {type}
            </label>
          ))}
        </div>
      </div>

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
            {inspectorList.map((insp, index) => (
              <option key={index} value={insp.username}>
                {insp.username} - {insp.designation}
              </option>
            ))}
          </select>
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
      </div>

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

      {assigned && successMsg && (
        <p className="mt-4 text-center text-green-600 font-semibold text-sm">
          ✅ {successMsg}
        </p>
      )}
    </div>
  );
};

export default AssignmentForm;
