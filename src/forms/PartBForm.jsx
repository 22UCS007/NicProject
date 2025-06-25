// File: src/forms/PartBForm.jsx
import React, { useState } from 'react';

const PartBForm = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    dealerAddress: '',
    warehouseAddress: '',
    principlePlaceOfBusiness: 'Same as dealer address', // Default value
    businessType: 'Retailer', // Default value
    typeOfCommodity: [], // For the list of commodities
    commodityDescription: '',
    dateOfCommencementOfBusiness: '2025-01-01', // Example date
    dateOfCommencementOfLiability: '2025-01-01', // Example date
    previousRegistrationNumber: '',
    previousAct: '',
    frequencyOfFiling: 'Monthly', // Default value
    tinNumber: '', // From the screenshot, it looks like there's a TIN input area
  });

  // State for adding new commodity
  const [newCommodity, setNewCommodity] = useState({
    code: '',
    commodity: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCommodityChange = (e) => {
    const { name, value } = e.target;
    setNewCommodity((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCommodity = () => {
    if (newCommodity.code && newCommodity.commodity) {
      setFormData((prevData) => ({
        ...prevData,
        typeOfCommodity: [...prevData.typeOfCommodity, newCommodity],
      }));
      setNewCommodity({ code: '', commodity: '', description: '' }); // Clear input fields after adding
    }
  };

  const handleDeleteCommodity = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      typeOfCommodity: prevData.typeOfCommodity.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Part B Form Data:', formData);
    if (onNext) {
      onNext(formData);
    }
  };

  return (
    // Overall page background - Secondary Blue (rgb(213, 225, 240))
    <div className="min-h-screen bg-[#D5E1F0] p-4 font-sans flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Page Title */}
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Part B</h2>
        
        {/* Header Strip - Primary Blue (rgb(41, 77, 116)) */}
        <div className="bg-[#294D74] text-white p-3 rounded-t-lg mb-4 text-center">
          <h3 className="text-lg font-semibold">.:e-Registration-Inspector Note :.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-sm">
          {/* Left Navigation Panel - Primary Blue (rgb(41, 77, 116)) */}
          <div className="col-span-1 md:col-span-1 bg-[#294D74] text-white p-4 rounded-lg flex flex-col space-y-2 text-xs">
            <h4 className="font-bold mb-2">Ack.No.: 12633089</h4>
            <a href="#" className="hover:underline py-1 px-2 block">Part (A)</a>
            {/* Active Navigation Link - Secondary Blue background, Text Black */}
            <a href="#" className="bg-[#D5E1F0] text-black font-bold py-1 px-2 rounded block">Part (B)</a>
            <a href="#" className="hover:underline py-1 px-2 block">CST</a>
            <a href="#" className="hover:underline py-1 px-2 block">Part (C)</a>
            <a href="#" className="hover:underline py-1 px-2 block">Bank Info</a>
            <a href="#" className="hover:underline py-1 px-2 block">Additional Business Places</a>
            <a href="#" className="hover:underline py-1 px-2 block">Business Partner details</a>
            <a href="#" className="hover:underline py-1 px-2 block">Documents</a>
            <a href="#" className="hover:underline py-1 px-2 block">Finish</a>
          </div>

          {/* Main Form Content */}
          <form onSubmit={handleSubmit} className="col-span-1 md:col-span-3 space-y-4">
            {/* Dealer Address - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#294D74] mb-3 text-sm">1. Dealer Address<span className="text-red-600 font-bold">*</span></h4>
              <textarea
                name="dealerAddress"
                value={formData.dealerAddress}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-auto text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="3"
                required
              ></textarea>
            </div>

            {/* Warehouse Address - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#294D74] mb-3 text-sm">2. Warehouse Address<span className="text-red-600 font-bold">*</span></h4>
              <textarea
                name="warehouseAddress"
                value={formData.warehouseAddress}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-auto text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="3"
                required
              ></textarea>
            </div>

            {/* Principle Place of Business - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#294D74] mb-3 text-sm">3. Principle Place of Business<span className="text-red-600 font-bold">*</span></h4>
              <select
                name="principlePlaceOfBusiness"
                value={formData.principlePlaceOfBusiness}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="Same as dealer address">Same as dealer address</option>
                <option value="Other address">Other address</option>
              </select>
            </div>

            {/* Business Type - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#294D74] mb-3 text-sm">4. Business Type<span className="text-red-600 font-bold">*</span></h4>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="Retailer">Retailer</option>
                <option value="Wholesaler">Wholesaler</option>
                <option value="Manufacturer">Manufacturer</option>
              </select>
            </div>

            {/* Type of Commodity / Goods Manufactured - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#294D74] mb-3 text-sm">5. Type of Commodity / Goods Manufactured</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <input
                  type="text"
                  name="code"
                  placeholder="Add Code"
                  value={newCommodity.code}
                  onChange={handleCommodityChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                />
                <select
                  name="commodity"
                  value={newCommodity.commodity}
                  onChange={handleCommodityChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                >
                  <option value="">Select Commodity</option>
                  <option value="Battery water, De-mineralised water">Battery water, De-mineralised water</option>
                  <option value="Other Commodity">Other Commodity</option>
                </select>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  value={newCommodity.description}
                  onChange={handleCommodityChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                />
                {/* Add Button - Button Blue (rgb(66, 139, 202)) */}
                <button
                  type="button"
                  onClick={handleAddCommodity}
                  className="bg-[#428BCA] text-white py-1 px-2 rounded-sm hover:bg-blue-700 col-span-full md:col-span-1 w-full h-7 text-xs"
                >
                  [+] Add
                </button>
              </div>

              {formData.typeOfCommodity.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-semibold mb-2 text-xs text-[#294D74]">List of Commodities:</h5>
                  <div className="overflow-x-auto"> {/* Added for horizontal scrolling on small screens */}
                    <table className="min-w-full bg-white border border-[#C0D0E0] rounded-md text-xs">
                      <thead>
                        <tr className="bg-blue-100">
                          <th className="py-1 px-2 border-b text-left text-gray-700">Code</th>
                          <th className="py-1 px-2 border-b text-left text-gray-700">Commodity</th>
                          <th className="py-1 px-2 border-b text-left text-gray-700">Description</th>
                          <th className="py-1 px-2 border-b text-left text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.typeOfCommodity.map((item, index) => (
                          <tr key={index} className="border-b last:border-b-0">
                            <td className="py-1 px-2 text-gray-700">{item.code}</td>
                            <td className="py-1 px-2 text-gray-700">{item.commodity}</td>
                            <td className="py-1 px-2 text-gray-700">{item.description}</td>
                            <td className="py-1 px-2">
                              <button
                                type="button"
                                onClick={() => handleDeleteCommodity(index)}
                                className="text-red-600 hover:text-red-800 text-xs"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Dealer's description of commodity - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#294D74] mb-3 text-sm">Dealer's description of commodity</h4>
              <textarea
                name="commodityDescription"
                value={formData.commodityDescription}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-auto text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="3"
              ></textarea>
            </div>

            {/* Date of Commencement of Business - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#294D74] mb-3 text-sm">6. Date of Commencement of Business<span className="text-red-600 font-bold">*</span> (DD/MM/YYYY)</h4>
              <input
                type="date"
                name="dateOfCommencementOfBusiness"
                value={formData.dateOfCommencementOfBusiness}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Date of Commencement of Liability - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#294D74] mb-3 text-sm">7. Date of Commencement of Liability<span className="text-red-600 font-bold">*</span> (DD/MM/YYYY)</h4>
              <input
                type="date"
                name="dateOfCommencementOfLiability"
                value={formData.dateOfCommencementOfLiability}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Previous Registration Number (if any) - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#294D74] mb-3 text-sm">8. Previous Registration Number (if any)</h4>
              <input
                type="text"
                name="previousRegistrationNumber"
                value={formData.previousRegistrationNumber}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Previous Act - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#294D74] mb-3 text-sm">9. Previous Act</h4>
              <input
                type="text"
                name="previousAct"
                value={formData.previousAct}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Frequency of Filing Returns - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#294D74] mb-3 text-sm">10. Frequency of Filing Returns</h4>
              <select
                name="frequencyOfFiling"
                value={formData.frequencyOfFiling}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Half-Yearly">Half-Yearly</option>
                <option value="Annually">Annually</option>
              </select>
            </div>

            {/* TIN Number - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#294D74] mb-3 text-sm">TIN Number (as per screenshot)</h4>
              <input
                type="text"
                name="tinNumber"
                value={formData.tinNumber}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {/* Previous Button - Gray background, White text */}
              <button
                type="button"
                onClick={onPrevious}
                className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-bold"
              >
                Previous
              </button>
              {/* Next Button - Button Blue (rgb(66, 139, 202)) */}
              <button
                type="submit"
                className="bg-[#428BCA] text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-bold"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartBForm;
