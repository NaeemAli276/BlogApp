import React from 'react'

const PostStatisticCard = ({ icon, name, value }) => {
    return (
        <div
            className='flex flex-row gap-4 w-full h-full p-5 rounded bg-secondary dark:bg-dark-secondary'
        >

            <span className='w-1 h-full bg-primary rounded-full'></span>

            {/* text */}
            <div
                className='w-full h-full flex flex-col gap-12'
            >
                <h2
                    className='font-semibold text-text/80 dark:text-dark-text/80 text-base/tight'
                >
                    {name}
                </h2>
                <p
                    className='text-2xl text-text dark:text-dark-text font-bold'
                >
                    {value}
                </p>
            </div>

            {/* icon */}
            <div
                className='flex items-start justify-start'
            >   
                <i  
                    className='p-2 rounded-md bg-primary dark:bg-dark-primary text-dark-text'
                >
                    {icon}
                </i>
            </div>

        </div>
    )
}

export default PostStatisticCard