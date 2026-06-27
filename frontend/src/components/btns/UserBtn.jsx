// navigates the user to the user page

import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import defaultUserImg from '../../assets/user.png'
import Icon from '../../assets/Icon'

const UserBtn = ({
    ftn
}) => {
    
    const { user } = useAuth()

    return (
        <button
            onClick={ftn}
        >

            {
                user?.profileImg === null
                ?   <Icon
                        type={'user'}
                        className='size-8 text-text border-2 border-primary rounded-full p-1'
                    />
                :   <img 
                        src={user?.profileImg} 
                        alt=""
                        className={`size-8 rounded-full border-2 border-primary`} 
                    /> 
            }   
        </button>
    )

}

export default UserBtn