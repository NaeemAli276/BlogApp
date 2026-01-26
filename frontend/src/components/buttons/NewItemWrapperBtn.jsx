import React from 'react'

const NewItemWrapperBtn = ({ icon, ftn, index, maxlength }) => {
    return (
        <button
            className={`p-1 bg-white ${index === 0 && 'rounded-l'} ${index + 1 >= maxlength && 'rounded-r'} ${index > 0 && index + 1 < maxlength && 'border-x border-dark-background/10'} hover:bg-dark-background/5`}
            onClick={ftn}
        >
            {icon}  
        </button>
    )
}

export default NewItemWrapperBtn