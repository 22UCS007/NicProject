
// src/components/AckTable.js

function AckTable({ onSelect }) {
  const sampleAcks = [
    {
      ackNo: "12633089",
      ackDate: "13/06/2025",
      tin: "1200",
      applicantName: "ANJAN BHOWMIK",
      tradeName: "NATIONAL INFORMATICS CENTRE",
      address: "FLOOR SECRETARIAT AGARTALA 799010",
      purpose: "Registration",
      regFees: "50",
      cstReg: "N",
      assignedTo: "-",
    },
    {
      ackNo: "12633090",
      ackDate: "14/06/2025",
      tin: "1201",
      applicantName: "RAJESH DAS",
      tradeName: "TRIPURA TRADERS",
      address: "BANAMALIPUR, AGARTALA",
      purpose: "Registration",
      regFees: "75",
      cstReg: "Y",
      assignedTo: "-",
    },
  ];

  return (
    <div className="mt-6 overflow-auto">
      <table className="w-full border border-gray-400 text-sm">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="border px-2 py-1">Select</th>
            <th className="border px-2 py-1">Ack No</th>
            <th className="border px-2 py-1">Ack Date</th>
            <th className="border px-2 py-1">TIN</th>
            <th className="border px-2 py-1">Applicant Name</th>
            <th className="border px-2 py-1">Trade Name</th>
            <th className="border px-2 py-1">Address</th>
            <th className="border px-2 py-1">Purpose</th>
            <th className="border px-2 py-1">Reg Fees</th>
            <th className="border px-2 py-1">CST Reg.</th>
            <th className="border px-2 py-1">Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {sampleAcks.map((ack) => (
            <tr key={ack.ackNo} className="text-center hover:bg-gray-100">
              <td className="border px-2 py-1">
                <button
                  type="button"
                  className="text-blue-700 underline"
                  onClick={() => onSelect(ack)}
                >
                  Select
                </button>
              </td>
              <td className="border px-2 py-1">{ack.ackNo}</td>
              <td className="border px-2 py-1">{ack.ackDate}</td>
              <td className="border px-2 py-1">{ack.tin}</td>
              <td className="border px-2 py-1">{ack.applicantName}</td>
              <td className="border px-2 py-1">{ack.tradeName}</td>
              <td className="border px-2 py-1">{ack.address}</td>
              <td className="border px-2 py-1">{ack.purpose}</td>
              <td className="border px-2 py-1">{ack.regFees}</td>
              <td className="border px-2 py-1">{ack.cstReg}</td>
              <td className="border px-2 py-1">{ack.assignedTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AckTable;
