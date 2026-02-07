import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideBar = () => {

    const navLinks = [
        {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M20 3h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1 8h-4V5h4zm-9-8H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1M9 7H5V5h4zm11 8h-6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1m-1 4h-4v-2h4zm-9-8H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1m-1 8H5v-6h4z"></path></svg>,
            name: 'Dashboard',
            path: '/Dashboard'
        },
        {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M6 15h8v2H6zm0-4h12v2H6zm0-4h12v2H6z"></path><path d="M4 21h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2M4 5h16v14H4z"></path></svg>,
            name: 'Posts',
            path: '/Posts'

        },
        {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 11c1.71 0 3-1.29 3-3s-1.29-3-3-3-3 1.29-3 3 1.29 3 3 3m0-4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1m1 5h-2c-2.76 0-5 2.24-5 5v.5c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5V17c0-2.76-2.24-5-5-5m-5 5c0-1.65 1.35-3 3-3h2c1.65 0 3 1.35 3 3zm-1.5-6c.47 0 .9-.12 1.27-.33a5.03 5.03 0 0 1-.42-4.52C7.09 6.06 6.8 6 6.5 6 5.06 6 4 7.06 4 8.5S5.06 11 6.5 11m-.39 1H5.5C3.57 12 2 13.57 2 15.5v1c0 .28.22.5.5.5H4c0-1.96.81-3.73 2.11-5m11.39-1c1.44 0 2.5-1.06 2.5-2.5S18.94 6 17.5 6c-.31 0-.59.06-.85.15a5.03 5.03 0 0 1-.42 4.52c.37.21.79.33 1.27.33m1 1h-.61A6.97 6.97 0 0 1 20 17h1.5c.28 0 .5-.22.5-.5v-1c0-1.93-1.57-3.5-3.5-3.5"></path></svg>,
            name: 'Friends',
            path: '/Friends'
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
                    <svg  xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 7H6v6h6zm-2 4H8V9h2zm3 4H6v2h12v-2zm1-4h4v2h-4zm0-4h4v2h-4z"></path><path d="M4 21h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2M4 5h16v14H4z"></path></svg>
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
                            className={`${location.pathname.includes(btn.path) ? 'bg-white text-text' : ''} flex gap-4 text-dark-text items-center p-2 w-full h-fit rounded-md bg-primary`}
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