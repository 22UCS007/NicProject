import React from 'react'
import Head from '../components/Head'
import LeftMenu from '../components/LeftMenu'
import { Outlet } from 'react-router-dom'

const MainForm = ({userRole}) => {
    return (
        <div>
            <Head userRole={userRole}/>
            <div className='flex w-full'>
                <LeftMenu/>
                <Outlet/>
            </div>
        </div>
    )
}

export default MainForm