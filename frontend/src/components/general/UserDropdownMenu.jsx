// navigates the user to the user page

import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import UserBtn from '../btns/UserBtn'
import { truncateText } from '../../utils/textUtils'
import Icon from '../../assets/Icon'

const UserDropdownMenu = () => {
    
    const { user, logout } = useAuth()
    const [isDropdownActive, setIsDropdownActive] = useState(false)

    const menuBtns = [
        {
            name: 'My posts',
            icon:   <Icon
                        size={'sm'}
                        type={'cardView'}
                    />,
            path: '/My_posts'
        },
        {
            name: 'Comments',
            icon:   <Icon
                        size={'sm'}
                        type={'comments'}
                    />,
            path: '/Comments'
        },
        {
            name: 'My profile',
            icon:   <Icon
                        size={'sm'}
                        type={'user'}
                    />,
            path: '/My_profile'
        },
    ]

    const navigate = useNavigate()

    const handleClickLogout = () => {
        logout()
        navigate('/Login')
    }

    return (
        <div
            className='relative w-fit h-fit flex items-center'
        >
            <UserBtn
                ftn={() => setIsDropdownActive(!isDropdownActive)}
            />

            {/* menu */}
            <div
                className={`${isDropdownActive ? 'flex' : 'hidden'} rounded absolute top-10 right-0 bg-background min-h-70 w-72 shadow shadow-text/70 z-50 flex-col gap-1`}
            >
                
                <div
                    className='p-2'
                >
                    {/* user details */}
                    <div
                        className='flex flex-row items-start justify-between p-4 rounded border border-text/30'
                    >

                        {/* name and email */}
                        <div
                            className='flex flex-col gap-0 w-fit h-fit'
                        >   
                            <h3
                                className='text-base/tight font-medium'
                            >
                                {truncateText(user?.username, 12)}
                            </h3>
                            <h4
                                className='text-sm'
                            >
                                {truncateText(user?.email, 24)}
                            </h4>
                        </div>

                        <img    
                            src={user?.profileImg} 
                            alt="" 
                            className='size-10 rounded-full border border-text'
                        />

                    </div>
                    
                </div>

                <span className='w-full min-h-px bg-text/30'></span>

                <div
                    className='p-1 w-full h-fit flex flex-col gap-1 px-2.5'
                >
                    {
                        menuBtns.map((btn) => (
                            <Link
                                to={btn.path}
                                className='p-2 px-3 rounded text-text/80 hover:bg-text/10 cursor-pointer active:bg-primary active:text-background duration-200 w-full h-fit flex gap-2.5 font-medium items-center text-sm'
                            >   
                                {btn.icon}
                                {btn.name}
                            </Link>
                        ))
                    }
                </div>

                <span className='w-full min-h-px bg-text/30'></span>

                <div
                    className='p-1 w-full h-fit flex flex-col gap-1 px-2.5'
                >
                    <button
                        className='items-center flex gap-2 p-2 px-3 duration-200 hover:bg-rose-200 w-full h-fit rounded text-rose-600 active:bg-rose-500 active:text-background text-sm'
                        onClick={() => handleClickLogout()}
                    >
                        <Icon
                            type={'logout'}
                            size={'sm'}
                        />
                        Logout
                    </button>
                </div>

            </div>

        </div>
    )

}

export default UserDropdownMenu