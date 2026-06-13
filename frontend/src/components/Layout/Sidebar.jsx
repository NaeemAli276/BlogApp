// used for user's cms
import React, { useEffect } from 'react'
import SidebarBtn from '../btns/SidebarBtn'
import { useLocation } from 'react-router-dom'
import Icon from '../Icon'

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
            icon:   <i
                        className='text-text'
                    >
                        <Icon
                            type={'cardView'}
                            size='base'
                        />
                    </i>,
            path: '/My_posts'
        },
        // {
        //     name: 'Assets',
        //     icon: <svg  xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M21 14V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h9v-2H5v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V14h2Zm-4.29-5.71a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14v5.59L16.73 8.3Z"></path><path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M21 16h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></svg>,
        //     path: '/Assets'
            
        // },
        {
            name: 'Comments',
            icon:   
                    <i
                        className='text-text'
                    >
                        <Icon
                            type={'comments'}
                            size='base'
                        />
                    </i>,
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
                    <Icon
                        type={'logo'}
                        size='base'
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
                <SidebarBtn
                    icon={
                        <i
                            className='text-text'
                        >
                            <Icon
                                type={'user'}
                                size='base'
                            />
                        </i>
                    }
                />

                <span className='w-full h-px bg-text/20'></span>

                {/* logout btn */}
                <button
                    className='text-rose-700 p-1 rounded hover:bg-rose-100 hover:text-rose-900 duration-200 active:bg-rose-200'
                >
                    <Icon
                        type='logout'
                        size='base'
                    />
                </button>

            </div>

        </div>
    )
}

export default Sidebar