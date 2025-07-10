import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const AckTable = ({ onSelect }) => {
  const ackNo = 3;

  const [ackData, setAckData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAck = async () => {
      setLoading(true);
      setError(null);

      const token = Cookies.get('authToken');

      if (!token) {
        setError(new Error('Authentication token not found. Please log in.'));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://vat-portal-backend-nic.onrender.com/api/acknowledgements/${ackNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            Cookies.remove('token');
            throw new Error('Authentication failed. Please log in again.');
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || response.statusText);
          }
        }

        const data = await response.json();
        setAckData(data);
      } catch (err) {
        console.error('Error fetching acknowledgement:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAck();
  }, []);

  return (
    <div className="w-full bg-gray-50 py-6 px-4">
      <div className="p-4 border rounded shadow-md bg-white max-w-full overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-center text-blue-800">
          Acknowledgement Details (Ack No: {ackNo})
        </h2>

        <table className="w-full border border-gray-300 text-sm text-center">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-3 py-2">Select</th>
              <th className="px-3 py-2">Ack No</th>
              <th className="px-3 py-2">Ack Date</th>
              <th className="px-3 py-2">Applicant Name</th>
              <th className="px-3 py-2">Trade Name</th>
              <th className="px-3 py-2">Reg. Type</th>
              <th className="px-3 py-2">Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-4 text-blue-600">
                  Loading Acknowledgement details...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="py-4 text-red-600">
                  Error: {error.message}
                  {error.message.includes('Authentication') && (
                    <div className="mt-1 text-sm text-gray-600">Please login again.</div>
                  )}
                </td>
              </tr>
            ) : !ackData ? (
              <tr>
                <td colSpan="7" className="py-4 text-gray-500">
                  No acknowledgement data found.
                </td>
              </tr>
            ) : (
              <tr className="border-t">
                <td className="px-3 py-2">
                  <button
                    onClick={() =>
                      onSelect({
                        ackNo: ackData.ackNo,
                        ackDate: ackData.ackDate,
                        applicant: ackData.applicantName,
                        tradeName: ackData.tradeName,
                        registrationType: ackData.registrationType,
                        assignedTo: ackData.assignedTo,
                        feeDetails: {
                          payMode: ackData.payMode,
                          payNo: ackData.payNo,
                          payDate: ackData.payDate,
                          bankName: ackData.bankName,
                          totalAmount: ackData.totalAmount,
                        },
                      })
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Select
                  </button>
                </td>
                <td className="px-3 py-2">{ackData.ackNo}</td>
                <td className="px-3 py-2">{ackData.ackDate}</td>
                <td className="px-3 py-2">{ackData.applicantName}</td>
                <td className="px-3 py-2">{ackData.tradeName}</td>
                <td className="px-3 py-2">{ackData.registrationType}</td>
                <td className="px-3 py-2">{ackData.assignedTo || '-'}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

AckTable.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default AckTable;
