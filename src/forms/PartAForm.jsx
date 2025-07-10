// File: src/forms/PartAForm.jsx
import React, { useState } from 'react';

// PartAForm component for the VAT application
const PartAForm = ({ onNext }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    typeOfRegistration: 'VOLUNTARY',
    selectLvoOffice: 'Supdt.of Taxes,Charge-VII',
    businessStatus: 'Proprietary',
    constitutionOfBusiness: '',
    nameOfApplicantDealer: 'ANJAN BHOWMIK',
    fathersMothersHusbandsName: 'BIJAN BHOWMIK',
    dateOfBirth: '2000-02-01', // Date in YYYY-MM-DD format for date input
    sex: 'Male',
    tradingName: 'NATIONAL INFORMATICS CENTRE',
    pan: 'NNNNN4755N',
    roomFlatPremisesNo: 'FLOOR',
    areaOrLocality: 'SECRETARIAT',
    villageTownCity: 'AGARTALA',
    district: 'West Tripura',
    pinCode: '799010',
    occupancyStatus: 'Owned',
    telephone: '0312501478',
    fax: '0312501478',
    mobile: '9999999999',
    email: 'anjan@gmail.com',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Part A Form Data:', formData);
    // Call the onNext prop to move to the next step, passing the form data
    if (onNext) {
      onNext(formData);
    }
  };

  return (
    // Overall page background - Secondary Blue (rgb(213, 225, 240))
    <div className="min-h-screen bg-[#D5E1F0] p-4 font-sans flex items-center justify-center">
      <div className="bg-white p-6 cornered-lg shadow-lg w-full max-w-4xl">
        {/* Page Title */}
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Part A</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-sm">
          {/* Left Navigation Panel - Primary Blue (rgb(90, 155, 224)) */}

          {/* Main Form Content */}
          <form onSubmit={handleSubmit} className="col-span-1 md:col-span-3 space-y-4">
            {/* Form Section: PART(A) - Secondary Blue content area (rgb(213, 225, 240)) */}
            <div className="bg-[#D5E1F0] p-4 cornered-lg border border-[#C0D0E0]"> {/* Border Gray/Light Blue */}
              {/* Section Header Text - Primary Blue text (rgb(76, 141, 212)) */}
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">PART(A)</h4>
              {/* Type of Registration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                {/* Field Label */}
                <label htmlFor="typeOfRegistration" className="text-gray-700 text-xs text-right pr-2">Type of Registration<span className="text-red-600 font-bold">*</span></label>
                {/* Input Field Styling - White background, Border Gray/Light Blue */}
                <select
                  id="typeOfRegistration"
                  name="typeOfRegistration"
                  value={formData.typeOfRegistration}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] cornered-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                >
                  <option value="VOLUNTARY">VOLUNTARY</option>
                  <option value="MANDATORY">MANDATORY</option>
                </select>
              </div>

              {/* Select LVO Office */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="selectLvoOffice" className="text-gray-700 text-xs text-right pr-2">Select LVO Office<span className="text-red-600 font-bold">*</span></label>
                <div className="flex flex-col md:flex-row items-center gap-2 w-full">
                  <select
                    id="selectLvoOffice"
                    name="selectLvoOffice"
                    value={formData.selectLvoOffice}
                    onChange={handleChange}
                    className="p-1 border border-[#C0D0E0] cornered-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-auto flex-grow h-7 text-xs bg-white"
                  >
                    <option value="Supdt.of Taxes,Charge-VII">Supdt.of Taxes,Charge-VII</option>
                    <option value="Option 2">Option 2</option>
                  </select>
                  {/* Button Blue (rgb(66, 139, 202)) for link */}
                  <span className="text-[#428BCA] cursor-pointer text-xs whitespace-nowrap">
                    Click here to know your VAT office
                  </span>
                </div>
              </div>

              {/* Business Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="businessStatus" className="text-gray-700 text-xs text-right pr-2">Business Status/</label>
                <select
                  id="businessStatus"
                  name="businessStatus"
                  value={formData.businessStatus}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] cornered-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                >
                  <option value="Proprietary">Proprietary</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Company">Company</option>
                </select>
              </div>

              {/* Constitution of Business */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <label htmlFor="constitutionOfBusiness" className="text-gray-700 text-xs text-right pr-2">Constitution of Business<span className="text-red-600 font-bold">*</span></label>
                <input
                  type="text"
                  id="constitutionOfBusiness"
                  name="constitutionOfBusiness"
                  value={formData.constitutionOfBusiness}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] cornered-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                  required
                />
              </div>
            </div>

            {/* Section 1: Name and Details - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 cornered-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">1. Name of the Applicant Dealer<span className="text-red-600 font-bold">*</span></h4>
              <input
                type="text"
                name="nameOfApplicantDealer"
                value={formData.nameOfApplicantDealer}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] cornered-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Section 2: Father's/Mother's/Husband's Name - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 cornered-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">2. Father's/ Mother's/ Husband's Name</h4>
              <input
                type="text"
                name="fathersMothersHusbandsName"
                value={formData.fathersMothersHusbandsName}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] cornered-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Section 3: Date of Birth and Sex - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 cornered-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">3. Date of Birth (DD/MM/YYYY)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] cornered-sm focus:outline-none focus:ring-1 focus:ring-blue-500 col-span-2 w-full h-7 text-xs bg-white"
                  required
                />
                {/* Submit Query Button - Button Blue (rgb(66, 139, 202)) */}
                <button type="button" className="bg-[#428BCA] text-white py-1 px-2 rounded-sm hover:bg-blue-700 text-xs h-7">
                  Submit Query
                </button>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs">
                <span className="text-gray-700">Sex (M or F)<span className="text-red-600 font-bold">*</span></span>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="Male"
                    checked={formData.sex === 'Male'}
                    onChange={handleChange}
                    className="form-radio h-3 w-3 text-blue-600"
                  />
                  <span className="ml-1 text-gray-700">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="Female"
                    checked={formData.sex === 'Female'}
                    onChange={handleChange}
                    className="form-radio h-3 w-3 text-blue-600"
                  />
                  <span className="ml-1 text-gray-700">Female</span>
                </label>
              </div>
            </div>

            {/* Section 4: Trading Name - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 cornered-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">4. Trading Name<span className="text-red-600 font-bold">*</span></h4>
              <input
                type="text"
                name="tradingName"
                value={formData.tradingName}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] cornered-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Section 6: PAN - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 cornered-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">6. PAN</h4>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Section 7: Business Address - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 cornered-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">7. Business Address (Principle place of business)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="roomFlatPremisesNo" className="text-gray-700 text-xs text-right pr-2">Room/Flat/Premises No.<span className="text-red-600 font-bold">*</span></label>
                <input
                  type="text"
                  id="roomFlatPremisesNo"
                  name="roomFlatPremisesNo"
                  value={formData.roomFlatPremisesNo}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="areaOrLocality" className="text-gray-700 text-xs text-right pr-2">Area or Locality</label>
                <input
                  type="text"
                  id="areaOrLocality"
                  name="areaOrLocality"
                  value={formData.areaOrLocality}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="villageTownCity" className="text-gray-700 text-xs text-right pr-2">Village/ Town/ City</label>
                <input
                  type="text"
                  id="villageTownCity"
                  name="villageTownCity"
                  value={formData.villageTownCity}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="district" className="text-gray-700 text-xs text-right pr-2">District<span className="text-red-600 font-bold">*</span></label>
                <select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                >
                  <option value="West Tripura">West Tripura</option>
                  <option value="Sepahijala">Sepahijala</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="pinCode" className="text-gray-700 text-xs text-right pr-2">PIN Code<span className="text-red-600 font-bold">*</span></label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="occupancyStatus" className="text-gray-700 text-xs text-right pr-2">Occupancy Status</label>
                <select
                  id="occupancyStatus"
                  name="occupancyStatus"
                  value={formData.occupancyStatus}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                >
                  <option value="Owned">Owned</option>
                  <option value="Rented">Rented</option>
                </select>
              </div>
              <p className="text-[#428BCA] text-xs mt-2"> {/* Button Blue */}
                If having more than one place of business, fill up form Additional Business Places
              </p>
            </div>

            {/* Section 8: Contact Details - Secondary Blue content area */}
            <div className="bg-[#D5E1F0] p-4 cornered-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">8. Contact Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="telephone" className="text-gray-700 text-xs text-right pr-2">Telephone</label>
                <input
                  type="text"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="fax" className="text-gray-700 text-xs text-right pr-2">Fax</label>
                <input
                  type="text"
                  id="fax"
                  name="fax"
                  value={formData.fax}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="mobile" className="text-gray-700 text-xs text-right pr-2">Mobile</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <label htmlFor="email" className="text-gray-700 text-xs text-right pr-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                />
              </div>
            </div>

            {/* Next Button - Button Blue (rgb(66, 139, 202)) */}
            <div className="flex justify-center mt-6">
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

export default PartAForm;
