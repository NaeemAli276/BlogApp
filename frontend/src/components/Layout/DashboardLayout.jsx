import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const DashboardLayout = ({ children }) => {
    return (
        <div
            className='font-poppins w-full bg-background h-screen max-h-screen overflow-hidden grid grid-cols-16 grid-rows-16 '
        >
            <Sidebar/>
            <Navbar/>

            <div
                className='w-full h-full p-5 col-span-12 row-span-14 row-start-3 grid grid-cols-16 grid-rows-16'
            >
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout