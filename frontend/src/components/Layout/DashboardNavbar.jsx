import React from 'react'
import { useLocation } from 'react-router-dom'
import UserBtn from '../btns/UserBtn'
import { removeDashes } from '../../utils/textUtils'

const DahsboardNavbar = () => {

    const location = useLocation()

    return (
        <div
            className='w-full bg-slate-200/10 p-3 px-5 h-fit flex flex-row items-center justify-between'
        >

            {/* current location */}
            <h3
                className='font-medium text-primary text-lg'
            >
                {removeDashes(location.pathname.substring(1))}
            </h3>


        </div>
    )
}

export default DahsboardNavbar