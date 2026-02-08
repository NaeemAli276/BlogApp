import React from 'react'

const UserPostsContainer = () => {

    const btns = [
        {
            name: 'list',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M5 19V5h14v14z"></path><path d="M7 7h2v2H7zm4 0h6v2h-6zm-4 4h2v2H7zm4 0h6v2h-6zm-4 4h2v2H7zm4 0h6v2h-6z"></path></svg>
        }
    ]

    return (
        <div
            className='flex flex-col gap-4 w-full h-full col-span-10 row-span-14 row-start-3'
        >
            
            {/* title and buttons */}
            <div
                className='flex flex-col gap-2 w-full h-fit'
            >

                {/* title and buttons */}
                <div
                    className='w-full h-fit flex flex-row justify-between items-center'
                >
                    <h2
                        className='text-xl font-medium'
                    >
                        My Posts
                    </h2>

                </div>

                <span className='w-full h-px bg-primary'></span>

            </div>

        </div>
    )
}

export default UserPostsContainer