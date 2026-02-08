import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideBar = () => {

    const navLinks = [
        {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M6 15h8v2H6zm0-4h12v2H6zm0-4h12v2H6z"></path><path d="M4 21h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2M4 5h16v14H4z"></path></svg>,
            name: 'Posts',
            path: '/Posts'

        },
        {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M13 9h5v2h-5zm1 4h4v2h-4z"></path><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M4 18V6h16v12z"></path><path d="M9 8a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0 5c-1.66 0-3 1.34-3 3h6c0-1.66-1.34-3-3-3"></path></svg>,
            name: 'Profile',
            path: '/EditProfile'
        },
        {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="m12 12-1-1-2 3h10l-4-6z"></path><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M8 16V4h12v12z"></path><path d="M4 8H2v12c0 1.1.9 2 2 2h12v-2H4z"></path></svg>,
            name: 'Assets',
            path: '/Assets'
        }
    ]

    const location = useLocation()

    return (
        <div
            className='col-span-4 w-full h-full bg-primary dark:bg-dark-primary row-span-full grid grid-rows-16'
        >
            
            {/* title and homeBtn */}
            <div
                className='row-span-2 w-full h-full flex items-center p-5 text-dark-text'
            >
                <Link
                    className='flex flex-row items-center gap-2 p-2'
                    to={'/'}
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M12 7H6v6h6zm-2 4H8V9h2zm3 4H6v2h12v-2zm1-4h4v2h-4zm0-4h4v2h-4z"></path><path d="M4 21h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2M4 5h16v14H4z"></path></svg>
                    <h2
                        className='text-2xl font-semibold'
                    >
                        Blogi
                    </h2>
                </Link>
            </div>

            {/* nav Links */}
            <div
                className='flex flex-col gap-3 w-full h-full row-span-4 row-start-5 p-5'
            >
                {
                    navLinks.map((btn) => (
                        <Link
                            key={btn.name}
                            className={`${location.pathname.includes(btn.path) ? 'bg-white dark:bg-white text-text dark:text-dark-accent' : ''} flex gap-4 text-dark-text items-center p-2 w-full h-fit rounded-md bg-primary dark:bg-dark-primary`}
                            to={btn.path}
                        >
                            {btn.icon}
                            <span
                                className='text-lg font-medium'
                            >
                                {btn.name}
                            </span>
                        </Link>
                    ))
                }
            </div>

        </div>
    )
}

export default SideBar