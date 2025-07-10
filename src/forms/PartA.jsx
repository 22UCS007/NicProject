import React from 'react'
import { useParams } from 'react-router-dom';

const PartA = ({userRole, userData}) => {
    const {tinNumber} = useParams();

    return (
        <div className='p-4 text-center text-xl font-semibold border'>
            <h1>PartA</h1>
            <h2>Processing TIN: {tinNumber}</h2>
        </div>
    )
}

export default PartA