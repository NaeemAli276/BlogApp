import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../icon'

const Navbar = () => {

    const navBtns = [
        {
            name: 'Home',
            icon:   <Icon
                        type='home'
                    />
        },
        {
            name: 'Explore',
            icon:   <Icon
                        type='compass'
                    />
        },
    ]

    return (
        <div
            className='h-fit w-full bg-background shadow shadow-text/20 p-3 flex flex-row items-center text-text fixed top-0 left-0 px-20 z-60'
        >
            
            {/* logo and title */}
            <Link
                className='w-1/3 h-full items-center gap-3 flex'
                to={'/'}
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
            <div>

            </div>

            {/* user and searchbar */}
            <div>

            </div>

        </div>
    )
}

export default Navbar