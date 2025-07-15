
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// Define your API base URL for Part B
const API_BASE_URL_PART_B = 'https://vat-portal-backend-nic.onrender.com/api/forms/partB/tin'; // Assuming a similar endpoint for Part B by TIN

const initialAddressState = {
  street: "", // Corresponds to res_street / perm_street
  village_city: "", // Corresponds to res_village_city / perm_village_city
  district: "West Tripura", // Corresponds to res_district / perm_district
  state: "Tripura", // Corresponds to res_state / perm_state
  pin_code: "", // Corresponds to res_pin_code / perm_pin_code
  // 'country' is not in DB table, keeping for UI if needed, but not part of direct DB mapping
  country: "INDIA",
};

const PartBForm = ({ onNext, onPrevious }) => {
  const {tinNumber} = useParams();

  const [formData, setFormData] = useState({
    ack_no: '',
    tin_no: '250710-00001', // This should ideally come from props or context, using hardcoded for now
    residentialAddress: { ...initialAddressState },
    permanentAddress: { ...initialAddressState },
    stat_auth_name: "REGISTER OF COMPANIES",
    stat_auth_other: "",
    econ_activity_code: "EACODE123", // Example default if not fetched
    is_manufacturer: false,
    is_trader: false,
    is_seller: false,
    is_reseller: false,
    is_importer: false,
    is_exporter: false,
    major_commodity: "Battery water, De-mineralised water",
    commodity_desc: "DESCRIPTION OF COMMODITY",
    first_taxable_dt: "", // Will be parsed to YYYY-MM-DD
    register_for: "VAT", // Renamed from vatType to match DB
    cot_type: "",
    est_turnover_12m: "", // Renamed from turnover to match DB
    filing_frequency: "", // Renamed from filingFreq to match DB
    // commodityList is for UI management of multiple commodities, not directly 1:1 with DB for this table.
    // We'll manage it separately if the backend provides a list.
    commodityList: [
      {
        act: "VAT",
        code: "218601",
        commodity: "Battery water, De-mineralised water",
        description: "DESCRIPTION OF COMMODITY",
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // The specific TIN number for this form, ideally passed from PartA or URL
  const tinNo = 'TIN123457';

  // Function to fetch Part B Data
  const fetchPartBData = async (currentTin) => {
    setLoading(true);
    setError(null);

    const authToken = Cookies.get('authToken');

    if (!authToken) {
      setError(new Error('Authentication token not found. Please log in.'));
      setLoading(false);
      return;
    }
    if (!currentTin) {
      setError(new Error('TIN is required to fetch Part B details.'));
      setLoading(false);
      return;
    }

    try {
      const apiUrl = `${API_BASE_URL_PART_B}/${currentTin}`;

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
          console.error("Authentication failed for Part B data. Please log in again.");
          setError(new Error(`Authentication failed (${response.status}). Please log in again.`));
          return;
        }
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();

      if (!data || Object.keys(data).length === 0 || data.error) {
        setError(new Error(data.error || "No data found for the provided TIN number for Part B."));
        setLoading(false);
        return;
      }

      // Format date to YYYY-MM-DD for date input type
      const formattedFirstTaxableDate = data.first_taxable_dt ? new Date(data.first_taxable_dt).toISOString().split('T')[0] : '';

      // MAPPING API RESPONSE TO DATABASE-ALIGNED formData STATE
      const mappedData = {
        ack_no: data.ack_no || '',
        tin_no: data.tin_no || currentTin,
        residentialAddress: {
          street: data.res_street || '',
          village_city: data.res_village_city || '',
          district: data.res_district || 'West Tripura',
          state: data.res_state || 'Tripura',
          pin_code: data.res_pin_code || '',
          country: 'INDIA', // Assuming default or if API provides
        },
        permanentAddress: {
          street: data.perm_street || '',
          village_city: data.perm_village_city || '',
          district: data.perm_district || 'West Tripura',
          state: data.perm_state || 'Tripura',
          pin_code: data.perm_pin_code || '',
          country: 'INDIA', // Assuming default or if API provides
        },
        stat_auth_name: data.stat_auth_name || 'REGISTER OF COMPANIES',
        stat_auth_other: data.stat_auth_other || '',
        econ_activity_code: data.econ_activity_code || 'EACODE123',
        is_manufacturer: data.is_manufacturer === true, // Ensure boolean
        is_trader: data.is_trader === true,
        is_seller: data.is_seller === true,
        is_reseller: data.is_reseller === true,
        is_importer: data.is_importer === true,
        is_exporter: data.is_exporter === true,
        major_commodity: data.major_commodity || 'Battery water, De-mineralised water',
        commodity_desc: data.commodity_desc || 'DESCRIPTION OF COMMODITY',
        first_taxable_dt: formattedFirstTaxableDate,
        register_for: data.register_for || 'VAT',
        cot_type: data.cot_type || '',
        est_turnover_12m: data.est_turnover_12m !== null ? String(data.est_turnover_12m) : '', // Convert number to string for input value
        filing_frequency: data.filing_frequency || '',
        // Initialize commodityList if API returns an array, otherwise keep default
        commodityList: data.commodity_list && Array.isArray(data.commodity_list) ? data.commodity_list : [
          {
            act: "VAT",
            code: data.major_commodity_code || "218601", // Assuming code from major_commodity_code
            commodity: data.major_commodity || "Battery water, De-mineralised water",
            description: data.commodity_desc || "DESCRIPTION OF COMMODITY",
          },
        ],
      };

      console.log("Mapped Part B Form Data (Database Schema Alignment):", mappedData);
      setFormData(mappedData);
      Cookies.set('partBFormData', JSON.stringify(mappedData), { expires: 1, secure: process.env.NODE_ENV === 'production' });

    } catch (e) {
      console.error("Error fetching Part B data:", e);
      setError(e instanceof Error ? e : new Error(e.message || "An unknown error occurred."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartBData(tinNo);
  }, [tinNo, navigate]);

  const handleAddressChange = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const handleEconomicActivityChange = (activityKey) => {
    setFormData(prev => ({
      ...prev,
      [activityKey]: !prev[activityKey], // Toggle the specific boolean flag
    }));
  };

  // Handle changes for main form fields that are directly in formData
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCommodityFieldChange = (field, value) => {
    // This state is for the *new* commodity being added, not the list itself
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddCommodity = () => {
    // We will use the major_commodity and commodity_desc from formData for the "new" commodity fields
    // Assuming 'code' for the new commodity will be entered separately, or derived.
    // For now, let's assume `code` would come from `econ_activity_code` or be a new input field.
    // For simplicity, let's just add the current `major_commodity` and `commodity_desc` to the list.
    if (formData.major_commodity && formData.commodity_desc) { // Using existing formData fields
      setFormData(prev => ({
        ...prev,
        commodityList: [
          ...prev.commodityList,
          {
            act: "VAT",
            code: prev.econ_activity_code, // Or from a dedicated 'commodity_code' input
            commodity: prev.major_commodity,
            description: prev.commodity_desc,
          },
        ],
      }));
      // Optionally reset the "add new commodity" fields if they were separate
      // setFormData(prev => ({ ...prev, major_commodity: '', commodity_desc: '' }));
    }
  };

  const handleDeleteCommodity = (idx) => {
    setFormData(prev => ({
      ...prev,
      commodityList: prev.commodityList.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ack_no: formData.ack_no,
      tin_no: formData.tin_no,
      res_street: formData.residentialAddress.street,
      res_village_city: formData.residentialAddress.village_city,
      res_district: formData.residentialAddress.district,
      res_state: formData.residentialAddress.state,
      res_pin_code: formData.residentialAddress.pin_code,
      perm_street: formData.permanentAddress.street,
      perm_village_city: formData.permanentAddress.village_city,
      perm_district: formData.permanentAddress.district,
      perm_state: formData.permanentAddress.state,
      perm_pin_code: formData.permanentAddress.pin_code,
      stat_auth_name: formData.stat_auth_name,
      stat_auth_other: formData.stat_auth_other,
      econ_activity_code: formData.econ_activity_code,
      is_manufacturer: formData.is_manufacturer,
      is_trader: formData.is_trader,
      is_seller: formData.is_seller,
      is_reseller: formData.is_reseller,
      is_importer: formData.is_importer,
      is_exporter: formData.is_exporter,
      major_commodity: formData.major_commodity,
      commodity_desc: formData.commodity_desc,
      first_taxable_dt: formData.first_taxable_dt,
      register_for: formData.register_for,
      cot_type: formData.cot_type,
      est_turnover_12m: formData.est_turnover_12m,
      filing_frequency: formData.filing_frequency,
      // If you need to send the entire commodityList to the backend, include it here.
      // The current DB schema suggests only major_commodity and commodity_desc are stored
      // in the main part_b table. A separate table would be needed for `commodityList`.
      // For now, we'll only send the major_commodity and commodity_desc.
      // commodity_list: formData.commodityList // Uncomment if your backend expects an array
    };

    console.log('Final Part B Form Data for submission:', dataToSubmit);
    onNext && onNext(dataToSubmit);
  };

   // Handlers for navigation
  const handlePrevious = () => {
    navigate(`/form/partA/${tinNumber}`, { state: { tinNo: tinNo } }); // Optional: pass tinNo back if PartA needs it on return
  };

  const handleNext = () => {
    // Before navigating, you might want to save Part B data to your backend
    // Or just proceed to CST.
    console.log('Proceeding to CST with TIN:', tinNo);
    navigate(`/form/cst/${tinNumber}`, { state: { tinNo: tinNo } }); // Pass tinNo to Part C
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#D5E1F0] p-4 font-sans flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading Part B form data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#D5E1F0] p-4 font-sans flex items-center justify-center">
        <p className="text-red-600 text-lg">Error loading Part B: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D5E1F0] p-4 font-sans flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex">
          {/* Sidebar (if any) */}
          <main className="flex-1">
            <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Part B</h2>
            <form onSubmit={handleSubmit}>
              {/* 8. Address */}
              <fieldset className="border border-gray-300 rounded mb-4 p-4">
                <legend className="font-semibold">8. Address</legend>
                {/* a) Residential Address */}
                <fieldset className="border border-gray-200 rounded mb-4 p-4">
                  <legend className="font-semibold">a) Residential Address</legend>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <label className="w-44 text-xs">Number & Street</label>
                    <input
                      type="text"
                      className="flex-1 p-1 border border-gray-300 rounded text-xs"
                      value={formData.residentialAddress.street}
                      onChange={e => handleAddressChange("residentialAddress", "street", e.target.value)}
                      placeholder="LECHUBABAN"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <label className="w-44 text-xs">Village/Town/City</label>
                    <input
                      type="text"
                      className="flex-1 p-1 border border-gray-300 rounded text-xs"
                      value={formData.residentialAddress.village_city}
                      onChange={e => handleAddressChange("residentialAddress", "village_city", e.target.value)}
                      placeholder="AGARTALA"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <label className="w-44 text-xs">District</label>
                    <select
                      className="p-1 border border-gray-300 rounded text-xs"
                      value={formData.residentialAddress.district}
                      onChange={e => handleAddressChange("residentialAddress", "district", e.target.value)}
                      disabled
                    >
                      <option>West Tripura</option>
                      <option>Sepahijala</option> {/* Added for example */}
                    </select>
                    <label className="w-16 text-xs ml-2">State</label>
                    <select
                      className="p-1 border border-gray-300 rounded text-xs w-40"
                      value={formData.residentialAddress.state}
                      onChange={e => handleAddressChange("residentialAddress", "state", e.target.value)}
                      disabled
                    >
                      <option>Tripura</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <label className="w-44 text-xs">PIN Code</label>
                    <input
                      type="text"
                      className="p-1 border border-gray-300 rounded text-xs w-32"
                      value={formData.residentialAddress.pin_code}
                      onChange={e => handleAddressChange("residentialAddress", "pin_code", e.target.value)}
                      placeholder="799010"
                      readOnly
                    />
                    <label className="w-20 text-xs ml-2">Country</label>
                    <select
                      className="p-1 border border-gray-300 rounded text-xs w-40"
                      value={formData.residentialAddress.country}
                      onChange={e => handleAddressChange("residentialAddress", "country", e.target.value)}
                      disabled
                    >
                      <option>INDIA</option>
                    </select>
                  </div>
                </fieldset>
                {/* b) Permanent Address */}
                <fieldset className="border border-gray-200 rounded mb-2 p-4">
                  <legend className="font-semibold">b) Permanent Address</legend>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <label className="w-44 text-xs">Number & Street</label>
                    <input
                      type="text"
                      className="flex-1 p-1 border border-gray-300 rounded text-xs"
                      value={formData.permanentAddress.street}
                      onChange={e => handleAddressChange("permanentAddress", "street", e.target.value)}
                      placeholder="LECHUBABAN"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <label className="w-44 text-xs">Village/Town/City</label>
                    <input
                      type="text"
                      className="flex-1 p-1 border border-gray-300 rounded text-xs"
                      value={formData.permanentAddress.village_city}
                      onChange={e => handleAddressChange("permanentAddress", "village_city", e.target.value)}
                      placeholder="AGARTALA"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <label className="w-44 text-xs">District</label>
                    <select
                      className="p-1 border border-gray-300 rounded text-xs"
                      value={formData.permanentAddress.district}
                      onChange={e => handleAddressChange("permanentAddress", "district", e.target.value)}
                      disabled
                    >
                      <option>West Tripura</option>
                      <option>Sepahijala</option> {/* Added for example */}
                    </select>
                    <label className="w-16 text-xs ml-2">State</label>
                    <select
                      className="p-1 border border-gray-300 rounded text-xs w-40"
                      value={formData.permanentAddress.state}
                      onChange={e => handleAddressChange("permanentAddress", "state", e.target.value)}
                      disabled
                    >
                      <option>Tripura</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <label className="w-44 text-xs">PIN Code</label>
                    <input
                      type="text"
                      className="p-1 border border-gray-300 rounded text-xs w-32"
                      value={formData.permanentAddress.pin_code}
                      onChange={e => handleAddressChange("permanentAddress", "pin_code", e.target.value)}
                      placeholder="799010"
                      readOnly
                    />
                    <label className="w-20 text-xs ml-2">Country</label>
                    <select
                      className="p-1 border border-gray-300 rounded text-xs w-40"
                      value={formData.permanentAddress.country}
                      onChange={e => handleAddressChange("permanentAddress", "country", e.target.value)}
                      disabled
                    >
                      <option>INDIA</option>
                    </select>
                  </div>
                </fieldset>
              </fieldset>
              {/* 9. Statutory Authority */}
              <fieldset className="border border-gray-300 rounded mb-4 p-4">
                <legend className="font-semibold">9. Name of the Statutory Authority with whom already registered</legend>
                <div className="mb-2">
                  <select
                    className="p-1 border border-gray-300 rounded text-xs w-full"
                    name="stat_auth_name"
                    value={formData.stat_auth_name}
                    onChange={handleChange}
                    disabled
                  >
                    <option>REGISTER OF COMPANIES</option>
                    <option>Others</option>
                  </select>
                </div>
                {formData.stat_auth_name === "Others" && (
                  <div className="mb-2 flex items-center gap-2">
                    <label className="text-xs">If Others, enter description:</label>
                    <input
                      type="text"
                      className="flex-1 p-1 border border-gray-300 rounded text-xs"
                      name="stat_auth_other"
                      value={formData.stat_auth_other}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                )}
              </fieldset>
              {/* 10. Economic Activity Code */}
              <fieldset className="border border-gray-300 rounded mb-4 p-4">
                <legend className="font-semibold">10. Economic Activity Code *</legend>
                <div className="flex flex-wrap gap-4">
                  {['is_manufacturer', 'is_trader', 'is_seller', 'is_reseller', 'is_importer', 'is_exporter'].map((activityKey) => (
                    <label key={activityKey} className="text-xs flex items-center gap-1">
                      <input
                        type="checkbox"
                        name={activityKey}
                        checked={formData[activityKey]}
                        onChange={() => handleEconomicActivityChange(activityKey)}
                        disabled
                      />
                      {activityKey.replace('is_', '').replace(/([A-Z])/g, ' $1').trim()} {/* Formats key for display */}
                    </label>
                  ))}
                </div>
              </fieldset>
              {/* 11. Major Commodity / Traded / Manufactured */}
              <fieldset className="border border-gray-300 rounded mb-4 p-4">
                <legend className="font-semibold">11. Major Commodity / Traded / Manufactured</legend>
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                  <label className="w-44 text-xs">Select Commodity</label>
                  <select
                    className="flex-1 p-1 border border-gray-300 rounded text-xs"
                    name="major_commodity"
                    value={formData.major_commodity}
                    onChange={handleChange}
                    disabled
                  >
                    <option>Battery water, De-mineralised water</option>
                    <option>Other Commodity</option>
                  </select>
                </div>
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                  <label className="w-44 text-xs">Dealer's description of commodity</label>
                  <input
                    type="text"
                    className="flex-1 p-1 border border-gray-300 rounded text-xs"
                    name="commodity_desc"
                    value={formData.commodity_desc}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                  <label className="w-44 text-xs">Code</label>
                  <input
                    type="text"
                    className="flex-1 p-1 border border-gray-300 rounded text-xs"
                    name="econ_activity_code" // Using econ_activity_code as a placeholder for commodity code from DB
                    value={formData.econ_activity_code}
                    onChange={handleChange}
                    readOnly
                  />
                  <button
                    type="button"
                    className="bg-[#5CA5FE] text-white px-3 py-1 rounded text-xs ml-2"
                    onClick={handleAddCommodity}
                    disabled // Disable if you don't want users to add more
                  >
                    [+] Add
                  </button>
                </div>
                <table className="w-full border border-gray-300 rounded mt-2 text-xs">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="py-1 px-2 border-b text-left">Act</th>
                      <th className="py-1 px-2 border-b text-left">Code</th>
                      <th className="py-1 px-2 border-b text-left">Commodity</th>
                      <th className="py-1 px-2 border-b text-left">Dealer's description</th>
                      <th className="py-1 px-2 border-b text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.commodityList.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-1 px-2">{item.act}</td>
                        <td className="py-1 px-2">{item.code}</td>
                        <td className="py-1 px-2">{item.commodity}</td>
                        <td className="py-1 px-2">{item.description}</td>
                        <td className="py-1 px-2">
                          <button
                            type="button"
                            className="text-red-600 underline text-xs"
                            onClick={() => handleDeleteCommodity(idx)}
                            disabled // Disable if you don't want users to delete
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </fieldset>
              {/* 12. Date of first Taxable Sale */}
              <fieldset className="border border-gray-300 rounded mb-4 p-4">
                <legend className="font-semibold">12. Date of first Taxable Sale</legend>
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-xs">(DD/MM/YYYY)</label>
                  <input
                    type="date"
                    className="p-1 border border-gray-300 rounded text-xs"
                    name="first_taxable_dt"
                    value={formData.first_taxable_dt}
                    onChange={handleChange}
                    readOnly
                  />
                  <button type="button" className="bg-[#5CA5FE] text-white px-3 py-1 rounded text-xs ml-2" disabled>
                    Submit Query
                  </button>
                </div>
              </fieldset>
              {/* 13. Do you wish to register for VAT, COT..? */}
              <fieldset className="border border-gray-300 rounded mb-4 p-4">
                <legend className="font-semibold">13. Do you wish to register for VAT , COT..?</legend>
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                  <select
                    className="p-1 border border-gray-300 rounded text-xs"
                    name="register_for"
                    value={formData.register_for}
                    onChange={handleChange}
                    disabled
                  >
                    <option>VAT</option>
                    <option>COT</option>
                    <option>Both</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs flex items-center gap-1">
                    <input
                      type="radio"
                      name="cot_type"
                      value="Dealer"
                      checked={formData.cot_type === "Dealer"}
                      onChange={handleChange}
                      disabled
                    />
                    Dealer
                  </label>
                  <label className="text-xs flex items-center gap-1">
                    <input
                      type="radio"
                      name="cot_type"
                      value="Hotelier"
                      checked={formData.cot_type === "Hotelier"}
                      onChange={handleChange}
                      disabled
                    />
                    Hotelier / Restaurateur / Caterer / Sweet meat stall / Bakery / Ice-cream Parlour
                  </label>
                  <label className="text-xs flex items-center gap-1">
                    <input
                      type="radio"
                      name="cot_type"
                      value="StoneCrushing"
                      checked={formData.cot_type === "StoneCrushing"}
                      onChange={handleChange}
                      disabled
                    />
                    Mechanised Stone Crushing and Granite Crushing units
                  </label>
                  <label className="text-xs flex items-center gap-1">
                    <input
                      type="radio"
                      name="cot_type"
                      value="WorksContractor"
                      checked={formData.cot_type === "WorksContractor"}
                      onChange={handleChange}
                      disabled
                    />
                    Works Contractor
                  </label>
                </div>
              </fieldset>
              {/* 14. Turnover estimated for 12 months/Quarters */}
              <fieldset className="border border-gray-300 rounded mb-4 p-4">
                <legend className="font-semibold">14. Turnover estimated for 12 months/Quarters *</legend>
                <div className="flex flex-wrap gap-2 items-center">
                  <input
                    type="text"
                    className="p-1 border border-gray-300 rounded text-xs"
                    name="est_turnover_12m"
                    value={formData.est_turnover_12m}
                    onChange={handleChange}
                    placeholder="10000"
                    readOnly
                  />
                </div>
              </fieldset>
              {/* 15. Frequency of filing returns */}
              <fieldset className="border border-gray-300 rounded mb-4 p-4">
                <legend className="font-semibold">15. Frequency of filing returns</legend>
                <div className="flex flex-wrap gap-4">
                  <label className="text-xs flex items-center gap-1">
                    <input
                      type="radio"
                      name="filing_frequency"
                      value="Monthly"
                      checked={formData.filing_frequency === "Monthly"}
                      onChange={handleChange}
                      disabled
                    />
                    Monthly
                  </label>
                  <label className="text-xs flex items-center gap-1">
                    <input
                      type="radio"
                      name="filing_frequency"
                      value="Quarterly"
                      checked={formData.filing_frequency === "Quarterly"}
                      onChange={handleChange}
                      disabled
                    />
                    Quarterly
                  </label>
                </div>
              </fieldset>
              {/* Navigation Buttons */}
              <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={handlePrevious}
            className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-bold"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-[#428BCA] text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-bold"
          >
            Next
          </button>
           </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PartBForm;
