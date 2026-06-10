import React from 'react'
import Sidebar from './Sidebar'
import DashboardNavbar from './DashboardNavbar'

const DashboardLayout = ({ children }) => {
    return (
        <div
            className='font-poppins w-full bg-slate-200/50 h-screen max-h-screen overflow-hidden flex flex-row'
        >
            <Sidebar/>

            <div
                className='w-full h-full flex flex-col gap-0'
            >
                <DashboardNavbar/>
                <div
                    className='w-full h-full p-5 grid grid-cols-16 grid-rows-16 gap-4'
                >
                    {children}
                </div>
            </div>

        </div>
    )
}

export default DashboardLayout