// used for user's cms
import React, { useEffect, useState } from 'react'
import SidebarBtn from '../btns/SidebarBtn'
import { useLocation, useNavigate } from 'react-router-dom'
import Icon from '../../assets/Icon'
import { useAuth } from '../../context/AuthContext'
import UserBtn from '../btns/UserBtn'
import UserDetails from '../MyProfile/UserDetails'

const Sidebar = () => {

    const { logout } = useAuth()

    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const [isUserSettingsActive, setIsUserSettingsActive] = useState(false)

    const sidebarBtns = [
        {
            name: 'Posts',
            icon:   <Icon
                        type={'cardView'}
                        className='text-text'
                        size='24'
                    />,
            path: '/My_posts'
        },
        {
            name: 'Comments',
            icon:   <Icon
                        type={'comments'}
                        size='24'
                        className='text-text'
                    />,
            path: '/Comments'
        },

    ]

    return (
        <>
            <UserDetails
                isUserSettingsActive={isUserSettingsActive}
                setIsUserSettingsActive={setIsUserSettingsActive}
            />
            <div
                className='bg-background h-full w-16 flex flex-col items-center shadow shadow-text/20 p-3 gap-2'
            >
                
                {/* logo and name */}
                <SidebarBtn
                    icon={
                        <Icon
                            type={'logo'}
                            size='24'
                        />
                    }
                    ftn={'/'}
                    className={'p-1 text-primary cursor-pointer'}
                />
                

                <span className='w-full h-px bg-text/20'></span>

                {/* sidebar buttons */}
                <div
                    className='flex flex-col gap-2 w-full h-full items-center'
                >
                    {
                        sidebarBtns.map((btn) => (
                            <SidebarBtn
                                key={btn.name}
                                icon={btn.icon}
                                // name={btn.name}
                                ftn={btn.path}
                                isSelected={location.pathname.toLowerCase().includes(btn.path.toLowerCase())}
                            />
                        ))
                    }
                </div>

                {/* user and logout btn */}
                <div
                    className='w-full h-fit flex flex-col gap-2 items-center'
                >
                    {/* user btn */}
                    <UserBtn
                        ftn={() => setIsUserSettingsActive(true)}
                    />

                    <span className='w-full h-px bg-text/20'></span>

                    {/* logout btn */}
                    <button
                        className='text-rose-500 p-1 rounded hover:bg-rose-100  duration-200 active:bg-rose-100'
                        onClick={() => handleLogout()}
                    >
                        <Icon
                            type='logout'
                            size='24'
                        />
                    </button>

                </div>

            </div>
        </>
        
    )
}

export default Sidebar