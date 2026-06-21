import React, { useState } from 'react'
import Icon from '../../assets/Icon'

const DropDownBox = ({ children, name = 'field', isRequired }) => {
    
    // toggles
    const [isDropDownActive, setIsDropDownActive] = useState(true)

    return (
        <div
            className={`${isDropDownActive ? 'h-fit' : 'h-fit'} bg-secondary/70 rounded p-3 w-full duration-200 px-4 flex flex-col gap-4 shadow shadow-text/40`}
        >
            <div
                className='flex flex-row w-full h-fit items-center justify-between'
            >
                <h2
                    className='font-medium text-primary'
                >
                    {name}<span className='text-rose-500'>{isRequired && '*'}</span>
                </h2>
                <button
                    className={`${isDropDownActive ? 'rotate-180' : 'rotate-0'} text-text`}
                    onClick={() => setIsDropDownActive(!isDropDownActive)}
                    type='button'
                >
                    <Icon
                        type={'caret'}
                        size='20'
                        className='cursor-pointer'
                    />
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