import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../../assets/Icon'
import UserBtn from '../btns/UserBtn'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {

    const location = useLocation()
    const { user } = useAuth()

    const navBtns = [
        {
            name: 'Home',
            icon:   <Icon
                        type='home'
                        pack={`filled`}
                        size='xs'
                    />,
            path: '/'
        },
        {
            name: 'Explore',
            icon:   <Icon
                        type='compass'
                        pack={`filled`}
                        size='xs'
                    />,
            path: '/Explore'
        },
        {
            name: 'Friends',
            icon:   <Icon
                        type='friends'
                        pack={`filled`}
                        size='xs'
                    />,
            path: '/Friends'
        },
        {
            name: 'Search',
            icon:   <Icon
                        type='search'
                        pack={`filled`}
                        size='xs'
                    />,
            path: '/Search'
        },
    ]

    // useEffect(() => (
    //     console.log(location)
    // ), [])

    return (
        <div
            className='h-fit w-full bg-background shadow shadow-text/20 p-3 flex flex-row items-center text-text fixed top-0 left-0 px-20 z-60'
        >
            
            {/* logo and title */}
            <Link
                className='w-1/3 h-full items-center gap-3 flex'
                to={'/'}
                viewTransition={true}
            >
                <svg className='bg-primary text-background p-1 rounded' xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20.04 2.323c1.016-.355 1.992.621 1.637 1.637l-5.925 16.93c-.385 1.098-1.915 1.16-2.387.097l-2.859-6.432l4.024-4.025a.75.75 0 0 0-1.06-1.06l-4.025 4.024l-6.432-2.859c-1.063-.473-1-2.002.097-2.387z"></path>
                </svg>
                <h2
                    className='text-xl text-text font-semibold'
                >
                    Swipe
                </h2>
            </Link>

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
                    ?   <div>
                        
                        </div>
                    :   <UserBtn/>   
                }                
            </div>

        </div>
    )
}

export default Navbar