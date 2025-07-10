import React, { useState } from 'react'

const API_BASE_URL_CHECKER = 'https://vat-portal-backend-nic.onrender.com';

const Review = ({userRole, userData}) => {
    const[data, setData] = useState([
        {
            tinNumber: "1200",
            ackNumber: "12633089",
            ackDate: "2025-06-13",
            applicantName: "ANJAN BHOWMIK",
            tradingName: "NATIONAL INFORMATICS CENTRE",
            status: "Pending for Inspection",
            enteredBy: "approverA",
            registrationType: "Registration"
        },
    ]);


    return (
        <div>
            <div className='mb-12'>
                {
                    userRole === "checker" ? (
                        <div className="text-center text-2xl font-semibold mt-20 bg-blue-400 text-white">
                            :.e-Registration-Inspector Note.:
                        </div>
                    ) : (
                        <div className="text-center text-2xl font-semibold mt-20 bg-blue-400 text-white">
                            :.e-Registration-Approval.:
                        </div>
                    )
                }
            </div>

            <div className='mb-12 pl-4 pr-4 overflow-x-auto'>
                <table className='table-auto w-full border border-gray-300 text-sm text-left'>
                    <thead className='bg-blue-900 text-white'>
                        <tr>
                            <th className='px-4 py-2'>Select</th>
                            <th className='px-4 py-2'>TIN No.</th>
                            <th className='px-4 py-2'>ACK No.</th>
                            <th className='px-4 py-2'>ACK Date</th>
                            <th className='px-4 py-2'>Name</th>
                            <th className='px-4 py-2'>Trading Name</th>
                            <th className='px-4 py-2'>Status</th>
                            <th className='px-4 py-2'>Entered By</th>
                            <th className='px-4 py-2'>Reg Type</th>
                            <th className='px-4 py-2'>Print</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className='px-4 py-2 bg-yellow-50 text-blue-600 underline cursor-pointer '>Select</td>
                                <td className='px-4 py-2'>{item.tinNumber}</td>
                                <td className='px-4 py-2'>{item.ackNumber}</td>
                                <td className='px-4 py-2'>{item.ackDate.split("-").reverse().join("/")}</td>
                                <td className='px-4 py-2'>{item.applicantName}</td>
                                <td className='px-4 py-2'>{item.tradingName}</td>
                                <td className='px-4 py-2'>{item.status}</td>
                                <td className='px-4 py-2'>{item.enteredBy}</td>
                                <td className='px-4 py-2'>{item.registrationType}</td>
                                <td className='px-4 py-2 bg-yellow-50 text-pink-600 underline cursor-pointer'>Print</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Review

