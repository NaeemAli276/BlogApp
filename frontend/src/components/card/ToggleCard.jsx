import React from 'react'
import ToggleButton from '../buttons/ToggleBtn'


const ToggleCard = ({ value, toggleFtn, purpose, text }) => {
    return (
        <div
            className='p-3 rounded-md flex flex-col gap-2 w-3/4 h-fit bg-secondary shadow shadow-dark-background/20 dark:bg-background/10'
        >
            <div
                className='w-full h-fit flex justify-between items-center'
            >
                <h2
                    className='font-medium text-text dark:text-dark-text'
                >
                    {purpose}
                </h2>
                <ToggleButton
                    isActive={value}
                    toggleFtn={toggleFtn}
                />
            </div>
            <h2
                className='text-sm text-text/80 dark:text-dark-text/80'
            >
                {text}
            </h2>
        </div>
    )
}

export default ToggleCard