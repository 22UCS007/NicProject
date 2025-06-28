// import React, { useState } from "react";

// const Cst = () => {
//   const [formData, setFormData] = useState({
//     cstNumber: "",
//     cstIssueDate: "",
//     issuingAuthority: "",
//     validityFrom: "",
//     validityTo: "",
//     remarks: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("CST Details Submitted:", formData);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-semibold text-blue-800 text-center mb-6">
//           CST Details Form
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label htmlFor="cstNumber" className="block text-gray-700 font-medium">
//               CST Number
//             </label>
//             <input
//               type="text"
//               id="cstNumber"
//               name="cstNumber"
//               value={formData.cstNumber}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter CST Number"
//             />
//           </div>

//           <div>
//             <label htmlFor="cstIssueDate" className="block text-gray-700 font-medium">
//               Issue Date
//             </label>
//             <input
//               type="date"
//               id="cstIssueDate"
//               name="cstIssueDate"
//               value={formData.cstIssueDate}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label htmlFor="issuingAuthority" className="block text-gray-700 font-medium">
//               Issuing Authority
//             </label>
//             <input
//               type="text"
//               id="issuingAuthority"
//               name="issuingAuthority"
//               value={formData.issuingAuthority}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter Issuing Authority"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="validityFrom" className="block text-gray-700 font-medium">
//                 Validity From
//               </label>
//               <input
//                 type="date"
//                 id="validityFrom"
//                 name="validityFrom"
//                 value={formData.validityFrom}
//                 onChange={handleChange}
//                 className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="validityTo" className="block text-gray-700 font-medium">
//                 Validity To
//               </label>
//               <input
//                 type="date"
//                 id="validityTo"
//                 name="validityTo"
//                 value={formData.validityTo}
//                 onChange={handleChange}
//                 className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="remarks" className="block text-gray-700 font-medium">
//               Remarks
//             </label>
//             <textarea
//               id="remarks"
//               name="remarks"
//               value={formData.remarks}
//               onChange={handleChange}
//               rows="3"
//               placeholder="Any additional remarks"
//               className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
//             >
//               Save CST Details
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Cst;


// import React, { useState } from "react";

// const Cst = () => {
//   const [applyCst, setApplyCst] = useState(null);
//   const [purchaseDate, setPurchaseDate] = useState("");
//   const [subcategory, setSubcategory] = useState("");
//   const [commodity, setCommodity] = useState("");
//   const [dealerDescription, setDealerDescription] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ applyCst, purchaseDate, subcategory, commodity, dealerDescription });
//   };

//   return (
//     <div className="min-h-screen bg-[#e1e7f0] flex justify-center items-start py-10 px-4">
//       <div className="w-full max-w-4xl bg-white border border-black">
//         <div className="bg-[#0079c2] text-white p-2 font-semibold border-b border-black">
//           CST Registration
//         </div>
//         <form onSubmit={handleSubmit} className="p-4 space-y-4 text-sm">
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">
//               21. Do you wish to apply for registration under CST Act?
//             </label>
//             <label className="ml-4">
//               <input type="radio" name="applyCst" value="yes" onChange={() => setApplyCst("Yes")} /> Yes
//             </label>
//             <label className="ml-4">
//               <input type="radio" name="applyCst" value="no" onChange={() => setApplyCst("No")} /> No
//             </label>
//           </div>

//           <div className="flex gap-2 items-center">
//             <label className="w-[300px]">Date from which following goods are proposed to be purchased *</label>
//             <input
//               type="date"
//               value={purchaseDate}
//               onChange={(e) => setPurchaseDate(e.target.value)}
//               className="border border-gray-400 px-2 py-1 text-sm w-[180px]"
//               required
//             />
//             <button type="button" className="bg-[#c6c6c6] px-3 py-1 ml-2 border border-black text-sm">
//               Submit Query
//             </button>
//           </div>

//           <div className="flex gap-2 items-center">
//             <label className="w-[300px]">Sub Category</label>
//             <select
//               value={subcategory}
//               onChange={(e) => setSubcategory(e.target.value)}
//               className="border border-gray-400 px-2 py-1 w-[180px]"
//             >
//               <option value="">-- Select --</option>
//               <option value="For resale">For resale</option>
//               <option value="Manufacturing">Manufacturing</option>
//               <option value="Processing">Processing</option>
//             </select>
//           </div>

//           <div className="flex gap-2 items-center">
//             <label className="w-[300px]">Select Commodity</label>
//             <input
//               type="text"
//               value={commodity}
//               onChange={(e) => setCommodity(e.target.value)}
//               placeholder="Battery water, De-mineralised water"
//               className="border border-gray-400 px-2 py-1 text-sm w-[250px]"
//             />
//           </div>

//           <div className="flex gap-2 items-center">
//             <label className="w-[300px]">Dealer's description of commodity</label>
//             <input
//               type="text"
//               value={dealerDescription}
//               onChange={(e) => setDealerDescription(e.target.value)}
//               className="border border-gray-400 px-2 py-1 text-sm w-[250px]"
//             />
//             <button
//               type="button"
//               className="bg-[#d4e2f0] px-2 py-1 border border-black text-xs text-blue-700 font-bold"
//             >
//               [+] Add
//             </button>
//           </div>

//           <div className="border border-black mt-4">
//             <div className="bg-red-300 text-red-900 font-semibold p-2 text-center border-b border-black">
//               List of CST Commodities
//             </div>
//             <div className="text-center text-sm text-red-800 py-3">
//               No Commodity under [CST] Act
//             </div>
//           </div>

//           <div className="flex justify-between mt-6">
//             <button
//               type="button"
//               className="bg-blue-700 text-white px-6 py-1 font-bold text-sm border border-black"
//             >
//               Previous
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-700 text-white px-6 py-1 font-bold text-sm border border-black"
//             >
//               Next
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Cst;

import React, { useState } from "react";

const Cst = () => {
  const [applyCst, setApplyCst] = useState(null);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [commodity, setCommodity] = useState("");
  const [dealerDescription, setDealerDescription] = useState("");
  const [commodities, setCommodities] = useState([]);

  const handleAddCommodity = () => {
    if (commodity.trim() && dealerDescription.trim()) {
      setCommodities((prev) => [...prev, { commodity, dealerDescription }]);
      setCommodity("");
      setDealerDescription("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ applyCst, purchaseDate, subcategory, commodities });
    alert("Form submitted. Check console for data.");
  };

  const handleSubmitQuery = () => {
    alert("Query Submitted for: " + purchaseDate);
  };

  const handlePrevious = () => {
    alert("Going to Previous Step...");
  };

  const handleNext = () => {
    alert("Proceeding to Next Step...");
  };

  return (
    <div className="min-h-screen bg-[#e1e7f0] flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-4xl bg-white border border-black">
        <div className="bg-[#0079c2] text-white p-2 font-semibold border-b border-black">
          CST Registration
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-sm">
          <div className="flex items-center gap-2">
            <label className="font-semibold">
              21. Do you wish to apply for registration under CST Act?
            </label>
            <label className="ml-4">
              <input type="radio" name="applyCst" value="yes" onChange={() => setApplyCst("Yes")} /> Yes
            </label>
            <label className="ml-4">
              <input type="radio" name="applyCst" value="no" onChange={() => setApplyCst("No")} /> No
            </label>
          </div>

          <div className="flex gap-2 items-center">
            <label className="w-[300px]">Date from which following goods are proposed to be purchased *</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="border border-gray-400 px-2 py-1 text-sm w-[180px]"
              required
            />
            <button
              type="button"
              onClick={handleSubmitQuery}
              className="bg-[#c6c6c6] px-3 py-1 ml-2 border border-black text-sm"
            >
              Submit Query
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <label className="w-[300px]">Sub Category</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="border border-gray-400 px-2 py-1 w-[180px]"
            >
              <option value="">-- Select --</option>
              <option value="For resale">For resale</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Processing">Processing</option>
            </select>
          </div>

          <div className="flex gap-2 items-center">
            <label className="w-[300px]">Select Commodity</label>
            <input
              type="text"
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              placeholder="Battery water, De-mineralised water"
              className="border border-gray-400 px-2 py-1 text-sm w-[250px]"
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="w-[300px]">Dealer's description of commodity</label>
            <input
              type="text"
              value={dealerDescription}
              onChange={(e) => setDealerDescription(e.target.value)}
              className="border border-gray-400 px-2 py-1 text-sm w-[250px]"
            />
            <button
              type="button"
              onClick={handleAddCommodity}
              className="bg-[#d4e2f0] px-2 py-1 border border-black text-xs text-blue-700 font-bold"
            >
              [+] Add
            </button>
          </div>

          <div className="border border-black mt-4">
            <div className="bg-red-300 text-red-900 font-semibold p-2 text-center border-b border-black">
              List of CST Commodities
            </div>
            <div className="text-sm py-3 px-4">
              {commodities.length === 0 ? (
                <div className="text-center text-red-800">No Commodity under [CST] Act</div>
              ) : (
                <ul className="list-disc ml-6">
                  {commodities.map((item, index) => (
                    <li key={index} className="mb-1">
                      <span className="font-medium">{item.commodity}</span>: {item.dealerDescription}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-blue-700 text-white px-6 py-1 font-bold text-sm border border-black"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-700 text-white px-6 py-1 font-bold text-sm border border-black"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cst;