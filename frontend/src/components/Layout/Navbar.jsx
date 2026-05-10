import React from 'react'
import { useLocation } from 'react-router-dom'
import UserBtn from '../btns/UserBtn'

const Navbar = () => {

    const location = useLocation()

    return (
        <div
            className='w-full bg-slate-200/10 p-3 px-5 h-fit flex flex-row items-center justify-between col-span-12 row-span-1'
        >

            {/* current location */}
            <h3
                className='font-medium text-primary text-lg'
            >
                {location.pathname.substring(1)}
            </h3>

            {/* user dropdown */}

        </div>
    )
}

export default Navbar