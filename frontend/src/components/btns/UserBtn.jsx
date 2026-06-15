// navigates the user to the user page

import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import defaultUserImg from '../../assets/user.png'

const UserBtn = () => {
    
    const { user } = useAuth()

    return (
        <div
            className='relative w-fit h-fit flex items-center'
        >
            <button>
                <img 
                    src={user === null ? defaultUserImg : user?.profileImg} 
                    alt=""
                    className={`size-8 rounded-full border border-primary`} 
                />
            </button>
        </div>
    )

}

export default UserBtn