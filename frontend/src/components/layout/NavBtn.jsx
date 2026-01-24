import React from 'react'
import { Link } from 'react-router-dom'

const NavBtn = ({ name, path }) => {
    return (
        <Link
            className='font-medium text-text-800 hover:text-text-700 duration-200 cursor-pointer'
            to={path}
        >
            {name}
        </Link>
    )
}

export default NavBtn