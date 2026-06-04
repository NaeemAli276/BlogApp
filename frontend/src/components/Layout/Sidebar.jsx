// used for user's cms
import React, { useEffect } from 'react'
import SidebarBtn from '../btns/SidebarBtn'
import { useLocation } from 'react-router-dom'


const Sidebar = () => {

    const location = useLocation()

    const sidebarBtns = [
        // {
        //     name: 'Analytics',
        //     icon: <svg  xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M4 2H2v19c0 .55.45 1 1 1h19v-2H4z"></path><path d="M19 18c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1zM16 6h2v10h-2zm-5 12c.55 0 1-.45 1-1v-7c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1zm-3-7h2v5H8z"></path></svg>,
        //     path: '/Analytics'
        // },
        {
            name: 'Posts',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                    <path fill="currentColor" d="M184 72H40a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V88a16 16 0 0 0-16-16m0 128H40V88h144zm48-144v120a8 8 0 0 1-16 0V56H64a8 8 0 0 1 0-16h152a16 16 0 0 1 16 16"></path>
                </svg>,
            path: '/My_posts'
        },
        // {
        //     name: 'Assets',
        //     icon: <svg  xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M21 14V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h9v-2H5v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V14h2Zm-4.29-5.71a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14v5.59L16.73 8.3Z"></path><path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M21 16h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></svg>,
        //     path: '/Assets'
            
        // },
        {
            name: 'Comments',
            icon: <svg 
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M5 3h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-4.59l-3.7 3.71c-.18.18-.43.29-.71.29a1 1 0 0 1-1-1v-3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m13 1H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h4v4l4-4h5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" strokeWidth={0.4} stroke="currentColor"></path>
                </svg>,
            path: '/Comments'
        },

    ]

    return (
        <div
            className='bg-background h-full w-16 flex flex-col items-center shadow shadow-text/20 p-3 gap-2'
        >
            
            {/* logo and name */}
            <SidebarBtn
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m14 10l-3 3m9.288-9.969a.535.535 0 0 1 .68.681l-5.924 16.93a.535.535 0 0 1-.994.04l-3.219-7.242a.54.54 0 0 0-.271-.271l-7.242-3.22a.535.535 0 0 1 .04-.993z"></path>
                    </svg>
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
                <SidebarBtn
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256">
                        <path fill="currentColor" d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56"></path>
                    </svg>}
                />

                <span className='w-full h-px bg-text/20'></span>

                {/* logout btn */}
                <button
                    className='text-rose-700 p-1 rounded hover:bg-rose-100 hover:text-rose-900 duration-200 active:bg-rose-200'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20.968 18.448a2.577 2.577 0 0 1-2.73 2.5c-2.153.012-4.306 0-6.459 0a.5.5 0 0 1 0-1c2.2 0 4.4.032 6.6 0c1.107-.016 1.589-.848 1.589-1.838V5.647A1.55 1.55 0 0 0 19 4.175a3 3 0 0 0-1.061-.095h-6.16a.5.5 0 0 1 0-1c2.224 0 4.465-.085 6.687 0a2.567 2.567 0 0 1 2.5 2.67Z" strokeWidth={0.3} stroke="currentColor"></path>
                        <path fill="currentColor" d="M3.176 11.663a.46.46 0 0 0-.138.311q.002.021-.006.043c-.008.022 0 .027.006.041a.46.46 0 0 0 .138.312l3.669 3.669a.5.5 0 0 0 .707-.707l-2.815-2.816h10.742a.5.5 0 0 0 0-1H4.737L7.552 8.7a.5.5 0 0 0-.707-.707Z" strokeWidth={0.3} stroke="currentColor"></path>
                    </svg>
                </button>

            </div>

        </div>
    )
}

export default Sidebar