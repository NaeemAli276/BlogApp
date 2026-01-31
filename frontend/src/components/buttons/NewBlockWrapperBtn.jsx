import React from 'react'

const NewBlockWrapperBtn = ({ icon, ftn, index, maxlength }) => {
    return (
        <button
            className={`p-1 bg-background dark:bg-background/10 dark:text-dark-text ${index === 0 && 'rounded-l'} ${index + 1 >= maxlength && 'rounded-r'} ${index > 0 && index + 1 < maxlength && 'border-x border-dark-background/10 dark:border-background/10'} hover:bg-dark-background/5 dark:hover:bg-background/20 duration-200`}
            onClick={ftn}
        >
            {icon}  
        </button>
    )
}

export default NewBlockWrapperBtn