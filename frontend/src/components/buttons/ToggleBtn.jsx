import { useState } from 'react'

const ToggleButton = ({ toggleFtn, isActive }) => {
    
    return (
        <button
            onClick={toggleFtn}
            className={`relative inline-flex h-6 w-11 items-center rounded-full duration-200 ease-in transition-colors ${
                isActive ? 'bg-primary dark:bg-dark-primary' : 'bg-background dark:bg-dark-secondary'
            }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full duration-200 ease-in transition-transform ${
                isActive ? 'translate-x-6 bg-white' : 'translate-x-1 bg-primary'
                }`}
            />
        </button>
    )
}

export default ToggleButton