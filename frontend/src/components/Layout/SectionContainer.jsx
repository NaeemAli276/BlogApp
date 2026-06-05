import React from 'react'

const SectionContainer = ({ children }) => {
    return (
        <div
            className='grid grid-cols-12 grid-rows-12 w-full h-screen max-h-[80vh] gap-4'
        >
            {children}
        </div>
    )
}

export default SectionContainer