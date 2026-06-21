import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../../assets/Icon'
import { useAuth } from '../../context/AuthContext'
import UserDropdownMenu from '../general/UserDropdownMenu'

const Navbar = () => {

    const location = useLocation()
    const { user } = useAuth()

    const navBtns = [
        {
            name: 'Home',
            icon:   <Icon
                        type='home'
                        pack={`filled`}
                        size='16'
                    />,
            path: '/'
        },
        {
            name: 'Explore',
            icon:   <Icon
                        type='compass'
                        pack={`filled`}
                        size='16'
                    />,
            path: '/Explore'
        },
        {
            name: 'Friends',
            icon:   <Icon
                        type='friends'
                        pack={`filled`}
                        size='16'
                    />,
            path: '/Friends'
        },
        {
            name: 'Search',
            icon:   <Icon
                        type='search'
                        pack={`filled`}
                        size='16'
                    />,
            path: '/Search'
        },
    ]

    // useEffect(() => (
    //     console.log(location)
    // ), [])

    return (
        <div
            className='h-fit w-full bg-background shadow shadow-text/20 p-3 flex flex-row items-center  fixed top-0 left-0 px-20 z-60'
        >
            
            {/* logo and title */}
            <div
                className='w-1/3 h-fit'
            >
                <Link
                    className='h-full items w-fit items-center gap-3 flex text-background rounded'
                    to={'/'}
                >
                    <Icon
                        type={'logo'}
                        className='p-1 rounded bg-primary'
                        size='36'
                    />
                    <h2
                        className='text-xl text-text font-semibold'
                    >
                        Swipe
                    </h2>
                </Link>
            </div>

            {/* navbtns */}
            <div
                className='w-1/3 flex items-center gap-5 justify-center'
            >
                {
                    navBtns.map((btn) => (
                        <Link
                            to={btn.path}
                            key={btn.name}
                            className={`${location.pathname.toLocaleLowerCase() === btn.path.toLocaleLowerCase() ? 'text-primary' : ' text-text/70'} flex flex-row-reverse items-center gap-2 hover:text-primary duration-200 relative`}
                        >
                            <span>
                                {btn.name}
                            </span>
                            {btn.icon}
                            <span className={`${location.pathname.toLocaleLowerCase() === btn.path.toLocaleLowerCase() ? 'flex' : 'hidden'} bg-primary absolute -bottom-4.5 left-0.5 h-0.5 w-full`}></span>  
                        </Link>
                    ))
                }
            </div>

            {/* user and searchbar */}
            <div
                className='w-1/3 h-full flex items-center justify-end'
            >
                {
                    user === null
                    ?   <div
                            className='flex items-center gap-2'
                        >
                            <Link
                                className='p-1.25 px-3.5 hover:bg-primary hover:text-background duration-200 rounded text-sm border-2 border-primary'
                                to={'/Login'}
                            >
                                Sign In
                            </Link>
                            <Link
                                className='py-1.5 px-3.5 bg-primary text-background hover:bg-secondary hover:text-text duration-200 rounded text-sm '
                                to={'/Register'}
                            >
                                Register
                            </Link>
                        </div>
                    :   <UserDropdownMenu/>   
                }                
            </div>

        </div>
    )
}

export default Navbar