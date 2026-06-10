import React from 'react'

const RadioBtn = ({ isActive = false, name = '', onClick = {} }) => {
    
    return (
        <div
            className='flex flex-row items-center w-full h-fit p-2 bg-background hover:bg-primary/20 rounded gap-3 '
            onClick={onClick}
        >
            <span
                className={`${isActive ? 'bg-primary text-background border-primary' : 'bg-text/10 border-primary/10'} w-4 h-4  rounded-full flex items-center justify-center border`}
            >
                {
                    isActive
                    &&  <svg  xmlns="http://www.w3.org/2000/svg" width={8} height={8} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20"></path></svg>
                }
            </span>
            <h2
                className='text-text/70 text-sm'
            >
                {name}
            </h2>
        </div>
    )
}

export default RadioBtn