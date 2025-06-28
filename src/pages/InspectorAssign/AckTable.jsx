import React from 'react';

const dummyData = [
  {
    ackNo: '12633089',
    ackDate: '13/06/2025',
    tin: '1200',
    applicant: 'ANJAN BHOWMIK',
    tradeName: 'NATIONAL INFORMATICS CENTRE',
    address: 'FLOOR SECRETARIAT AGARTALA 799010',
    purpose: 'Registration',
    regFees: '50',
    cstReg: 'N',
    assignedTo: '-',
    feeDetails: {
      payMode: 'CF',
      payNo: '12345',
      payDate: '01/05/2025',
      bankName: 'STAMP PAPER',
      totalAmount: '50',
    },
  },
];

const AckTable = ({ onSelect }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-4 border rounded shadow-md bg-white">
        <h2 className="text-lg font-semibold mb-4 text-center text-blue-800">Acknowledgement List</h2>

        <table className="border border-gray-300 text-sm text-center">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-3 py-2">Select</th>
              <th className="px-3 py-2">Ack No</th>
              <th className="px-3 py-2">Ack Date</th>
              <th className="px-3 py-2">TIN</th>
              <th className="px-3 py-2">Applicant Name</th>
              <th className="px-3 py-2">Trade Name</th>
              <th className="px-3 py-2">Address</th>
              <th className="px-3 py-2">Purpose</th>
              <th className="px-3 py-2">RegFees</th>
              <th className="px-3 py-2">CST Reg.</th>
              <th className="px-3 py-2">AssignedTo</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-3 py-2">
                  <button
                    onClick={() => onSelect(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Select
                  </button>
                </td>
                <td className="px-3 py-2">{item.ackNo}</td>
                <td className="px-3 py-2">{item.ackDate}</td>
                <td className="px-3 py-2">{item.tin}</td>
                <td className="px-3 py-2">{item.applicant}</td>
                <td className="px-3 py-2">{item.tradeName}</td>
                <td className="px-3 py-2">{item.address}</td>
                <td className="px-3 py-2">{item.purpose}</td>
                <td className="px-3 py-2">{item.regFees}</td>
                <td className="px-3 py-2">{item.cstReg}</td>
                <td className="px-3 py-2">{item.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AckTable;
