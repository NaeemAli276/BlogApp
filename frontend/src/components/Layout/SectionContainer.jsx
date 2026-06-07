import React from 'react'

const SectionContainer = ({ 
    children,  
    className='grid grid-cols-12 grid-rows-12 w-full h-screen max-h-[80vh] gap-4'
}) => {
    return (
        <div
            className={className}
        >
            {children}
        </div>
    )
}

export default SectionContainer