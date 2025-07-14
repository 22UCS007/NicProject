import React from 'react'
import Head from '../components/Head'
import LeftMenu from '../components/LeftMenu'
import { Outlet } from 'react-router-dom'

const MainForm = ({userRole}) => {
    return (
        <div>
            <Head userRole={userRole}/>
            <div className='flex  w-full -mt-12 '>
                <div className='w-1/6 bg-blue-500'><LeftMenu/></div>
                <div className='w-5/6 '><Outlet/></div>
            </div>
        </div>
    )
}

export default MainForm
