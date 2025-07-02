import { Upload } from "lucide-react"
import React from "react"
import { useState } from "react"


const FormChecker = () => {
    const [inspectorComment, setInspectorComment] = useState("")

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
                            className="border p-1 md:w-[50%]"
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

                    <div className="w-full md:w-auto md:basis-1/12 text-left md:text-center font-bold">3.</div>

                    <label className="w-full md:w-auto md:basis-5/12">Date of Commencement of Purchases</label>

                    <div className="w-full md:basis-6/12 flex items-center gap-2">
                        <input
                            type="date"
                            name="dateOfCommencementPurchase"
                            value={formData.dateOfCommencementPurchase}
                            onChange={handleChange}
                            className="md:w-[50%] border p-1"
                        />
                        <button className="text-[17px] cursor-default">Submit Query</button>
                    </div>
                    
                </div>

                {/* 4. Amount of Purchases made in (Rs.) */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">

                    <div className="w-full md:w-auto md:basis-1/12 text-left md:text-center font-bold">4.</div>

                    <label className="w-full md:w-auto md:basis-5/12">Amount of Purchases made in (Rs.)</label>

                    <div className="w-full md:basis-6/12 flex items-center gap-2">
                        <input
                            type="number"
                            name="amountPurchases"
                            value={formData.amountPurchases}
                            onChange={handleChange}
                            className="w-full md:w-[80%] border p-1"
                        />
                    </div>
                </div>
                
                {/* 5. Date of commencement of Sales */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">

                    <div className="w-full md:w-auto md:basis-1/12 text-left md:text-center font-bold">5.</div>

                    <label className="w-full md:w-auto md:basis-5/12">Date of commencement of Sales</label>

                    <div className="w-full md:basis-6/12 flex items-center gap-2">
                        <input
                            type="date"
                            name="dateOfCommencementSales"
                            value={formData.dateOfCommencementSales}
                            onChange={handleChange}
                            className="border p-1 md:w-[50%]"
                        />
                        <button className="text-[17px] cursor-default">Submit Query</button>
                    </div>
                </div>

                {/* 6. Amount of Sales made in (Rs.) */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">

                    <div className="w-full md:w-auto md:basis-1/12 text-left md:text-center font-bold">6.</div>

                    <label className="w-full md:w-auto md:basis-5/12">Amount of Sales made in (Rs.)</label>

                    <div className="w-full md:basis-6/12 flex items-center gap-2">
                        <input
                            type="number"
                            name="amountSales"
                            value={formData.amountSales}
                            onChange={handleChange}
                            className="w-full md:w-[80%] border p-1"
                        />
                    </div>
                </div>

                {/* 7. Capital proposed to be invested in (Rs.) */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">

                    <div className="w-full md:w-auto md:basis-1/12 text-left md:text-center font-bold">7.</div>

                    <label className="w-full md:w-auto md:basis-5/12">Capital proposed to be invested in (Rs.)</label>

                    <div className="w-full md:basis-6/12 flex items-center gap-2">
                        <input
                            type="number"
                            name="capitalInvested"
                            value={formData.capitalInvested}
                            onChange={handleChange}
                            className="w-full md:w-[80%] border p-1"
                        />
                    </div>
                </div>

                {/* 8. Amount of Stock held at the time of visit (Rs.) */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">

                    <div className="w-full md:w-auto md:basis-1/12 text-left md:text-center font-bold">8.</div>

                    <label className="w-full md:w-auto md:basis-5/12">Amount of Stock held at the time of visit (Rs.)</label>

                    <div className="w-full md:basis-6/12 flex items-center gap-2">
                        <input
                            type="number"
                            name="stockHeld"
                            value={formData.stockHeld}
                            onChange={handleChange}
                            className="w-full md:w-[80%] border p-1"
                        />
                    </div>
                </div>

                {/* 9. Books of Account Maintained */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">

                    <div className="w-full md:w-auto md:basis-1/12 text-left md:text-center font-bold">9.</div>

                    <label className="w-full md:w-auto md:basis-5/12">Books of Account Maintained</label>

                    <div className="w-full md:basis-6/12 flex items-center gap-2">
                        <input
                            type="text"
                            name="booksMaintained"
                            value={formData.booksMaintained}
                            onChange={handleChange}
                            className="w-full md:w-[80%] border p-1"
                        />
                    </div>
                </div>

                {/* 10. Verification of Originals */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">

                    <div className="w-full md:w-auto md:basis-1/12 text-left md:text-center font-bold">10.</div>

                    <label className="w-full md:w-auto md:basis-5/12">Verification of Originals</label>

                    <div className="w-full md:basis-6/12 flex items-center gap-2">
                        <input
                            type="text"
                            name="verificationOriginals"
                            value={formData.verificationOriginals}
                            onChange={handleChange}
                            className="w-full md:w-[80%] border p-1"
                        />
                    </div>
                </div>

                {/* 11. Verification of title of place of business */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">

                    <div className="w-full md:w-auto md:basis-1/12 text-left md:text-center font-bold">11.</div>

                    <label className="w-full md:w-auto md:basis-5/12">Verification of title of place of business</label>

                    <div className="w-full md:basis-6/12 flex items-center gap-2">
                        <input
                            type="text"
                            name="verificationTitle"
                            value={formData.verificationTitle}
                            onChange={handleChange}
                            className="w-full md:w-[80%] border p-1"
                        />
                    </div>
                </div>

                {/* 12. Other Information */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">

                    <div className="w-full md:w-auto md:basis-1/12 text-left md:text-center font-bold">12.</div>

                    <label className="w-full md:w-auto md:basis-5/12">Other Information</label>

                    <div className="w-full md:basis-6/12 flex items-center gap-2">
                        <input
                            type="text"
                            name="otherInfo"
                            value={formData.otherInfo}
                            onChange={handleChange}
                            className="w-full md:w-[80%] border p-1"
                        />
                    </div>
                </div>


                {/* 13. GPS Co-ordinates */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2">

                    <div className="w-full md:w-auto md:basis-1/12 text-left md:text-center font-bold">13.</div>

                    <label className="w-full md:w-auto md:basis-5/12">GPS Co-ordinates</label>

                    <div className="w-full md:basis-6/12" />
                </div>

                {/* Longitude */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2 -mt-4">

                    <div className="w-full md:w-auto md:basis-1/12" />

                    <label className="w-full md:w-auto md:basis-5/12">Longitude</label>

                    <div className="w-full md:basis-6/12 flex items-center gap-2">
                        {formData.longitude.map((val, idx) => (
                            <input
                                key={idx}
                                type="text"
                                name={`longitude-${idx}`}
                                value={val}
                                onChange={handleChange}
                                className="border w-16"
                            />
                        ))}
                    </div>
                </div>
                
                {/* Latitude */}
                <div className="flex flex-col md:flex-row md:col-span-3 items-center gap-2 -mt-3">

                    <div className="w-full md:w-auto md:basis-1/12" />

                    <label className="w-full md:w-auto md:basis-5/12">Latitude</label>

                    <div className="w-full md:basis-6/12 flex items-center gap-2">
                        {formData.latitude.map((val, idx) => (
                            <input
                                key={idx}
                                type="text"
                                name={`latitude-${idx}`}
                                value={val}
                                onChange={handleChange}
                                className="border w-16"
                            />
                        ))}
                    </div>
                </div>

            </div>
            {/* End of Main Form Grid */}


            {/* form next section starts here */}
            <div className="w-full border-2 border-gray-400">

                {/* 14. Security Deposit Amount */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 border border-gray-300">
                  <label className="font-semibold mb-0">
                    14. Security Deposit Amount
                  </label>
                  <input
                    type="number"
                    name="securityDeposit"
                    value={formData.securityDeposit}
                    onChange={handleChange}
                    className="border p-1 md:w-50"
                  />
                </div>
                
                {/* Textarea section */}
                <div className="mt-8 border border-gray-300 pt-1">
                    <label className="font-semibold block pb-1">Inspector Comments (Limited to 4000 Characters)</label>
                    <textarea
                        rows="4"
                        name="inspectorComments"
                        value={formData.inspectorComments}
                        onChange={handleChange}
                        maxLength={4000}
                        className="w-full h-[250px] border"
                    />
                </div>
                        
                {/* upload file section */}
                <div className="mt-4">
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <label className="font-semibold mb-0">Upload Inspector Report</label>
                        <input type="file"/>
                        <button className="bg-purple-600 text-white px-2 whitespace-nowrap w-auto">Upload</button>
                    </div>

                    <div className="text-sm font-bold text-red-600 mt-0">
                        File Size: 179 KB
                    </div>
                    
                    <div className="mt-0">
                        <button className="bg-purple-600 text-white px-2 mr-2">view</button>
                        <button className="bg-purple-600 text-white px-2">Delete</button>
                    </div>
                </div>

                {/* Note section */}
                <div className="text-red-600 text-base mt-4">
                    <span className="font-semibold block">Note: Special characters ( !, @, #, $, %, ^, &, *, (, ), +, =, {"{"}, {"}"}, [, ], \, |,
                        :, ;, ", ', {"<"}, {">"}, ?, /, ~, ` ) are not special words</span>
                    <span className="block font-semibold">
                        (TRUNCATE, DATABASE, DELETE, DROP, EXEC(UTE),
                        INSERT, SCRIPT, SELECT, UNION, UPDATE, USE) are not allowed.
                    </span>
                </div>

            </div>

            <div className="flex justify-center mt-6 gap-4">
                <button className="bg-purple-600 text-white px-2 mr-2">Save</button>
                <button className="bg-purple-600 text-white px-2 mr-2">Exit</button>
            </div>

            <div className="flex justify-center mt-4 gap-4">
                <button className="bg-sky-400 font-semibold text-black px-2 mr-2">Previous</button>
            </div>

        </div>
    )
}

export default FormChecker


