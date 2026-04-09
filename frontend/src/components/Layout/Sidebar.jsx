// used for user's cms
import React, { useEffect } from 'react'
import SidebarBtn from '../btns/SidebarBtn'
import { useLocation } from 'react-router-dom'


const Sidebar = () => {

    const location = useLocation()
    
    const sidebarBtns = [
        {
            name: 'Analytics',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M4 2H2v19c0 .55.45 1 1 1h19v-2H4z"></path><path d="M19 18c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1zM16 6h2v10h-2zm-5 12c.55 0 1-.45 1-1v-7c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1zm-3-7h2v5H8z"></path></svg>,
            path: '/Analytics'
        },
        {
            name: 'Posts',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M8 11h13v2H8zm0-5h13v2H8zm0 10h13v2H8zM3 5.5h3v3H3zm0 5h3v3H3zm0 5h3v3H3z"></path></svg>,
            path: '/Posts'
        },
        {
            name: 'Assets',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M21 14V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h9v-2H5v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V14h2Zm-4.29-5.71a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14v5.59L16.73 8.3Z"></path><path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M21 16h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></svg>,
            path: '/Assets'
            
        },
        {
            name: 'Comments',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M4 19h3v2c0 .36.19.69.51.87a1 1 0 0 0 1-.01L13.27 19h6.72c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2M4 5h16v12h-7c-.18 0-.36.05-.51.14L9 19.23V18c0-.55-.45-1-1-1H4z"></path></svg>,
            path: '/Comments'
        },

    ]

    return (
        <div
            className='col-span-4 row-span-full bg-primary h-full text-background p-8 py-6 gap-32 flex flex-col '
        >
            
            {/* logo and name */}
            <div
                className='flex flex-row items-center gap-3 w-full h-fit'
            >
                <i
                    className='p-1 rounded-md bg-background text-primary px-1.5'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M5 7h5v6H5zm0 8h10v2H5zm7-4h3v2h-3zm0-4h3v2h-3z"></path><path d="M21 18c0 .55-.45 1-1 1s-1-.45-1-1V5c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v13c0 1.65 1.35 3 3 3h16c1.65 0 3-1.35 3-3V6h-2zM4 19c-.55 0-1-.45-1-1V5h14v13c0 .35.07.69.18 1z"></path></svg>
                </i>
                <h2
                    className='text-3xl font-semibold'
                >
                    Blogi
                </h2>
            </div>

            {/* sidebar buttons */}
            <div
                className='flex flex-col gap-2 w-full h-fit'
            >
                {
                    sidebarBtns.map((btn) => (
                        <SidebarBtn
                            key={btn.name}
                            icon={btn.icon}
                            name={btn.name}
                            ftn={btn.path}
                            isSelected={location.pathname.includes(btn.path)}
                        />
                    ))
                }
            </div>


        </div>
    )
}

export default Sidebar