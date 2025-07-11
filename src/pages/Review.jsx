import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Head from '../components/Head';

const API_BASE_URL_CHECKER = 'https://vat-portal-backend-nic.onrender.com';

const Review = ({userRole, userData}) => {
    const[data, setData] = useState([]);
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = `${API_BASE_URL_CHECKER}/api/registration`;

                if(userRole === "checker"){
                    const checkerId = userData.userId;
                    const status = encodeURIComponent("Pending for Inspection");
                    url += `?assignedCheckerId=${checkerId}&status=${status}`;
                }else if(userRole === "approver"){
                    const status = encodeURIComponent("Inspector Verified");
                    url += `?status=${status}`;
                }

                const response = await fetch(url,{
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${userData.token}`
                    }
                });
                
                if(!response.ok){
                    throw new Error("Failed to fetch data")
                }

                const result = await response.json();
                console.log("Data fetched at review.js:", result);
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data at review.js:", error);
                setLoading(false);
            }
        }

        if(userData?.userId){
            fetchData();
        }

    }, [userData, userRole])
    
    const onSelectClick=(item) =>{
        navigate(`/form/partA/${item.tinNumber}`)
    }

    return (
        <div className='min-h-screen'>
            <Head userRole={userRole}/>
                
            {loading && 
                <div className='text-center text-lg font-bold mb-4'>
                    LOADING...
                </div>
            }

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
                                <td className='px-4 py-2 bg-yellow-50 text-blue-600 underline cursor-pointer' onClick={()=>onSelectClick(item)} >Select</td>
                                <td className='px-4 py-2'>{item.tinNumber}</td>
                                <td className='px-4 py-2'>{item.ackNo}</td>
                                <td className='px-4 py-2'>
                                    {item.createdAt
                                        ? new Date(item.createdAt).toLocaleDateString("en-GB")
                                        : "N/A"
                                    }
                                </td>
                                <td className='px-4 py-2'>{item.applicantName}</td>
                                <td className='px-4 py-2'>{item.tradeName}</td>
                                <td className='px-4 py-2'>{item.status}</td>
                                <td className='px-4 py-2'></td>
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

