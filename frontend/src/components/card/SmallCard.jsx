import React from 'react'

const SmallCard = ({ icon, purpose }) => {
    return (
        <div
            className='flex flex-row items-center gap-2 w-fit h-fit p-2 px-3 bg-secondary dark:bg-background/10 text-text dark:text-dark-text rounded-md'
        >
            <h2
                className='text-sm'
            >
                {purpose}
            </h2>
            <i>
                {icon}
            </i>
        </div>
    )
}

export default SmallCard