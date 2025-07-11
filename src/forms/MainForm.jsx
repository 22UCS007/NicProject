import React from 'react'
import Head from '../components/Head'
import LeftMenu from '../components/LeftMenu'
import { Outlet } from 'react-router-dom'

const MainForm = ({userRole}) => {
    return (
        <div>
            <Head userRole={userRole}/>
            <div className='flex  w-full  -mt-12'>
                <LeftMenu/>
                <div className='min-w-full '><Outlet/></div>
            </div>
        </div>
    )
}

export default MainForm