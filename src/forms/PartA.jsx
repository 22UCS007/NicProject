

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Define your API base URL for Part A
const API_BASE_URL_PART_A = 'https://vat-portal-backend-nic.onrender.com/api/forms/partA/tin';

const PartAForm = () => {
  // State to manage form data, NOW ALIGNED WITH DATABASE COLUMN NAMES
  const [formData, setFormData] = useState({
    ack_no: '',         // Corresponds to 'ack_no' in DB
    tin_no: '',         // Corresponds to 'tin_no' in DB
    applicant_name: '', // Corresponds to 'applicant_name' in DB
    guardian_name: '',  // Corresponds to 'guardian_name' in DB

    dob: '',            // Corresponds to 'dob' in DB
    sex: '',            // Corresponds to 'sex' in DB
    trading_name: '',   // Corresponds to 'trading_name' in DB
    pan: '',            // Corresponds to 'pan' in DB
    premises_no: '',    // Corresponds to 'premises_no' in DB
    area_locality: '',  // Corresponds to 'area_locality' in DB
    village_city: '',   // Corresponds to 'village_city' in DB
    district: '',       // Corresponds to 'district' in DB
    state: 'Tripura',   // Assuming 'Tripura' is a default or fixed state as per your SQL
    pin_code: '',       // Corresponds to 'pin_code' in DB
    occupancy_status: '', // Corresponds to 'occupancy_status' in DB
    phone: '',          // Corresponds to 'phone' in DB (for telephone)
    mobile: '',         // Corresponds to 'mobile' in DB
    fax: '',            // Corresponds to 'fax' in DB
    email: '',          // Corresponds to 'email' in DB
    // These fields are from the original form but not directly in the provided SQL 'part_a' table.
    // They are kept for UI binding and might be part of other tables or derived.
    typeOfRegistration: '',
    selectLvoOffice: '',
    businessStatus: '',
    constitutionOfBusiness: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // The specific TIN number for this form
  const tinNo = '250710-00002'; // This will be passed to Part B

  // Function to fetch Part A Data
  const fetchFormData = async (currentTin) => {
    setLoading(true);
    setError(null);

    const authToken = Cookies.get('authToken');

    if (!authToken) {
      setError(new Error('Authentication token not found. Please log in.'));
      setLoading(false);
      return;
    }
    if (!currentTin) {
      setError(new Error('TIN is required to fetch Part A details.'));
      setLoading(false);
      return;
    }

    try {
      const apiUrl = `${API_BASE_URL_PART_A}/${currentTin}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          Cookies.remove('authToken');
          console.error("Authentication failed for Part A data. Please log in again.");
          setError(new Error(`Authentication failed (${response.status}). Please log in again.`));
          return;
        }
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();

      if (!data || Object.keys(data).length === 0 || data.error) {
        setError(new Error(data.error || "No data found for the provided TIN number."));
        setLoading(false);
        return;
      }

      // Format date to YYYY-MM-DD for date input type
      const formattedDateOfBirth = data.dob ? new Date(data.dob).toISOString().split('T')[0] : '';
      // Assuming 'state' is fixed or comes from a different part of the API if not in the current response.
      const stateValue = data.state || 'Tripura';

      // MAPPING API RESPONSE TO DATABASE-ALIGNED formData STATE
      const mappedData = {
        ack_no: data.ack_no || '',
        tin_no: data.tin_no || currentTin,
        applicant_name: data.applicant_name || '',
        guardian_name: data.guardian_name || '', // Map from API's guardian_name or similar
        dob: formattedDateOfBirth,
        sex: data.sex || '',
        trading_name: data.trading_name || '',
        pan: data.pan || '',
        premises_no: data.premises_no || '', // Map from API's premises_no or similar
        area_locality: data.area_locality || '', // Map from API's area_locality or similar
        village_city: data.village_city || '', // Map from API's village_city or similar
        district: data.district || '',
        state: stateValue,
        pin_code: data.pin_code || '', // Map from API's pin_code or similar
        occupancy_status: data.occupancy_status || '', // Map from API's occupancy_status or similar
        phone: data.phone || '', // Map from API's phone or similar
        mobile: data.mobile || '',
        fax: data.fax || '',
        email: data.email || '',

        // These are remaining fields that were in the initial formData but not explicitly in your SQL table.
        // Ensure your API provides data for these or set appropriate defaults/logic.
        typeOfRegistration: data.typeOfRegistration || '',
        selectLvoOffice: data.selectLvoOffice || '',
        businessStatus: data.businessStatus || '',
        constitutionOfBusiness: data.constitutionOfBusiness || '',
      };

      // Console log the mapped data
      console.log("Mapped Part A Form Data (Database Schema Alignment):", mappedData);

      setFormData(mappedData);
      Cookies.set('partAFormData', JSON.stringify(mappedData), { expires: 1, secure: process.env.NODE_ENV === 'production' });

    } catch (e) {
      console.error("Error fetching Part A data:", e);
      setError(e instanceof Error ? e : new Error(e.message || "An unknown error occurred."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormData(tinNo);
  }, [tinNo, navigate]);

  // Handle input changes (fields will be read-only in this implementation)
  const handleChange = (e) => {
    // If you need to enable editing for some fields, you would implement setFormData here.
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Part A Form Data to be submitted/passed:', formData);
    // Pass tinNo as state to the /partB route
    navigate('/partB', { state: { tinNo: formData.tin_no } });
  };

  // Consolidated loading and error checks
  if (loading) {
    return (
      <div className="min-h-screen bg-[#D5E1F0] p-4 font-sans flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading Part A form data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#D5E1F0] p-4 font-sans flex items-center justify-center">
        <p className="text-red-600 text-lg">Error loading Part A: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D5E1F0] p-4 font-sans flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Part A</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-sm">
          <form onSubmit={handleSubmit} className="col-span-1 md:col-span-4 space-y-4">
            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">PART(A)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="typeOfRegistration" className="text-gray-700 text-xs text-right pr-2">Type of Registration<span className="text-red-600 font-bold">*</span></label>
                <select
                  id="typeOfRegistration"
                  name="typeOfRegistration"
                  value={formData.typeOfRegistration}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                  disabled
                >
                  <option value="VOLUNTARY">VOLUNTARY</option>
                  <option value="MANDATORY">MANDATORY</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="selectLvoOffice" className="text-gray-700 text-xs text-right pr-2">Select LVO Office<span className="text-red-600 font-bold">*</span></label>
                <div className="flex flex-col md:flex-row items-center gap-2 w-full">
                  <select
                    id="selectLvoOffice"
                    name="selectLvoOffice"
                    value={formData.selectLvoOffice}
                    onChange={handleChange}
                    className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-auto flex-grow h-7 text-xs bg-white"
                    disabled
                  >
                    <option value="Supdt.of Taxes,Charge-VII">Supdt.of Taxes,Charge-VII</option>
                    <option value="Option 2">Option 2</option>
                  </select>
                  <span className="text-[#428BCA] cursor-pointer text-xs whitespace-nowrap">
                    Click here to know your VAT office
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="businessStatus" className="text-gray-700 text-xs text-right pr-2">Business Status/</label>
                <select
                  id="businessStatus"
                  name="businessStatus"
                  value={formData.businessStatus}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                  disabled
                >
                  <option value="Proprietary">Proprietary</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Company">Company</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <label htmlFor="constitutionOfBusiness" className="text-gray-700 text-xs text-right pr-2">Constitution of Business<span className="text-red-600 font-bold">*</span></label>
                <input
                  type="text"
                  id="constitutionOfBusiness"
                  name="constitutionOfBusiness"
                  value={formData.constitutionOfBusiness}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                  required
                  readOnly
                />
              </div>
            </div>

            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">1. Name of the Applicant Dealer<span className="text-red-600 font-bold">*</span></h4>
              <input
                type="text"
                name="applicant_name"
                value={formData.applicant_name}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                readOnly
              />
            </div>

            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">2. Father's/ Mother's/ Husband's Name</h4>
              <input
                type="text"
                name="guardian_name"
                value={formData.guardian_name}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                readOnly
              />
            </div>

            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">3. Date of Birth (DD/MM/YYYY)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 col-span-2 w-full h-7 text-xs bg-white"
                  required
                  readOnly
                />
                <button type="button" className="bg-[#428BCA] text-white py-1 px-2 rounded-sm hover:bg-blue-700 text-xs h-7" disabled>
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
                    disabled
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
                    disabled
                  />
                  <span className="ml-1 text-gray-700">Female</span>
                </label>
              </div>
            </div>

            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">4. Trading Name<span className="text-red-600 font-bold">*</span></h4>
              <input
                type="text"
                name="trading_name"
                value={formData.trading_name}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                readOnly
              />
            </div>

            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">6. PAN</h4>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                className="p-1 border border-[#C0D0E0] rounded-sm w-full h-7 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                readOnly
              />
            </div>

            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">7. Business Address (Principle place of business)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="premises_no" className="text-gray-700 text-xs text-right pr-2">Room/Flat/Premises No.<span className="text-red-600 font-bold">*</span></label>
                <input
                  type="text"
                  id="premises_no"
                  name="premises_no"
                  value={formData.premises_no}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                  required
                  readOnly
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="area_locality" className="text-gray-700 text-xs text-right pr-2">Area or Locality</label>
                <input
                  type="text"
                  id="area_locality"
                  name="area_locality"
                  value={formData.area_locality}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="village_city" className="text-gray-700 text-xs text-right pr-2">Village/ Town/ City</label>
                <input
                  type="text"
                  id="village_city"
                  name="village_city"
                  value={formData.village_city}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                  readOnly
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
                  disabled
                >
                  <option value="West Tripura">West Tripura</option>
                  <option value="Sepahijala">Sepahijala</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="state" className="text-gray-700 text-xs text-right pr-2">State<span className="text-red-600 font-bold">*</span></label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                  required
                  readOnly
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="pin_code" className="text-gray-700 text-xs text-right pr-2">PIN Code<span className="text-red-600 font-bold">*</span></label>
                <input
                  type="text"
                  id="pin_code"
                  name="pin_code"
                  value={formData.pin_code}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                  required
                  readOnly
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="occupancy_status" className="text-gray-700 text-xs text-right pr-2">Occupancy Status</label>
                <select
                  id="occupancy_status"
                  name="occupancy_status"
                  value={formData.occupancy_status}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                  disabled
                >
                  <option value="Owned">Owned</option>
                  <option value="Rented">Rented</option>
                </select>
              </div>
              <p className="text-[#428BCA] text-xs mt-2">
                If having more than one place of business, fill up form Additional Business Places
              </p>
            </div>

            <div className="bg-[#D5E1F0] p-4 rounded-lg border border-[#C0D0E0]">
              <h4 className="font-semibold text-[#5CA5F3] mb-3 text-sm">8. Contact Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 items-center">
                <label htmlFor="phone" className="text-gray-700 text-xs text-right pr-2">Telephone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="p-1 border border-[#C0D0E0] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-7 text-xs bg-white"
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
                />
              </div>
            </div>

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
