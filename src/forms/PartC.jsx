import React from "react";
import { useState } from "react";

const PartC = () => {
  
  const [formData, setFormData] = useState({
    regdNo: "",
    tradeLicense: "",
    dateOfIssue: "",
    dateOfLastRenewal: "",
    language: "English",
    accountingYearFrom: "April",
    accountingYearTo: "March",
    amountOfSaleLastQuarter: "12000",
    amountOfSaleLastYear: "12000",
    licenseIssuedNo: "",
    licenseIssuedDate: "",
    foodStaffLicenseNo: "",
    foodStaffLicenseDate: "",
    citizenOfIndia: "Yes", // 'Yes' or 'No'
    declarantName: "ANJAN BHOWMIK",
    declarantDesignation: "Chairman",
    finalDesignation: "SOFTWARE DEVELOPER",
  });

  const handleChange = (e) => {
    // const { name, value, type, checked } = e.target;
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: type === "radio" ? (checked ? value : prevData[name]) : value,
    // }));
  };
  return (
    <div className="min-h-screen flex justify-center items-start py-8 px-4 font-inter">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full overflow-hidden">
        <div className="h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-xl"></div>

        <div className="p-5">
          <FormRow
            rowNumber="19"
            label="Regd No. under Central Excise and Tariff Act (if any)"
            content={
              <input
                type="text"
                name="regdNo"
                value={formData.regdNo}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 flex-grow min-w-[8rem] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            }
          />

          <FormRow
            rowNumber="20"
            label="Trade License issued by the Municipality Office / Nagar Panchayat / Local Body"
            content={
              <input
                type="text"
                name="tradeLicense"
                value={formData.tradeLicense}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 flex-grow min-w-[8rem] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            }
          />

          <FormRow
            rowNumber="21"
            label="Date of issue of above certificate (reference to 20 above)"
            content={
              <>
                <input
                  type="date"
                  name="dateOfIssue"
                  value={formData.dateOfIssue}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 flex-grow min-w-[8rem] focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out">
                  Submit Query
                </button>
              </>
            }
          />

          <FormRow
            rowNumber="22"
            label="Date of last renewal of above certificate (reference to 20 above)"
            content={
              <>
                <input
                  type="date"
                  name="dateOfLastRenewal"
                  value={formData.dateOfLastRenewal}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 flex-grow min-w-[8rem] focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out">
                  Submit Query
                </button>
              </>
            }
          />

          <FormRow
            rowNumber="23"
            label="Language to be used in maintaining accounts"
            content={
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 flex-grow min-w-[8rem] focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="English">English</option>
                <option value="Bengali">Bengali</option>
                <option value="Hindi">Hindi</option>
              </select>
            }
          />

          <FormRow
            rowNumber="24"
            label="Accounting year"
            content={
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-700">From</span>
                <select
                  name="accountingYearFrom"
                  value={formData.accountingYearFrom}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="April">April</option>
                  <option value="January">January</option>
                  <option value="July">July</option>
                </select>
                <span className="text-gray-700">To</span>
                <select
                  name="accountingYearTo"
                  value={formData.accountingYearTo}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="March">March</option>
                  <option value="December">December</option>
                  <option value="June">June</option>
                </select>
              </div>
            }
          />

          <FormRow
            rowNumber="25"
            label="Amount of sale during"
            content={
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-500">*</span>
                  <span className="text-gray-700 w-24">Last Quarter</span>
                  <input
                    type="text"
                    name="amountOfSaleLastQuarter"
                    value={formData.amountOfSaleLastQuarter}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 flex-grow min-w-[8rem] focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">*</span>
                  <span className="text-gray-700 w-24">Last Year</span>
                  <input
                    type="text"
                    name="amountOfSaleLastYear"
                    value={formData.amountOfSaleLastYear}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 flex-grow min-w-[8rem] focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            }
          />

          <FormRow
            rowNumber="26"
            label="License Issued Under the Tripura Shops & Establishment Act"
            content={
              <div className="flex flex-col w-full gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 w-16">No.</span>
                  <input
                    type="text"
                    name="licenseIssuedNo"
                    value={formData.licenseIssuedNo}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 whitespace-nowrap w-32">
                    Date:
                  </span>
                  <input
                    type="date"
                    name="licenseIssuedDate"
                    value={formData.licenseIssuedDate}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out">
                    Submit Query
                  </button>
                </div>
              </div>
            }
          />

          <FormRow
            rowNumber="27"
            label="Food Staff Licence Issued by the Competent Authority"
            content={
              <div className="flex flex-col w-full gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 w-16">No.</span>
                  <input
                    type="text"
                    name="foodStaffLicenseNo"
                    value={formData.foodStaffLicenseNo}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 whitespace-nowrap w-32">
                    Date:
                  </span>
                  <input
                    type="date"
                    name="foodStaffLicenseDate"
                    value={formData.foodStaffLicenseDate}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out">
                    Submit Query
                  </button>
                </div>
              </div>
            }
          />

          <FormRow
            rowNumber="28"
            label="Whether Citizen of India or Not (Y/N)"
            content={
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="citizenOfIndia"
                    value="Yes"
                    checked={formData.citizenOfIndia === "Yes"}
                    onChange={handleChange}
                    className="form-radio text-blue-600 h-4 w-4"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="citizenOfIndia"
                    value="No"
                    checked={formData.citizenOfIndia === "No"}
                    onChange={handleChange}
                    className="form-radio text-blue-600 h-4 w-4"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
            }
          />
        </div>

        <div className="border-t border-gray-200 p-5 bg-gray-50 text-gray-800">
          <h3 className="text-lg font-semibold mb-3">Declaration</h3>
          <p className="mb-2">
            I
            <input
              type="text"
              name="declarantName"
              value={formData.declarantName}
              onChange={handleChange}
              className="inline-block border border-gray-300 rounded-md px-2 py-1 mx-2 w-40 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="declarantDesignation"
              value={formData.declarantDesignation}
              onChange={handleChange}
              className="inline-block border border-gray-300 rounded-md px-2 py-1 mx-2 w-40 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            hereby declare that the particulars given herein are correct and
          </p>
          <p className="mb-4">
            I hereby apply for registration for Value Added Tax .
          </p>
          <p>
            Designation
            <input
              type="text"
              name="finalDesignation"
              value={formData.finalDesignation}
              onChange={handleChange}
              className="inline-block border border-gray-300 rounded-md px-2 py-1 ml-2 w-60 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </p>
        </div>

        <div className="p-5 bg-gray-100 flex justify-center space-x-4 border-t border-gray-200">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-200 ease-in-out">
            Previous
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-200 ease-in-out">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
const FormRow = ({ rowNumber, label, content }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center py-3 px-5 border-b border-gray-200 last:border-b-0">
      <div className="w-full md:w-12 text-gray-600 font-semibold text-center mb-2 md:mb-0 border-r border-gray-300 pr-3">
        {" "}
        {rowNumber}
      </div>
      <div className="w-full md:w-96 text-gray-800 font-medium mb-2 md:mb-0 md:mr-4 pl-3">
        {" "}
        {label}
      </div>
      <div className="flex-grow flex items-center flex-wrap gap-2 w-full">
        {content}
      </div>
    </div>
  );
};

export { PartC };
