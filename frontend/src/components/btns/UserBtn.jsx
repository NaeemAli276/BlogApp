// navigates the user to the user page

import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import defaultUserImg from '../../assets/hero.png'

const UserBtn = () => {
    
    const { user } = useAuth()

    return (
        <Link
            to={'/user'}
            className='border-2 border-primary p-1 rounded-full'
        >
            <img className='size-6' src={user.profileImg} alt="" />
        </Link>
    )


}

export default UserBtn