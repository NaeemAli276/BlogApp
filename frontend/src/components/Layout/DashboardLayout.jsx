import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const DashboardLayout = ({ children }) => {
    return (
        <div
            className='font-poppins flex flex-row w-full bg-background h-screen max-h-screen'
        >
            <Sidebar/>
            <div
                className='flex flex-col w-full h-full'
            >
                <Navbar/>
                <div
                    className='grid grid-cols-16 grid-rows-16 w-full h-full p-5'
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout