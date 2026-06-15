// navigates the user to the user page

import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import defaultUserImg from '../../assets/user.png'

const UserBtn = ({
    ftn
}) => {
    
    const { user } = useAuth()

    return (
        <button
            onClick={ftn}
        >
            <img 
                src={user === null ? defaultUserImg : user?.profileImg} 
                alt=""
                className={`size-8 rounded-full border border-primary`} 
            />
        </button>
    )

}

export default UserBtn