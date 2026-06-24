import React from 'react'
import Navbar from './Navbar'

const Layout = ({ 
    children,
    className='py-24 flex flex-col w-full h-full p-20 overflow-y-hidden'
}) => {
    return (
        <div
            className='flex flex-col font-poppins w-full bg-slate-200/50 min-h-screen items-start justify-start relative overflow-hidden'
        >
            <Navbar/>
            <div
                className={className}
            >
                {children}
            </div>
        </div>
    )
}

export default Layout