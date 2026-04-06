import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const DashboardLayout = ({ children }) => {
    return (
        <div
            className='font-poppins flex flex-row w-full bg-background h-screen max-h-screen'
        >
            <Sidebar/>
            <Navbar/>
        </div>
    )
}

export default DashboardLayout