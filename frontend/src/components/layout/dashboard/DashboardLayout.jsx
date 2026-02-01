import React from 'react'
import Sidebar from '../SideBar'
import DashboardTopBar from './DashboardTopbar'

const DashboardLayout = ({ children }) => {
    return (
        <div
            className='w-full h-screen max-h-screen grid grid-cols-16 grid-rows-16 bg-background dark:bg-dark-background/90 font-poppins overflow-hidden'
        >   
            <Sidebar/>
            <div
                className='w-full h-full grid grid-rows-16 grid-cols-16 p-8 col-span-12 row-span-16 '
            >
                <DashboardTopBar/>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout