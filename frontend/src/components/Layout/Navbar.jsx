import React from 'react'
import { useLocation } from 'react-router-dom'
import UserBtn from '../btns/UserBtn'

const Navbar = () => {

    const location = useLocation()

    return (
        <div
            className='w-full bg-background p-3 px-5 h-fit flex flex-row items-center justify-between'
        >

            {/* current location */}
            <h3
                className='font-medium text-primary text-lg'
            >
                {location.pathname.substring(1)}
            </h3>

            {/* user dropdown */}
            <UserBtn/>

        </div>
    )
}

export default Navbar