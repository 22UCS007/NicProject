import React, { useEffect, useState } from 'react';
import  Cookies  from 'js-cookie';

const AckTable = ({ onSelect }) => {
  const [ackData, setAckData] = useState(null);

  useEffect(() => {
    const fetchAck = async () => {
      try {
        const response = await fetch('/api/acknowledgements/12633089');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAckData(data);
      } catch (error) {
        console.error('Error fetching acknowledgement:', error);
      }
    };

    fetchAck();
  }, []);

  if (!ackData) {
    return (
      <div className="text-center text-gray-500 py-10">Loading Acknowledgement...</div>
    );
  }

  return (
    <div className="w-full bg-gray-50 py-6 px-4">
      <div className="p-4 border rounded shadow-md bg-white max-w-full overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-center text-blue-800">
          Acknowledgement List
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
            <tr className="border-t">
              <td className="px-3 py-2">
                <button
                  onClick={() =>
                    onSelect({
                      ackNo: ackData.ackNo,
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AckTable;
