import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdditionalBusinessPlaces = () => {
  const {tinNumber} = useParams();
  const navigate  = useNavigate();

  const [formData, setFormData] = useState({
    regState: "",
    regCST: "",
    branchType: "Warehouse",
    name: "",
    street: "",
    locality: "",
    place: "",
    district: "",
    pin: "",
    phone: "",
    amendmentDate: "",
    location: "Within State",
  });

  const dummyPages = [
    [
      {
        id: 1,
        regState: "TR123",
        regCST: "CST123",
        branchType: "Warehouse",
        name: "LIC",
        street: "Hospital Road",
        locality: "Dharmanagar",
        place: "Dharmanagar",
        district: "North Tripura",
        pin: "799250",
        phone: "0381234567",
        amendmentDate: "2025-01-10",
        location: "Within State"
      }
    ],
    [
      {
        id: 2,
        regState: "TR456",
        regCST: "CST456",
        branchType: "Factory",
        name: "ONGC",
        street: "Airport Road",
        locality: "Udaipur",
        place: "Udaipur",
        district: "Gomati",
        pin: "799120",
        phone: "0381234568",
        amendmentDate: "2025-02-20",
        location: "Outside State"
      }
    ]
  ];

  const [pageIndex, setPageIndex] = useState(0);
  const [tableData, setTableData] = useState(dummyPages[0]);
  const [selectedId, setSelectedId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    const newEntry = { ...formData, id: Date.now() };
    const updatedPage = [...tableData, newEntry];
    const newDummyPages = [...dummyPages];
    newDummyPages[pageIndex] = updatedPage;
    setTableData(updatedPage);
    setSelectedId(null);
    setFormData({
      regState: "",
      regCST: "",
      branchType: "Warehouse",
      name: "",
      street: "",
      locality: "",
      place: "",
      district: "",
      pin: "",
      phone: "",
      amendmentDate: "",
      location: "Within State",
    });
  };

  const handleUpdate = () => {
    if (!selectedId) return;
    const updated = tableData.map((entry) =>
      entry.id === selectedId ? { ...formData, id: selectedId } : entry
    );
    const newDummyPages = [...dummyPages];
    newDummyPages[pageIndex] = updated;
    setTableData(updated);
    setSelectedId(null);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedId) return;
    const updated = tableData.filter((entry) => entry.id !== selectedId);
    const newDummyPages = [...dummyPages];
    newDummyPages[pageIndex] = updated;
    setTableData(updated);
    setSelectedId(null);
    resetForm();
  };

  const handleRowSelect = (id) => {
    const selected = tableData.find((row) => row.id === id);
    setSelectedId(id);
    setFormData({ ...selected });
  };

  // const handlePrevious = () => {
  //   if (pageIndex > 0) {
  //     setPageIndex((prev) => {
  //       const newIndex = prev - 1;
  //       setTableData(dummyPages[newIndex]);
  //       setSelectedId(null);
  //       return newIndex;
  //     });
  //   }
  // };

  // const handleNext = () => {
  //   if (pageIndex < dummyPages.length - 1) {
  //     setPageIndex((prev) => {
  //       const newIndex = prev + 1;
  //       setTableData(dummyPages[newIndex]);
  //       setSelectedId(null);
  //       return newIndex;
  //     });
  //   }
  // };

  // Handlers for navigation
  const handlePrevious = () => {
    navigate(`/form/bankinfo/${tinNumber}`);
  };

  const handleNext = () => {
    navigate(`/form/businesspartner/${tinNumber}`);
  };


  const resetForm = () => {
    setFormData({
      regState: "",
      regCST: "",
      branchType: "Warehouse",
      name: "",
      street: "",
      locality: "",
      place: "",
      district: "",
      pin: "",
      phone: "",
      amendmentDate: "",
      location: "Within State",
    });
    setSelectedId(null);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto bg-white shadow rounded border text-sm">
      <h2 className="text-2xl font-bold text-center text-red-700 mb-4">
        Additional Business Places
      </h2>

      {/* FORM SECTION (restored) */}
      <div className="grid grid-cols-12 gap-2 border p-4 bg-blue-50">
        <div className="col-span-2 flex items-center font-semibold">Name of the Applicant</div>
        <div className="col-span-4"><input type="text" className="input" value="ANJAN BHOWMIK" readOnly /></div>
        <div className="col-span-2 flex items-center font-semibold">Given Name</div>
        <div className="col-span-4"><input type="text" className="input" value="ANJAN BHOWMIK" readOnly /></div>

        <div className="col-span-2 flex items-center font-semibold">Sl.No*</div>
        <div className="col-span-2"><input type="text" className="input" value="1" readOnly /></div>
        <div className="col-span-8 flex items-center gap-4">
          <label className="font-semibold">Location of Business Place:</label>
          <label><input type="radio" name="location" defaultChecked className="mr-1" /> Within State</label>
          <label><input type="radio" name="location" className="mr-1" /> Outside State</label>
        </div>
      </div>

      <div className="bg-cyan-200 font-semibold text-black px-4 py-1 mt-4 border">
        Registration No. of Branch
      </div>

      <div className="border p-4 border-t-0 space-y-3">
        <div className="flex gap-6">
          <div className="flex items-center w-1/4">
            <label className="w-40">Under State Act:</label>
            <input type="text" className="input w-full" name="regState" placeholder="Enter under state act" value={formData.regState} onChange={handleChange} />
          </div>
          <div className="flex items-center w-1/3">
            <label className="w-48">Under CST Act, 1958:</label>
            <input type="text" className="input w-full" name="regCST" placeholder="Enter under CST act" value={formData.regCST} onChange={handleChange} />
          </div>
          <div className="flex items-center w-1/3">
            <label className="w-24">Branch Type</label>
            <select className="input w-full" name="branchType" value={formData.branchType} onChange={handleChange}>
              <option>Warehouse</option>
              <option>Godown</option>
              <option>Factory</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center w-1/2">
            <label className="w-32">Name*</label>
            <input type="text" className="input w-full" name="name" placeholder="Branch name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="flex items-center w-1/2">
            <label className="w-40">Number & Street</label>
            <input type="text" className="input w-full" name="street" placeholder="Number and street" value={formData.street} onChange={handleChange} />
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center w-1/2">
            <label className="w-40">Area or Locality</label>
            <input type="text" className="input w-full" name="locality" placeholder="Locality name" value={formData.locality} onChange={handleChange} />
          </div>
          <div className="flex items-center w-1/2">
            <label className="w-40">Village/ Town/ City*</label>
            <input type="text" className="input w-full" name="place" placeholder="Town or city" value={formData.place} onChange={handleChange} />
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center w-1/3">
            <label className="w-24">District</label>
            <input type="text" className="input w-full" name="district" placeholder="District" value={formData.district} onChange={handleChange} />
          </div>
          <div className="flex items-center w-1/3">
            <label className="w-24">PIN Code*</label>
            <input type="text" className="input w-full" name="pin" placeholder="PIN code" value={formData.pin} onChange={handleChange} />
          </div>
          <div className="flex items-center w-1/3">
            <label className="w-24">State</label>
            <input type="text" className="input w-full" value="TRIPURA" readOnly />
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center w-1/2">
            <label className="w-32">Tel No.</label>
            <input type="text" className="input w-full" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="flex items-center w-1/2">
            <label className="w-32">EDR Date</label>
            <input type="date" className="input w-full" name="amendmentDate" placeholder="dd-mm-yyyy" value={formData.amendmentDate} onChange={handleChange} />
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-32">Submit Query</label>
          <button className="bg-gray-600 text-white px-4 py-1 rounded">Query</button>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">[+] Add</button>
        <button onClick={handleUpdate} className="bg-yellow-500 text-white px-4 py-2 rounded">[!] Update</button>
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">[X] Delete</button>
      </div>

      <div className="mt-6 border">
        <div className="bg-gray-700 text-white font-semibold px-4 py-2 border-b">
          List of Business Places (Page {pageIndex + 1} of {dummyPages.length})
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-center bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1">Select</th>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Street</th>
                <th className="border px-2 py-1">Locality</th>
                <th className="border px-2 py-1">Place</th>
                <th className="border px-2 py-1">District</th>
                <th className="border px-2 py-1">PIN</th>
                <th className="border px-2 py-1">Phone No.</th>
                <th className="border px-2 py-1">Amendment Date</th>
                <th className="border px-2 py-1">RegNo. State Act</th>
                <th className="border px-2 py-1">RegNo. CST Act</th>
                <th className="border px-2 py-1">Business Location</th>
                <th className="border px-2 py-1">Branch Type</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className={selectedId === row.id ? "bg-blue-100" : ""}>
                  <td className="border px-2 py-1">
                    <input
                      type="radio"
                      checked={selectedId === row.id}
                      onChange={() => handleRowSelect(row.id)}
                    />
                  </td>
                  <td className="border px-2 py-1">{row.name}</td>
                  <td className="border px-2 py-1">{row.street}</td>
                  <td className="border px-2 py-1">{row.locality}</td>
                  <td className="border px-2 py-1">{row.place}</td>
                  <td className="border px-2 py-1">{row.district}</td>
                  <td className="border px-2 py-1">{row.pin}</td>
                  <td className="border px-2 py-1">{row.phone}</td>
                  <td className="border px-2 py-1">{row.amendmentDate}</td>
                  <td className="border px-2 py-1">{row.regState}</td>
                  <td className="border px-2 py-1">{row.regCST}</td>
                  <td className="border px-2 py-1">{row.location}</td>
                  <td className="border px-2 py-1">{row.branchType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handlePrevious}
          // disabled={pageIndex === 0}
          className="bg-blue-800 text-white font-bold px-6 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          // disabled={pageIndex === dummyPages.length - 1}
          className="bg-blue-800 text-white font-bold px-6 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdditionalBusinessPlaces;
