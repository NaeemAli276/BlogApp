import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => {
    return (
        <div
            className='grid grid-cols-12 grid-rows-12 h-screen max-h-screen w-full bg-background-100 font-poppins'
        >
            <Navbar/>
            {children}
        </div>
    )
}

export default Layout