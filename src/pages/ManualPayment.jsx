import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const API_BASE_URL_PAYMENT = 'https://vat-portal-backend-nic.onrender.com/payments'; 

function ManualPayment() {
  const [tin, setTin] = useState('');
  const [suspenseName, setSuspenseName] = useState('');
  const [regType, setRegType] = useState('');
  const [paymentWith, setPaymentWith] = useState('');
  const [regAcknowledgmentNo, setRegAcknowledgmentNo] = useState('');
  const [amountToBePaid, setAmountToBePaid] = useState('0');

  const [headOfAccount, setHeadOfAccount] = useState('3-Registration Fee');
  const [paidTowards, setPaidTowards] = useState('VAT Rf');
  const [mode, setMode] = useState('Court Fee');
  const [courtFeeNo, setCourtFeeNo] = useState('');
  const [date, setDate] = useState('');
  const [micrCode, setMicrCode] = useState('');
  const [remarks, setRemarks] = useState('STAMP PAPER');
  const [amount, setAmount] = useState('0');
  const [interest, setInterest] = useState('0');
  const [penalty, setPenalty] = useState('0');

  const [payments, setPayments] = useState([]);
  const [unsavedPayments, setUnsavedPayments] = useState([]);

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPaymentDetails, setLoadingPaymentDetails] = useState(false);
  const [errorPaymentDetails, setErrorPaymentDetails] = useState(null);

  const [showFullFirstSection, setShowFullFirstSection] = useState(false);
  const [showPaymentDetailsTable, setShowPaymentDetailsTable] = useState(false);
  const [showPreviousPaymentsTable, setShowPreviousPaymentsTable] = useState(false);

  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    setDate(`${dd}/${mm}/${yyyy}`);
  }, []);

  const fetchPaymentDetailsByTin = async (currentTin) => {
    setLoadingPaymentDetails(true);
    setErrorPaymentDetails(null);
    const authToken = Cookies.get('authToken');

    if (!authToken) {
      setErrorPaymentDetails(new Error('Authentication token not found. Please log in.'));
      setLoadingPaymentDetails(false);
      return;
    }
    if (!currentTin) {
      setErrorPaymentDetails(new Error('TIN is required to fetch payment details.'));
      setLoadingPaymentDetails(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL_PAYMENT}?tinNo=${currentTin}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Raw error response from server (payment details):", errorText);
        if (response.status === 401 || response.status === 403) {
          Cookies.remove('authToken');
          console.error("Authentication failed for payment details. Please log in again.");
        }
        throw new Error(`HTTP error! Status: ${response.status}, Server Response: ${errorText.substring(0, 500)}...`);
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const firstPayment = data[0];
        setSuspenseName(firstPayment.suspenseName || '');
        setRegType(firstPayment.regType || '');
        setPaymentWith(firstPayment.paymentWith || '');
        setRegAcknowledgmentNo(firstPayment.ackNo || '');
        setAmountToBePaid(firstPayment.amountToBePaid ? String(firstPayment.amountToBePaid) : '0');
        console.log('Fetched payment details:', firstPayment);
      } else {
        setSuspenseName('');
        setRegType('');
        setPaymentWith('');
        setRegAcknowledgmentNo('');
        setAmountToBePaid('0');
      }
    } catch (error) {
      console.error("Error fetching payment details from API:", error);
      setErrorPaymentDetails(error);
    } finally {
      setLoadingPaymentDetails(false);
    }
  };

  const fetchPreviousPayments = async (currentTin) => {
    setIsLoading(true);
    const authToken = Cookies.get('authToken');

    if (!authToken) {
      setIsLoading(false);
      return;
    }
    if (!currentTin) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL_PAYMENT}?tinNo=${currentTin}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Raw error response from server (previous payments):", errorText);
        if (response.status === 401 || response.status === 403) {
          Cookies.remove('authToken');
          console.error("Authentication failed for previous payments. Please log in again.");
        }
        throw new Error(`HTTP error! Status: ${response.status}, Server Response: ${errorText.substring(0, 500)}...`);
      }
      const data = await response.json();
      setPayments(data);
      console.log('Fetched previous payments:', data);
    } catch (error) {
      console.error("Error fetching payments from API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGo = async () => {
    
    setShowFullFirstSection(true);
    setShowPaymentDetailsTable(true);
    setShowPreviousPaymentsTable(true);
    await fetchPaymentDetailsByTin(tin);
    await fetchPreviousPayments(tin);
  };

  const handleAddPayment = () => {
    if (!headOfAccount || !paidTowards || !mode || amount === null || amount === '') {
      setMessage('Please fill in all required fields for the new payment.');
      return;
    }

    const newPaymentData = {
      id: Date.now(),
      tin,
      suspenseName,
      regType,
      paymentWith,
      regAcknowledgmentNo,
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
    setMessage('Payment added to temporary list. Click "Save" to send to backend.');
    console.log('Added new temporary payment:', newPaymentData);

    setCourtFeeNo('');
    setMicrCode('');
    setRemarks('STAMP PAPER');
    setAmount('0');
    setInterest('0');
    setPenalty('0');
  };

  const formatDdMmYyyyToIso = (ddmmyyyy) => {
    if (!ddmmyyyy) return null;
    const parts = ddmmyyyy.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const jsDate = new Date(year, month, day);
      return jsDate.getFullYear() + '-' +
             String(jsDate.getMonth() + 1).padStart(2, '0') + '-' +
             String(jsDate.getDate()).padStart(2, '0') + 'T00:00:00';
    }
    return null;
  };

  const handleSaveTemporaryPayments = async () => {
    if (unsavedPayments.length === 0) {
      setMessage('No temporary payments to save.');
      return;
    }

    setIsLoading(true);
    const authToken = Cookies.get('authToken');

    if (!authToken) {
      setMessage('Authentication token not found. Please log in.');
      setIsLoading(false);
      return;
    }

    let allSavedSuccessfully = true;
    for (const payment of unsavedPayments) {
      try {
        const { id, tin, regAcknowledgmentNo, date, ...rest } = payment; 
        
        const dataToSendSingle = {
          tinNo: tin,
          ackNo: regAcknowledgmentNo,
          paymentDate: formatDdMmYyyyToIso(date),
          ...rest
        };

        console.log('Data being sent to backend for saving (single payment):', JSON.stringify(dataToSendSingle, null, 2));

        const response = await fetch(API_BASE_URL_PAYMENT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(dataToSendSingle),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Raw error response from server (save single payment):", errorText);
          if (response.status === 401 || response.status === 403) {
            Cookies.remove('authToken');
            console.error("Authentication failed during save. Please log in again.");
          }
          // Check for specific foreign key or not-null constraint errors
          if (errorText.includes("violates foreign key constraint") || errorText.includes("violates not-null constraint")) {
            throw new Error("Enter valid TinNo and ACKNo.");
          } else {
            throw new Error(`HTTP error! Status: ${response.status}, Server Response: ${errorText.substring(0, 500)}...`);
          }
        }

        const result = await response.json();
        console.log('Backend response after saving single payment:', result);

      } catch (error) {
        console.error("Error saving single payment to API:", error);
        setMessage(error.message);
        allSavedSuccessfully = false;
        break;
      }
    }

    if (allSavedSuccessfully) {
      setMessage('Payment saved successfully');
      setUnsavedPayments([]);
      await fetchPreviousPayments(tin);
    } else {
    }
    setIsLoading(false);
  };

  const handleDeletePayment = async (paymentId) => {
    setIsLoading(true);
    setMessage('Deleting payment...');
    const authToken = Cookies.get('authToken');

    if (!authToken) {
      setMessage('Authentication token not found. Please log in.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL_PAYMENT}/${paymentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Raw error response from server (delete payment):", errorText);
        if (response.status === 401 || response.status === 403) {
          Cookies.remove('authToken');
          console.error("Authentication failed during delete. Please log in again.");
        }
        throw new Error(`HTTP error! Status: ${response.status}, Server Response: ${errorText.substring(0, 500)}...`);
      }

      setMessage(`Payment with ID ${paymentId} deleted successfully!`);
      console.log(`Deleted payment with ID: ${paymentId} from backend.`);
      await fetchPreviousPayments(tin);
    } catch (error) {
      console.error("Error deleting payment from API:", error);
      setMessage(`Failed to delete payment: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUnsavedPayment = (id) => {
    setUnsavedPayments(prev => prev.filter(payment => payment.id !== id));
    setMessage('Temporary payment removed from list.');
    console.log(`Removed temporary payment with client-side ID: ${id}.`);
  };

  if (isLoading || loadingPaymentDetails) {
    return <div className="text-center p-6">Loading data...</div>;
  }

  if (errorPaymentDetails) {
    return <div className="text-center p-6 text-red-600">Error loading payment details: {errorPaymentDetails.message}</div>;
  }

  return (
    
      <div className="w-full min-h-screen bg-slate-200 shadow-lg overflow-hidden">
        <div className="bg-blue-400 text-white p-1 ">
          <h1 className="text-xl sm:text-xl font-bold text-center">Return/Payment Ack</h1>
        </div>

        <div className="w-1/2 mx-auto p-4 sm:p-6 space-y-0.5">
          <div className="border border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
            <div className=" pl-7 text-gray-700 font-medium">TIN:</div>
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

          {showFullFirstSection && (
            <>
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
                      name="paymentWith"
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

              <div className="border border-blue-600 grid grid-cols-[1.44fr_1.6fr_1.4fr] gap-x-4 items-stretch w-full">
                <div className="pl-7 text-gray-700 font-medium flex items-stretch">Registration Details</div>
                <div className="border-l border-blue-600 pl-3 text-gray-700 font-medium flex items-stretch">Reg. Acknowledgement No.</div>
                <div className="border-l border-blue-600 flex items-stretch pl-3">
                  <div className="w-full flex items-stretch">
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

              <div className="border border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                <div className=" pl-7 text-gray-700 font-medium">Amount To Be Paid</div>
                <div className="flex border-l border-blue-600  items-center gap-2 pl-3">
                  <input
                    type="number"
                    id="amountToBePaid"
                    className="col-span-2 md:col-span-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    
                    onChange={(e) => setAmountToBePaid(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </div>

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
                      </select>
                    </td>
                    <td className="p-2 border-b border-l border-blue-500">
                      <select
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={paidTowards}
                        onChange={(e) => setPaidTowards(e.target.value)}
                      >
                        <option value="VAT Rf">VAT Rf</option>
                      </select>
                    </td>
                    <td className="p-2 border-b border-l border-blue-500">
                      <select
                        className="w-full p-1 border border-gray-300 rounded-md"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                      >
                        <option value="Court Fee">Court Fee</option>
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
                        type="text"
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
                  <tr>
                    <td colSpan="10" className="pb-1">
                      <div className="flex justify-center space-x-2 mt-4">
                        <button
                          onClick={handleAddPayment}
                          className="px-5 bg-violet-500 text-white font-semibold border border-blue-700 transition-all duration-100 ease-in-out hover:bg-violet-600 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        >
                          ADD
                        </button>
                        <button className="px-4 bg-violet-500 font-semibold text-white border border-blue-700 transition-all duration-100 ease-in-out hover:bg-violet-600 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-violet-500">
                          MODIFY
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

          {unsavedPayments.length > 0 && (
            <div className="w-2/3 mx-auto p-4 sm:p-6 border-t border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-black ">
                  <thead>
                    <tr className="bg-blue-700 text-left text-sm text-white uppercase tracking-wider">
                      <th className="p-2 border-r border-b border-black">Select</th>
                      <th className="p-2 border-r border-b border-black">Delete</th>
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
                  className="px-6 bg-purple-600 font-semibold text-white border border-blue-700 transition-all duration-100 ease-in-out hover:bg-purple-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
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

          {showPreviousPaymentsTable && (
            <div className="w-2/3 mx-auto p-4 sm:p-6 border-t border-gray-200">
              <p className="text-gray-700 font-medium mb-2 flex justify-center">Previous Payments (if any)</p>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-black ">
                  <thead>
                    <tr className="bg-blue-700 text-left text-sm text-white uppercase tracking-wider">
                      <th className="p-2 border-r border-b border-black">Select</th>
                      <th className="p-2 border-r border-b border-black">Delete</th>
                      <th className="p-2 border-r border-b border-black">Act</th>
                      <th className="p-2 border-r border-b border-black">Mode</th>
                      <th className="p-2 border-r border-b border-black">Number</th>
                      <th className="p-2 border-r border-b border-black">Date</th>
                      <th className="p-2 border-r border-b border-black">MICR_Code</th>
                      <th className="p-2 border-r border-b border-black">Tax</th>
                      <th className="p-2 border-r border-b border-black">Interest</th>
                      <th className="p-2 border-r border-b border-black">Penalty</th>
                      <th className="p-2 border-r border-b border-black">Bank Name</th>
                      <th className="p-2 border-r border-b border-black">Paid Towards</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.paymentId} className="hover:bg-gray-50">
                        <td className="p-2 border-r border-b border-black">
                          <button
                            className="text-blue-600 hover:text-blue-800 font-semibold"
                          >
                            Select
                          </button>
                        </td>
                        <td className="p-2 border-r border-b border-black">
                          <button
                            onClick={() => handleDeletePayment(payment.paymentId)}
                            className="text-red-600 hover:text-red-800 font-semibold"
                          >
                            Delete
                          </button>
                        </td>
                        <td className="py-2 px-4 border-b border-r border-black">{payment.headOfAccount}</td>
                        <td className="py-2 px-4 border-b border-r border-black">{payment.mode}</td>
                        <td className="py-2 px-4 border-b border-r border-black">{payment.courtFeeNo}</td>
                        <td className="py-2 px-4 border-b border-r border-black">{payment.date}</td>
                        <td className="py-2 px-4 border-b border-r border-black">{payment.micrCode}</td>
                        <td className="py-2 px-4 border-b border-r border-black">{payment.amount}</td>
                        <td className="py-2 px-4 border-b border-r border-black">{payment.interest}</td>
                        <td className="py-2 px-4 border-b border-r border-black">{payment.penalty}</td>
                        <td className="py-2 px-4 border-b border-r border-black">{payment.remarks}</td>
                        <td className="py-2 px-4 border-b border-r border-black">{payment.paidTowards}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {message && !unsavedPayments.length && (
                <p className="text-center mt-4 text-green-600 font-semibold">
                  {message}
                </p>
              )}
            </div>
          )}
      </div>
  
  );
}

export default ManualPayment;
