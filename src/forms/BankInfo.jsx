import React, { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";

const BankInfo = () => {
  const [bankName, setBankName] = useState(
    "Agartala Cooperative Urban Bank Ltd."
  );
  const [branchNameAddress, setBranchNameAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [accountType, setAccountType] = useState("Savings Account");
  const [bankAccounts, setBankAccounts] = useState([
    {
      bank: "Agartala Cooperative Urban Bank Ltd.",
      branch: "SBI",
      accountNumber: "2000000000",
      typeOfAccount: "SA",
      bankCode: "01",
    },
  ]);

  const handleAdd = () => {
    // if (!bankName || !branchNameAddress || !accountNumber) {
    //   console.error(
    //     "Please fill in all required fields (Bank Name, Branch Name/Address, Account Number)."
    //   );
    //   return;
    // }
    // console.log("Add button clicked");
    // const newAccount = {
    //   bank: bankName,
    //   branch: branchNameAddress,
    //   accountNumber: accountNumber,
    //   typeOfAccount: accountType === "Savings Account" ? "SA" : "CA",
    //   bankCode: branchCode,
    // };
    // setBankAccounts([...bankAccounts, newAccount]);

    // setBranchNameAddress("");
    // setAccountNumber("");
    // setBranchCode("");
    // setAccountType("Savings Account");
  };

  const handleUpdate = () => {
    console.log("Update button clicked");
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 flex flex-col items-center font-inter">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 pb-2">
          Bank Details
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white mb-6">
            <tbody>
              <tr className="bg-blue-50">
                <td className="py-3 px-4 border border-gray-200 w-12 text-left text-sm font-medium">
                  25.
                </td>

                <td className="py-3 px-4 border border-gray-200 font-bold text-gray-700 whitespace-nowrap text-right">
                  Bank Name<span className="text-red-500">*</span>
                </td>

                <td className="py-3 px-4 border border-gray-200 w-full">
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Agartala Cooperative Urban Bank Ltd.">
                      Agartala Cooperative Urban Bank Ltd.
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 border border-gray-200 w-12 text-left text-sm font-medium">
                  26.
                </td>
                <td className="py-3 px-4 border border-gray-200 font-bold text-gray-700 whitespace-nowrap text-right">
                  Branch Name,Address <span className="text-red-500">*</span>
                </td>
                <td className="py-3 px-4 border border-gray-200 w-full">
                  <input
                    type="text"
                    value={branchNameAddress}
                    onChange={(e) => setBranchNameAddress(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 border border-gray-200 w-12 text-left text-sm font-medium">
                  27.
                </td>
                <td className="py-3 px-4 border border-gray-200 font-bold text-gray-700 whitespace-nowrap text-right">
                  Account Number<span className="text-red-500">*</span>
                </td>
                <td className="py-3 px-4 border border-gray-200 w-full">
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 border border-gray-200 w-12 text-left text-sm font-medium">
                  28.
                </td>
                <td className="py-3 px-4 border border-gray-200 font-bold text-gray-700 whitespace-nowrap text-right">
                  Branch Code
                </td>
                <td className="py-3 px-4 border border-gray-200 w-full">
                  <input
                    type="text"
                    value={branchCode}
                    onChange={(e) => setBranchCode(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 border border-gray-200 w-12 text-left text-sm font-medium">
                  29.
                </td>
                <td className="py-3 px-4 border border-gray-200 font-bold text-gray-700 whitespace-nowrap text-right">
                  Type of Account
                </td>
                <td className="py-3 px-4 border border-gray-200 w-full">
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Savings Account">Savings Account</option>
                    <option value="Current Account">Current Account</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {" "}
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 text-sm sm:text-base"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
          <button
            onClick={handleUpdate}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 text-sm sm:text-base"
          >
            <Edit size={16} />
            <span>Update</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 text-sm sm:text-base"
          >
            <Trash size={16} />
            <span>Delete</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white shadow-inner rounded-md">
            <thead>
              <tr className="bg-cyan-600 text-white">
                <th className="py-3 px-4 border border-gray-300 text-left text-sm font-medium uppercase rounded-tl-md">
                  Select
                </th>
                <th className="py-3 px-4 border border-gray-300 text-left text-sm font-medium uppercase">
                  Bank
                </th>
                <th className="py-3 px-4 border border-gray-300 text-left text-sm font-medium uppercase">
                  Branch
                </th>
                <th className="py-3 px-4 border border-gray-300 text-left text-sm font-medium uppercase">
                  Account Number
                </th>
                <th className="py-3 px-4 border border-gray-300 text-left text-sm font-medium uppercase">
                  Type Of Account
                </th>
                <th className="py-3 px-4 border border-gray-300 text-left text-sm font-medium uppercase rounded-tr-md">
                  Bank Code
                </th>
              </tr>
            </thead>
            <tbody>
              {bankAccounts.map((account, index) => (
                <tr
                  key={index}
                  className="odd:bg-gray-50 hover:bg-gray-100 transition duration-150"
                >
                  <td className="py-3 px-4 border border-gray-200 text-center">
                    <input
                      type="radio"
                      name="selectAccount"
                      className="form-radio text-blue-600"
                    />
                  </td>
                  <td className="py-3 px-4 border border-gray-200 text-gray-800">
                    {account.bank}
                  </td>
                  <td className="py-3 px-4 border border-gray-200 text-gray-800">
                    {account.branch}
                  </td>
                  <td className="py-3 px-4 border border-gray-200 text-gray-800">
                    {account.accountNumber}
                  </td>
                  <td className="py-3 px-4 border border-gray-200 text-gray-800">
                    {account.typeOfAccount}
                  </td>
                  <td className="py-3 px-4 border border-gray-200 text-gray-800">
                    {account.bankCode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button className="px-6 py-3 bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition ease-in-out duration-150 text-base">
            Previous
          </button>
          <button className="px-6 py-3 bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition ease-in-out duration-150 text-base">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankInfo;
