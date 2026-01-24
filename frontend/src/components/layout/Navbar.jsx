import React from 'react'
import { Link } from 'react-router-dom'
import NavBtn from '../layout/NavBtn'

const Navbar = () => {

    const defaultBtn = [
        {
            name: 'Login',
            path: '/Login'
        },
        {
            name: 'Register',
            path: '/Register'
        },
    ]

    return (
        <div
            className='w-full h-full col-span-full row-span-1 bg-background-100 px-14 flex items-center justify-between'
        >
            {/* logo */}
            <Link
                className='text-2xl font-semibold flex-row items-center flex gap-2'
            >
                <svg className='text-background-500' xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill={"currentColor"} viewBox="0 0 24 24"><path d="M12 7H6v6h6zm-2 4H8V9h2zm3 4H6v2h12v-2zm1-4h4v2h-4zm0-4h4v2h-4z"></path><path d="M4 21h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2M4 5h16v14H4z"></path></svg>
                <span
                    className='text-text-800'
                >
                    Explore
                </span>
            </Link>

            {/* nav buttons */}
            <div
                className='flex flex-row items-center gap-2 w-fit h-fit'
            >
                {
                    defaultBtn.map((btn) => (
                        <NavBtn
                            name={btn.name}
                            path={btn.path}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default Navbar