import React, { useState } from 'react'

const NewItemWrapper = ({ name, children, itemType, moveUpFtn, moveDownFtn, deleteFtn }) => {
    
    const [expand, setExpand] = useState(false)

    return (
        <div
            className='w-full h-fit bg-text/10 p-5 rounded-md'
        >
            <div
                className='flex flex-row items-center justify-between'
            >
                <button
                    className='font-medium flex gap-1 items-center text-primary'
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m12 15.41 5.71-5.7-1.42-1.42-4.29 4.3-4.29-4.3-1.42 1.42z"></path></svg>
                    {name}
                </button>
                
            </div>
            {children}
        </div>
    )
}

export default NewItemWrapper