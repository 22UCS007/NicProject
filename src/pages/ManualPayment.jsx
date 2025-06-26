import React, { useState, useEffect } from 'react';

// Define your API base URL here
const API_BASE_URL = 'https://your-api-base-url.com/payments'; // <<< IMPORTANT: Replace with your actual API base URL

function ManualPayment() {
  // State for form fields
  const [tin, setTin] = useState('');
  const [suspenseName, setSuspenseName] = useState('');
  const [regType, setRegType] = useState('');
  const [paymentWith, setPaymentWith] = useState('');
  const [regAcknowledgmentNo, setRegAcknowledgmentNo] = useState('');
  const [amountToBePaid, setAmountToBePaid] = useState('');

  // State for the current payment entry (Head of Account section)
  const [headOfAccount, setHeadOfAccount] = useState('3');
  const [paidTowards, setPaidTowards] = useState('VAT Rf');
  const [mode, setMode] = useState('Court Fee');
  const [courtFeeNo, setCourtFeeNo] = useState('');
  const [date, setDate] = useState('');
  const [micrCode, setMicrCode] = useState('');
  const [remarks, setRemarks] = useState('STAMP PAPER');
  const [amount, setAmount] = useState('0');
  const [interest, setInterest] = useState('');
  const [penalty, setPenalty] = useState('');

  // State for existing payments data (fetched from backend)
  const [payments, setPayments] = useState([]);
  // NEW STATE: For temporary payments not yet sent to backend
  const [unsavedPayments, setUnsavedPayments] = useState([]);

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // State for conditional visibility of sections
  const [showFullFirstSection, setShowFullFirstSection] = useState(false);
  const [showPaymentDetailsTable, setShowPaymentDetailsTable] = useState(false);
  const [showPreviousPaymentsTable, setShowPreviousPaymentsTable] = useState(false);
  // No separate state for unsaved payments table, it shows if unsavedPayments.length > 0

  // Effect to set the current date when the component mounts
  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear(); // Corrected variable name from '`>=`' to 'yyyy'
    setDate(`${dd}/${mm}/${yyyy}`);
  }, []);

  // Function to fetch payments from the backend API
  const fetchPayments = async () => {
    setIsLoading(true);
    // setMessage('Fetching payments...');
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Assuming your API returns an array of payment objects, each with an 'id'
      setPayments(data);
      setMessage('');
    } catch (error) {
      console.error("Error fetching payments from API:", error);
    //   setMessage(`Failed to fetch payments: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for the "Go" button
  const handleGo = async () => {
    setShowFullFirstSection(true);
    setShowPaymentDetailsTable(true);
    setShowPreviousPaymentsTable(true); // Always show Section 3 after Go
    await fetchPayments(); // Fetch existing payments when 'Go' is clicked
  };

  // Handler for adding a new payment to the temporary list
  const handleAddPayment = () => {
    // Basic validation
    if (!headOfAccount || !paidTowards || !mode || amount === null || amount === '') {
      setMessage('Please fill in all required fields for the new payment.');
      return;
    }

    const newPaymentData = {
      // It's important to include all data that needs to go to the backend
      // even if it's from Section 1, as these payments will be sent in a batch.
      // A unique client-side ID for temporary tracking.
      id: Date.now(), // Simple unique ID for the unsaved list
    //   tin,
      suspenseName,
      regType,
      paymentWith,
    //   regAcknowledgmentNo,
      amountToBePaid: parseFloat(amountToBePaid) || 0,
      headOfAccount,
      paidTowards,
      mode,
      courtFeeNo,
      date,
      micrCode,
      remarks,
      amount: parseFloat(amount) || 0,
      interest: parseFloat(interest) || 0,
      penalty: parseFloat(penalty) || 0,
      timestamp: new Date().toISOString()
    };

    setUnsavedPayments(prev => [...prev, newPaymentData]);
    
    // Clear fields for next entry
    setCourtFeeNo('');
    setMicrCode('');
    setRemarks('STAMP PAPER'); // Reset remarks to default if needed
    setAmount('0');
    setInterest('');
    setPenalty('');
  };

  // Handler for saving all temporary payments to the backend
  const handleSaveTemporaryPayments = async () => {
    if (unsavedPayments.length === 0) {
      setMessage('No temporary payments to save.');
      return;
    }

    setIsLoading(true);
    setMessage('Data saved successfully');
    try {
      // Send each unsaved payment individually (or batch if your API supports it)
      const savePromises = unsavedPayments.map(async (payment) => {
        // Remove the temporary 'id' if your backend generates its own
        const { id, ...dataToSend } = payment;
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers your API requires, e.g., 'Authorization': 'Bearer YOUR_TOKEN'
          },
          body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        return response.json();
      });

      await Promise.all(savePromises); // Wait for all save operations to complete

      setMessage('All temporary payments saved successfully!');
      setUnsavedPayments([]); // Clear temporary payments after successful save
      console.log('unsavedPayments array after clearing (in handleSave):', unsavedPayments); // Added for debugging
      await fetchPayments(); // Refresh the main payments list from backend
    } catch (error) {
      console.error("Error saving payments to API:", error);
      setMessage(`Failed to save payments: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for deleting a payment from the backend
  const handleDeletePayment = async (id) => {
    setIsLoading(true);
    setMessage('Deleting payment...');
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          // Add any required headers
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setMessage('Payment deleted successfully!');
      await fetchPayments(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting payment from API:", error);
      setMessage(`Failed to delete payment: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for deleting a payment from the temporary list
  const handleDeleteUnsavedPayment = (id) => {
    setUnsavedPayments(prev => prev.filter(payment => payment.id !== id));
    setMessage('Temporary payment removed.');
  };

  console.log('Unsaved Payments state (on render):', unsavedPayments); // Added for debugging

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6 lg:p-8 font-inter">
      <div className="w-full mx-auto bg-slate-200 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-400 text-white p-4 rounded-t-lg">
          <h1 className="text-xl sm:text-2xl font-bold text-center">Return/Payment Ack</h1>
        </div>

        {/* Section 1: Top part (up to Amount To Be Paid) - Half width, centered */}
        <div className="w-1/2 mx-auto p-4 sm:p-6 space-y-0.5">

          {/* TIN Section - This is always visible initially */}
          <div className="border border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
            {/* Left Column: Label */}
            <div className=" pl-7 text-gray-700 font-medium">TIN:
            </div>

            {/* Right Column: Input + Buttons */}
            <div className="flex border-l border-blue-600  items-center gap-2 p-1">
              <input
                type="text"
                id="tin"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                value={tin}
                onChange={(e) => setTin(e.target.value)}
              />
              <div className=" space-x-2 ">
                <button
                  onClick={handleGo}
                  className=" px-5 bg-violet-500 text-white font-semibold border border-blue-700 transition-all duration-100 ease-in-out hover:py-1"
                >
                  Go
                </button>
                <button className=" px-5 bg-violet-500  text-white font-semibold border border-blue-700 transition-all duration-100 ease-in-out hover:py-1">
                  Exit
                </button>
              </div>
            </div>
          </div>

          {/* Rest of Section 1 - Conditionally rendered after 'Go' */}
          {showFullFirstSection && (
            <>
              {/* Suspense Name */}
              <div className="border border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                <div className=" pl-7 text-gray-700 font-medium">
                  Suspense Name
                </div>
                <div className="flex border-l border-blue-600  items-center gap-2 pl-3">
                  <input
                    type="text"
                    id="suspenseName"
                    className=" p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={suspenseName}
                    onChange={(e) => setSuspenseName(e.target.value)}
                  />
                </div>

              </div>

              {/* Reg Type Radio Buttons */}
              <div className="border border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                <div className=" pl-7 text-gray-700 font-medium">Reg Type</div>

                <div className=" flex  border-l border-blue-600 flex-wrap gap-x-4 gap-y-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="regType"
                      value="VAT"
                      checked={regType === 'VAT'}
                      onChange={(e) => setRegType(e.target.value)}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">VAT</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="regType"
                      value="COT"
                      checked={regType === 'COT'}
                      onChange={(e) => setRegType(e.target.value)}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">COT</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="mul"
                      value="MUL"
                      checked={regType === 'MUL'}
                      onChange={(e) => setRegType(e.target.value)}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">MUL</span>
                  </label>
                </div>
              </div>

              {/* Payment With Radio Buttons */}
              <div className="border border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                <div className=" pl-7 text-gray-700 font-medium">Payment with</div>
                <div className="border-l border-blue-600 flex flex-wrap gap-x-4 gap-y-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="paymentWith"
                      value="Return_Demand_Notice"
                      checked={paymentWith === 'Return_Demand_Notice'}
                      onChange={(e) => setPaymentWith(e.target.value)}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Return Demand_Notice</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="Registration(VAT_Both)"
                      value="Registration(VAT_Both)"
                      checked={paymentWith === 'Registration(VAT_Both)'}
                      onChange={(e) => setPaymentWith(e.target.value)}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Registration (VAT & Both)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="Security_Deposit/PT_Registration(CST_Only)"
                      value="Security_Deposit/PT_Registration(CST_Only)"
                      checked={paymentWith === 'Security_Deposit/PT_Registration(CST_Only)'}
                      onChange={(e) => setPaymentWith(e.target.value)}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Security_Deposit/PT Registration (CST Only)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="Amendment_Fee"
                      value="Amendment_Fee"
                      checked={paymentWith === 'Amendment_Fee'}
                      onChange={(e) => setPaymentWith(e.target.value)}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Amendment Fee</span>
                  </label>
                </div>
              </div>

              {/* Registration Details */}
              <div className="border border-blue-600 grid grid-cols-[1.44fr_1.6fr_1.4fr] gap-x-4 items-center w-full">
                <div className="pl-7  text-gray-700 font-medium flex items-stretch">Registration Details</div>
                <div className="border-l border-blue-600 pl-3 text-gray-700 font-medium flex items-stretch h-full">Reg. Acknowledgement No.</div>
                <div className="border-l border-blue-600 flex items-stretch pl-3">
                  <div className="w-full flex items-center">
                    <input
                      type="text"
                      id="regAcknowledgmentNo"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={regAcknowledgmentNo}
                      onChange={(e) => setRegAcknowledgmentNo(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Amount To Be Paid */}
              <div className="border border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                <div className=" pl-7 text-gray-700 font-medium">Amount To Be Paid</div>
                <div className="flex border-l border-blue-600  items-center gap-2 pl-3">
                  <input
                    type="number"
                    id="amountToBePaid"
                    className="col-span-2 md:col-span-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={amountToBePaid}
                    onChange={(e) => setAmountToBePaid(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Section 2: Head of Account / Payment Details Table - Conditional Rendering */}
        {showPaymentDetailsTable && (
          <div className="w-3/4 mx-auto p-4 sm:p-6 ">
            <div className="overflow-x-auto">
              <table className="min-w-full  bg-neutral-300 border border-blue-500 ">
                <thead>
                  <tr className=" text-left text-sm text-gray-600 uppercase tracking-wider">
                    <th className="p-2 border-b border-blue-500 ">Head Of Account</th>
                    <th className="p-2 border-b border-l border-blue-500">Paid Towards</th>
                    <th className="p-2 border-b border-l border-blue-500">Mode</th>
                    <th className="p-2 border-b border-l border-blue-500">Court Fee No.</th>
                    <th className="p-2 border-b border-l border-blue-500">Date</th>
                    <th className="p-2 border-b border-l border-blue-500">MICR Code</th>
                    <th className="p-2 border-b border-l border-blue-500">Remarks</th>
                    <th className="p-2 border-b border-l border-blue-500">Amount</th>
                    <th className="p-2 border-b border-l border-blue-500">Interest</th>
                    <th className="p-2 border-b border-l border-blue-500">Penalty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-b border-l border-blue-500">
                      <select
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={headOfAccount}
                        onChange={(e) => setHeadOfAccount(e.target.value)}
                      >
                        <option value="3-Registration Fee">3-Registration Fee</option>
                        {/* Add more options as needed */}
                      </select>
                    </td>
                    <td className="p-2 border-b border-l border-blue-500">
                      <select
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={paidTowards}
                        onChange={(e) => setPaidTowards(e.target.value)}
                      >
                        <option value="VAT Rf">VAT Rf</option>
                        {/* Add more options as needed */}
                      </select>
                    </td>
                    <td className="p-2 border-b border-l border-blue-500">
                      <select
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                      >
                        <option value="Court Fee">Court Fee</option>
                        {/* Add more options as needed */}
                      </select>
                    </td>
                    <td className="p-2 border-b border-l border-blue-500">
                      <input
                        type="text"
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={courtFeeNo}
                        onChange={(e) => setCourtFeeNo(e.target.value)}
                      />
                    </td>
                    <td className="p-2 border-b border-l border-blue-500">
                      <input
                        type="text" // Use text for date input for consistency with given format
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="DD/MM/YYYY"
                      />
                    </td>
                    <td className="p-2 border-b border-l border-blue-500">
                      <input
                        type="text"
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={micrCode}
                        onChange={(e) => setMicrCode(e.target.value)}
                      />
                    </td>
                    <td className="p-2 border-b border-l border-blue-500">
                      <input
                        type="text"
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                      />
                    </td>
                    <td className="p-2 border-b border-l border-blue-500">
                      <input
                        type="number"
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </td>
                    <td className="p-2 border-b border-l border-blue-500">
                      <input
                        type="number"
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                      />
                    </td>
                    <td className="p-2 border-b border-l border-blue-500">
                      <input
                        type="number"
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={penalty}
                        onChange={(e) => setPenalty(e.target.value)}
                      />
                    </td>
                  </tr>
                  {/* New row for buttons inside the tbody */}
                  <tr>
                    <td colSpan="10" className="pb-1"> {/* colSpan 10 to span all columns */}
                      <div className="flex justify-center space-x-2 mt-4">
                        <button
                          onClick={handleAddPayment} // This now adds to unsavedPayments
                          className="px-5  bg-violet-500 font-semibold text-white  border border-blue-700 transition-all duration-100 ease-in-out hover:bg-violet-600 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        >
                          ADD
                        </button>
                        <button className="px-4  bg-violet-500 font-semibold text-white  border border-blue-700 transition-all duration-100 ease-in-out hover:bg-violet-600 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-violet-500">
                          MODIFY
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* {message && (
             <p className="text-center mt-4 text-green-600 font-semibold">
                {message}
               </p>
            )} */}
          </div>
        )}

        {/* NEW SECTION 2.5: Unsaved Payments Table - Visible if unsavedPayments exist */}
        {unsavedPayments.length > 0 && (
          <div className="w-2/3 mx-auto p-4 sm:p-6 border-t border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-black ">
                <thead>
                  <tr className="bg-blue-700 text-left text-sm text-white uppercase tracking-wider">
                    <th className="p-2 border-r border-b border-black"></th>
                    <th className="p-2 border-r border-b border-black"></th>
                    <th className="p-2 border-r border-b border-black">Act</th>
                    <th className="p-2 border-r border-b border-black">Mode</th>
                    <th className="p-2 border-r border-b border-black">Number</th>
                    <th className="p-2 border-r border-b border-black">Date</th>
                    <th className="p-2 border-r border-b border-black">MICR_CODE</th>
                    <th className="p-2 border-r border-b border-black">Tax</th>
                    <th className="p-2 border-r border-b border-black">Interest</th>
                    <th className="p-2 border-r border-b border-black">Penalty</th>
                    <th className="p-2 border-r border-b border-black">Bank Name</th>
                    <th className="p-2 border-r border-b border-black">PAID_TOWARDS</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {unsavedPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-orange-50">
                        <td className="p-2 border-r border-b border-black">
                        <button
                          onClick={() => handleDeleteUnsavedPayment(payment.id)}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Select
                        </button>
                      </td>
                      <td className="p-2 border-r border-b border-black">
                        <button
                          onClick={() => handleDeleteUnsavedPayment(payment.id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="p-2 border-r border-b border-black">{payment.headOfAccount}</td>
                      <td className="p-2 border-r border-b border-black">{payment.mode}</td>
                      <td className="p-2 border-r border-b border-black">{payment.courtFeeNo}</td>
                      <td className="p-2 border-r border-b border-black">{payment.date}</td>
                      <td className="p-2 border-r border-b border-black">{payment.micrCode}</td>
                      <td className="p-2 border-r border-b border-black">{payment.amount}</td>
                      <td className="p-2 border-r border-b border-black">{payment.interest}</td>
                      <td className="p-2 border-r border-b border-black">{payment.penalty}</td>
                      <td className="p-2 border-r border-b border-black">{payment.remarks}</td>
                      <td className="p-2 border-r border-b border-black">{payment.paidTowards}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center m-4 p-4">
              <button
                onClick={handleSaveTemporaryPayments}
                className="px-6  bg-purple-600 font-semibold text-white  border border-blue-700 transition-all duration-100 ease-in-out hover:bg-purple-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Save
              </button>
            </div>
            {message && (
             <p className="text-center mt-4 text-green-600 font-semibold">
                {message}
               </p>
            )}
          </div>
        )}


        {/* Section 3: Existing Payments Table - Conditional Rendering */}
        {showPreviousPaymentsTable && (
          <div className="w-2/3 mx-auto p-4 sm:p-6 border-t border-gray-200">
            <p className="text-gray-700 font-medium mb-2 flex justify-center">Previous Payments (if any)</p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-black ">
                <thead>
                  <tr className="bg-blue-700 text-left text-sm text-white uppercase tracking-wider">
                    <th className="p-2 border-r border-b  border-black"></th> {/* Added header for Select */}
                    <th className="p-2 border-r border-b  border-black"></th> {/* Added header for Delete */}
                    <th className="p-2 border-r border-b  border-black">Act</th>
                    <th className="p-2 border-r border-b  border-black">Mode</th>
                    <th className="p-2 border-r border-b  border-black">Number</th>
                    <th className="p-2 border-r border-b  border-black">Date</th>
                    <th className="p-2 border-r border-b  border-black">MICR_Code</th>
                    <th className="p-2 border-r border-b  border-black">Tax</th>
                    <th className="p-2 border-r border-b  border-black">Interest</th>
                    <th className="p-2 border-r border-b  border-black">Penalty</th>
                    <th className="p-2 border-r border-b  border-black">Bank_Name</th>
                    <th className="p-2 border-r border-b  border-black">Paid Towards</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="p-2 border-r border-b  border-black">
                        <button
                          // No direct action here, just for consistency with original design
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Select
                        </button>
                      </td>
                      <td className="p-2 border-r border-b  border-black">
                        <button
                          onClick={() => handleDeletePayment(payment.id)} // This deletes from backend
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="p-2 border-r border-b  border-black">{payment.act}</td>
                      <td className="p-2 border-r border-b  border-black">{payment.mode}</td>
                      <td className="p-2 border-r border-b  border-black">{payment.number}</td>
                      <td className="p-2 border-r border-b  border-black">{payment.date}</td>
                      <td className="p-2 border-r border-b  border-black">{payment.micrCode}</td>
                      <td className="p-2 border-r border-b  border-black">{payment.tax}</td>
                      <td className="p-2 border-r border-b  border-black">{payment.interest}</td>
                      <td className="p-2 border-r border-b  border-black">{payment.penalty}</td>
                      <td className="p-2 border-r border-b  border-black">{payment.bankName}</td>
                      <td className="p-2 border-r border-b  border-black">{payment.paidTowards}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* {message && (
             <p className="text-center mt-4 text-green-600 font-semibold">
                {message}
               </p>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManualPayment;
