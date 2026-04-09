import React, { useState } from 'react'

const DropDownBox = ({ children, name = 'field', isRequired }) => {
    
    // toggles
    const [isDropDownActive, setIsDropDownActive] = useState(true)

    return (
        <div
            className={`${isDropDownActive ? 'h-fit' : 'h-fit'} bg-accent rounded p-3 w-full duration-200 px-4 flex flex-col gap-4 shadow shadow-text/40`}
        >
            <div
                className='flex flex-row w-full h-fit items-center justify-between'
            >
                <h2
                    className='font-medium'
                >
                    {name}<span className='text-rose-500'>{isRequired && '*'}</span>
                </h2>
                <button
                    className={`${isDropDownActive ? 'rotate-180' : 'rotate-0'} text-text`}
                    onClick={() => setIsDropDownActive(!isDropDownActive)}
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M17.35 8H6.65c-.64 0-.99.76-.56 1.24l5.35 6.11c.3.34.83.34 1.13 0l5.35-6.11C18.34 8.76 18 8 17.36 8Z"></path></svg>
                </button>
            </div>
            <div
                className={`${isDropDownActive ? 'flex' : 'hidden'}`}
            >
                {children}
            </div>
        </div>
    )
}

export default DropDownBox