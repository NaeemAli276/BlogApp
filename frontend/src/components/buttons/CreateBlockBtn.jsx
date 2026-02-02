import React from 'react'

const CreateBlockBtn = ({ icon, name, ftn }) => {
    return (
        <button
            className='flex flex-row items-center gap-2 bg-secondary text-text dark:bg-dark-secondary dark:text-dark-text p-2 px-3 rounded text-sm hover:bg-primary dark:hover:bg-dark-primary hover:text-white duration-200'
            onClick={ftn}
        >
            {icon}  
            {name}
        </button>
    )
}

export default CreateBlockBtn