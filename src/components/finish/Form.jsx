import React from "react"
import { useState } from "react"


const Form = () => {
    const [inspectorComment, setInspectorComment] = useState("")
    const [approvingComment, setApprovingComment] = useState("")

    const [formData, setFormData] = useState({
        dateOfVisit: '2025-02-01',
        natureOfBusiness: 'Firm Registration',
        dateOfCommencementPurchase: '2025-02-01',
        amountPurchases: '10000',
        dateOfCommencementSales: '2025-02-01',
        amountSales: '10000',
        capitalInvested: '10000',
        stockHeld: '10000',
        booksMaintained: 'Firm Registration',
        verificationOriginals: 'Firm Registration',
        verificationTitle: 'Firm Registration',
        otherInfo: 'Firm Registration',
        longitude: ['', '', ''],
        latitude: ['', '', ''],
        securityDeposit: '5000',
        inspectorComments: 'verified.'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('longitude') || name.startsWith('latitude')) {
            const [coordType, index] = name.split('-');
            setFormData((prev) => ({
                ...prev,
                [coordType]: prev[coordType].map((v, i) => (i === parseInt(index) ? value : v))
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <div className=" p-4 font-sans">
            <h1 className="text-center text-xl font-bold bg-sky-400 text-white mb-6">
                Inspector Observation Report
            </h1>

            {/* Main Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

                {/* 1. Date of Visit */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">

                    <div className="w-full md:w-auto md:basis-1/12 text-left md:text-center font-bold">1.</div>

                    <label className="w-full md:w-auto md:basis-5/12">Date of Visit</label>

                    <div className="w-full md:basis-6/12 flex items-center gap-2">
                        <input
                            type="date"
                            name="dateOfVisit"
                            value={formData.dateOfVisit}
                            onChange={handleChange}
                            className="border p-[1px] md:w-[50%]"
                        />
                        <button className="text-[17px] cursor-default">Submit Query</button>
                    </div>

                </div>

                {/* 2. Nature of Business */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">

                    <div className="w-full md:w-auto md:basis-1/12 text-left md:text-center font-bold">2.</div>

                    <label className="w-full md:w-auto md:basis-5/12">Nature of Business</label>

                    <div className="w-full md:basis-6/12 flex items-center gap-2">
                        <input
                            type="text"
                            name="natureOfBusiness"
                            value={formData.natureOfBusiness}
                            onChange={handleChange}
                            className="w-full md:w-[80%] border p-1"
                        />
                    </div>
                </div>

                {/* 3. Date of Commencement of Purchases */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">
                    <div className="w-full md:w-auto md:basis-1/12 text-right md:text-center font-bold">3.</div>
                    <label className="w-full md:w-auto md:basis-5/12 font-semibold">Date of Commencement of Purchases</label>
                    <div className="w-full md:w-auto md:basis-6/12 flex items-center gap-2">
                        <input
                            type="date"
                            name="dateOfCommencementPurchase"
                            value={formData.dateOfCommencementPurchase}
                            onChange={handleChange}
                            className="border p-1 flex-1"
                        />
                        <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">Submit Query</button>
                    </div>
                </div>

                {/* 4. Amount of Purchases made in (Rs.) */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">
                    <div className="w-full md:w-auto md:basis-1/12 text-right md:text-center font-bold">4.</div>
                    <label className="w-full md:w-auto md:basis-5/12 font-semibold">Amount of Purchases made in (Rs.)</label>
                    <input
                        type="number"
                        name="amountPurchases"
                        value={formData.amountPurchases}
                        onChange={handleChange}
                        className="w-full md:w-auto md:basis-6/12 border p-1"
                    />
                </div>

                {/* 5. Date of commencement of Sales */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">
                    <div className="w-full md:w-auto md:basis-1/12 text-right md:text-center font-bold">5.</div>
                    <label className="w-full md:w-auto md:basis-5/12 font-semibold">Date of commencement of Sales</label>
                    <div className="w-full md:w-auto md:basis-6/12 flex items-center gap-2">
                        <input
                            type="date"
                            name="dateOfCommencementSales"
                            value={formData.dateOfCommencementSales}
                            onChange={handleChange}
                            className="border p-1 flex-1"
                        />
                        <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">Submit Query</button>
                    </div>
                </div>

                {/* 6. Amount of Sales made in (Rs.) */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">
                    <div className="w-full md:w-auto md:basis-1/12 text-right md:text-center font-bold">6.</div>
                    <label className="w-full md:w-auto md:basis-5/12 font-semibold">Amount of Sales made in (Rs.)</label>
                    <input
                        type="number"
                        name="amountSales"
                        value={formData.amountSales}
                        onChange={handleChange}
                        className="w-full md:w-auto md:basis-6/12 border p-1"
                    />
                </div>

                {/* 7. Capital proposed to be invested in (Rs.) */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">
                    <div className="w-full md:w-auto md:basis-1/12 text-right md:text-center font-bold">7.</div>
                    <label className="w-full md:w-auto md:basis-5/12 font-semibold">Capital proposed to be invested in (Rs.)</label>
                    <input
                        type="number"
                        name="capitalInvested"
                        value={formData.capitalInvested}
                        onChange={handleChange}
                        className="w-full md:w-auto md:basis-6/12 border p-1"
                    />
                </div>

                {/* 8. Amount of Stock held at the time of visit (Rs.) */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">
                    <div className="w-full md:w-auto md:basis-1/12 text-right md:text-center font-bold">8.</div>
                    <label className="w-full md:w-auto md:basis-5/12 font-semibold">Amount of Stock held at the time of visit (Rs.)</label>
                    <input
                        type="number"
                        name="stockHeld"
                        value={formData.stockHeld}
                        onChange={handleChange}
                        className="w-full md:w-auto md:basis-6/12 border p-1"
                    />
                </div>

                {/* 9. Books of Account Maintained */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">
                    <div className="w-full md:w-auto md:basis-1/12 text-right md:text-center font-bold">9.</div>
                    <label className="w-full md:w-auto md:basis-5/12 font-semibold">Books of Account Maintained</label>
                    <input
                        type="text"
                        name="booksMaintained"
                        value={formData.booksMaintained}
                        onChange={handleChange}
                        className="w-full md:w-auto md:basis-6/12 border p-1"
                    />
                </div>

                {/* 10. Verification of Originals */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">
                    <div className="w-full md:w-auto md:basis-1/12 text-right md:text-center font-bold">10.</div>
                    <label className="w-full md:w-auto md:basis-5/12 font-semibold">Verification of Originals</label>
                    <input
                        type="text"
                        name="verificationOriginals"
                        value={formData.verificationOriginals}
                        onChange={handleChange}
                        className="w-full md:w-auto md:basis-6/12 border p-1"
                    />
                </div>

                {/* 11. Verification of title of place of business */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">
                    <div className="w-full md:w-auto md:basis-1/12 text-right md:text-center font-bold">11.</div>
                    <label className="w-full md:w-auto md:basis-5/12 font-semibold">Verification of title of place of business</label>
                    <input
                        type="text"
                        name="verificationTitle"
                        value={formData.verificationTitle}
                        onChange={handleChange}
                        className="w-full md:w-auto md:basis-6/12 border p-1"
                    />
                </div>

                {/* 12. Other Information */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">
                    <div className="w-full md:w-auto md:basis-1/12 text-right md:text-center font-bold">12.</div>
                    <label className="w-full md:w-auto md:basis-5/12 font-semibold">Other Information</label>
                    <input
                        type="text"
                        name="otherInfo"
                        value={formData.otherInfo}
                        onChange={handleChange}
                        className="w-full md:w-auto md:basis-6/12 border p-1"
                    />
                </div>

                {/* 13. GPS Co-ordinates */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">
                    <div className="w-full md:w-auto md:basis-1/12 text-right md:text-center font-bold">13.</div>
                    <div className="w-full md:w-auto md:basis-5/12 font-semibold">
                        <h2 className="font-semibold">GPS Co-ordinates</h2>
                        <div className="flex gap-2 items-center mt-1">
                            <span>Longitude</span>
                            {formData.longitude.map((val, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    name={`longitude-${idx}`}
                                    value={val}
                                    onChange={handleChange}
                                    className="border p-1 w-16"
                                />
                            ))}
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                            <span>Latitude</span>
                            {formData.latitude.map((val, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    name={`latitude-${idx}`}
                                    value={val}
                                    onChange={handleChange}
                                    className="border p-1 w-16"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-auto md:basis-6/12" />
                </div>
            </div>

            <label className="md:col-span-3 mt-4">
                14. Security Deposit Amount
                <input type="number" name="securityDeposit" value={formData.securityDeposit}
                    onChange={handleChange} className="w-full border p-1" />
            </label>

            <div className="mt-4">
                <label className="font-semibold block">Inspector Comments (Limited to 4000 Characters)</label>
                <textarea
                    rows="4"
                    name="inspectorComments"
                    value={formData.inspectorComments}
                    onChange={handleChange}
                    maxLength={4000}
                    className="w-full border p-2"
                />
            </div>

            <div className="mt-4">
                <label className="font-semibold block mb-1">Upload Inspector Report</label>
                <div className="flex items-center gap-2">
                    <input type="file" />
                    <button className="bg-purple-600 text-white px-3 py-1 rounded">Upload</button>
                </div>
                <p className="text-sm text-red-600 mt-1">File Size: 179 KB <a href="#" className="underline">view</a> | <a href="#" className="underline">Delete</a></p>
            </div>

            <div className="text-red-600 text-xs mt-4">
                <small>
                    <strong>Note:</strong> Special characters ( !, @, #, $, %, ^, &, *, (, ), +, =, {"{"}, {"}"}, [, ], \, |,
                    :, ;, ", ', {"<"}, {">"}, ?, /, ~, ` ) are not special words (TRUNCATE, DATABASE, DELETE, DROP, EXEC(UTE),
                    INSERT, SCRIPT, SELECT, UNION, UPDATE, USE) are not allowed.
                </small>
            </div>

            <div className="flex justify-center mt-6 gap-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded">Exit</button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded">Previous</button>
            </div>
        </div>
    )
}

export default Form