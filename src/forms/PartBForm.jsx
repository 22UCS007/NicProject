import React, { useState } from "react";

const initialAddress = {
  numberAndStreet: "",
  villageTownCity: "",
  district: "West Tripura",
  state: "TRIPURA",
  pinCode: "",
  country: "INDIA",
};

const PartBForm = ({ onNext, onPrevious }) => {
  const [residentialAddress, setResidentialAddress] = useState(initialAddress);
  const [permanentAddress, setPermanentAddress] = useState(initialAddress);
  const [statAuthority, setStatAuthority] = useState("REGISTER OF COMPANIES");
  const [statAuthorityOther, setStatAuthorityOther] = useState("");
  const [economicActivity, setEconomicActivity] = useState({
    Manufacturer: true,
    Trader: false,
    Seller: false,
    Reseller: false,
    Importer: false,
    Exporter: false,
  });
  const [commodity, setCommodity] = useState({
    code: "",
    commodity: "Battery water, De-mineralised water",
    description: "",
  });
  const [commodityList, setCommodityList] = useState([
    {
      act: "VAT",
      code: "218601",
      commodity: "Battery water, De-mineralised water",
      description: "DESCRIPTION OF COMMODITY",
    },
  ]);
  const [firstTaxableSale, setFirstTaxableSale] = useState("2025-02-01");
  const [vatType, setVatType] = useState("Normal VAT");
  const [cotType, setCotType] = useState("");
  const [turnover, setTurnover] = useState("");
  const [filingFreq, setFilingFreq] = useState("");

  const handleAddressChange = (type, field, value) => {
    if (type === "residential") {
      setResidentialAddress((prev) => ({ ...prev, [field]: value }));
    } else {
      setPermanentAddress((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleEconomicActivityChange = (activity) => {
    setEconomicActivity((prev) => ({
      ...prev,
      [activity]: !prev[activity],
    }));
  };

  const handleCommodityChange = (field, value) => {
    setCommodity((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddCommodity = () => {
    if (commodity.commodity && commodity.code) {
      setCommodityList((prev) => [
        ...prev,
        {
          act: "VAT",
          code: commodity.code,
          commodity: commodity.commodity,
          description: commodity.description,
        },
      ]);
      setCommodity({ code: "", commodity: "Battery water, De-mineralised water", description: "" });
    }
  };

  const handleDeleteCommodity = (idx) => {
    setCommodityList((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect all data and pass to parent
    onNext &&
      onNext({
        residentialAddress,
        permanentAddress,
        statAuthority,
        statAuthorityOther,
        economicActivity,
        commodityList,
        firstTaxableSale,
        vatType,
        cotType,
        turnover,
        filingFreq,
      });
  };

  return (
    <div className="min-h-screen bg-[#D5E1F0] p-4 font-sans flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Topbar */}
        <div className="bg-[#5CA5FE] text-white p-3 rounded-t-lg mb-4 flex justify-between items-center">
          <span className="font-semibold">::e-Registration-Inspector Note</span>
          <a href="#" className="text-white underline text-xs">Sign Out</a>
        </div>
        <div className="flex">
          {/* Sidebar */}
    
          {/* Main Form */}
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
                      value={residentialAddress.numberAndStreet}
                      onChange={e => handleAddressChange("residential", "numberAndStreet", e.target.value)}
                      placeholder="LECHUBABAN"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <label className="w-44 text-xs">Village/Town/City</label>
                    <input
                      type="text"
                      className="flex-1 p-1 border border-gray-300 rounded text-xs"
                      value={residentialAddress.villageTownCity}
                      onChange={e => handleAddressChange("residential", "villageTownCity", e.target.value)}
                      placeholder="AGARTALA"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <label className="w-44 text-xs">District</label>
                    <select
                      className="p-1 border border-gray-300 rounded text-xs"
                      value={residentialAddress.district}
                      onChange={e => handleAddressChange("residential", "district", e.target.value)}
                    >
                      <option>West Tripura</option>
                    </select>
                    <label className="w-16 text-xs ml-2">State</label>
                    <select
                      className="p-1 border border-gray-300 rounded text-xs w-40"
                      value={residentialAddress.state}
                      onChange={e => handleAddressChange("residential", "state", e.target.value)}
                    >
                      <option>TRIPURA</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <label className="w-44 text-xs">PIN Code</label>
                    <input
                      type="text"
                      className="p-1 border border-gray-300 rounded text-xs w-32"
                      value={residentialAddress.pinCode}
                      onChange={e => handleAddressChange("residential", "pinCode", e.target.value)}
                      placeholder="799010"
                    />
                    <label className="w-20 text-xs ml-2">Country</label>
                    <select
                      className="p-1 border border-gray-300 rounded text-xs w-40"
                      value={residentialAddress.country}
                      onChange={e => handleAddressChange("residential", "country", e.target.value)}
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
                      value={permanentAddress.numberAndStreet}
                      onChange={e => handleAddressChange("permanent", "numberAndStreet", e.target.value)}
                      placeholder="LECHUBABAN"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <label className="w-44 text-xs">Village/Town/City</label>
                    <input
                      type="text"
                      className="flex-1 p-1 border border-gray-300 rounded text-xs"
                      value={permanentAddress.villageTownCity}
                      onChange={e => handleAddressChange("permanent", "villageTownCity", e.target.value)}
                      placeholder="AGARTALA"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <label className="w-44 text-xs">District</label>
                    <select
                      className="p-1 border border-gray-300 rounded text-xs"
                      value={permanentAddress.district}
                      onChange={e => handleAddressChange("permanent", "district", e.target.value)}
                    >
                      <option>West Tripura</option>
                    </select>
                    <label className="w-16 text-xs ml-2">State</label>
                    <select
                      className="p-1 border border-gray-300 rounded text-xs w-40"
                      value={permanentAddress.state}
                      onChange={e => handleAddressChange("permanent", "state", e.target.value)}
                    >
                      <option>TRIPURA</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <label className="w-44 text-xs">PIN Code</label>
                    <input
                      type="text"
                      className="p-1 border border-gray-300 rounded text-xs w-32"
                      value={permanentAddress.pinCode}
                      onChange={e => handleAddressChange("permanent", "pinCode", e.target.value)}
                      placeholder="799010"
                    />
                    <label className="w-20 text-xs ml-2">Country</label>
                    <select
                      className="p-1 border border-gray-300 rounded text-xs w-40"
                      value={permanentAddress.country}
                      onChange={e => handleAddressChange("permanent", "country", e.target.value)}
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
                    value={statAuthority}
                    onChange={e => setStatAuthority(e.target.value)}
                  >
                    <option>REGISTER OF COMPANIES</option>
                    <option>Others</option>
                  </select>
                </div>
                {statAuthority === "Others" && (
                  <div className="mb-2 flex items-center gap-2">
                    <label className="text-xs">If Others, enter description:</label>
                    <input
                      type="text"
                      className="flex-1 p-1 border border-gray-300 rounded text-xs"
                      value={statAuthorityOther}
                      onChange={e => setStatAuthorityOther(e.target.value)}
                    />
                  </div>
                )}
              </fieldset>
              {/* 10. Economic Activity Code */}
              <fieldset className="border border-gray-300 rounded mb-4 p-4">
                <legend className="font-semibold">10. Economic Activity Code *</legend>
                <div className="flex flex-wrap gap-4">
                  {Object.keys(economicActivity).map((activity) => (
                    <label key={activity} className="text-xs flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={economicActivity[activity]}
                        onChange={() => handleEconomicActivityChange(activity)}
                      />
                      {activity}
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
                    value={commodity.commodity}
                    onChange={e => handleCommodityChange("commodity", e.target.value)}
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
                    value={commodity.description}
                    onChange={e => handleCommodityChange("description", e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                  <label className="w-44 text-xs">Code</label>
                  <input
                    type="text"
                    className="flex-1 p-1 border border-gray-300 rounded text-xs"
                    value={commodity.code}
                    onChange={e => handleCommodityChange("code", e.target.value)}
                  />
                  <button
                    type="button"
                    className="bg-[#5CA5FE] text-white px-3 py-1 rounded text-xs ml-2"
                    onClick={handleAddCommodity}
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
                    {commodityList.map((item, idx) => (
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
                    value={firstTaxableSale}
                    onChange={e => setFirstTaxableSale(e.target.value)}
                  />
                  <button type="button" className="bg-[#5CA5FE] text-white px-3 py-1 rounded text-xs ml-2">
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
                    value={vatType}
                    onChange={e => setVatType(e.target.value)}
                  >
                    <option>Normal VAT</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs flex items-center gap-1">
                    <input
                      type="radio"
                      name="cotType"
                      value="Dealer"
                      checked={cotType === "Dealer"}
                      onChange={e => setCotType(e.target.value)}
                    />
                    Dealer
                  </label>
                  <label className="text-xs flex items-center gap-1">
                    <input
                      type="radio"
                      name="cotType"
                      value="Hotelier"
                      checked={cotType === "Hotelier"}
                      onChange={e => setCotType(e.target.value)}
                    />
                    Hotelier / Restaurateur / Caterer / Sweet meat stall / Bakery / Ice-cream Parlour
                  </label>
                  <label className="text-xs flex items-center gap-1">
                    <input
                      type="radio"
                      name="cotType"
                      value="StoneCrushing"
                      checked={cotType === "StoneCrushing"}
                      onChange={e => setCotType(e.target.value)}
                    />
                    Mechanised Stone Crushing and Granite Crushing units
                  </label>
                  <label className="text-xs flex items-center gap-1">
                    <input
                      type="radio"
                      name="cotType"
                      value="WorksContractor"
                      checked={cotType === "WorksContractor"}
                      onChange={e => setCotType(e.target.value)}
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
                    value={turnover}
                    onChange={e => setTurnover(e.target.value)}
                    placeholder="10000"
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
                      name="filingFreq"
                      value="Monthly"
                      checked={filingFreq === "Monthly"}
                      onChange={e => setFilingFreq(e.target.value)}
                    />
                    Monthly
                  </label>
                  <label className="text-xs flex items-center gap-1">
                    <input
                      type="radio"
                      name="filingFreq"
                      value="Quarterly"
                      checked={filingFreq === "Quarterly"}
                      onChange={e => setFilingFreq(e.target.value)}
                    />
                    Quarterly
                  </label>
                </div>
              </fieldset>
              {/* Navigation Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 text-sm font-bold"
                  onClick={onPrevious}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="bg-[#5CA5FE] text-white px-6 py-2 rounded hover:bg-blue-700 text-sm font-bold"
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