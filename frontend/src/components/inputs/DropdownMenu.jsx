import React, { useState } from 'react'

const DropdownMenu = ({ 
    icon=null, 
    name='', 
    children, 
    isDropdownActive, 
    toggleDropdown, 
    buttonStyle= 'p-2 rounded bg-background  text-text/70 font-medium flex-row flex gap-1 items-center duration-200 cursor-pointer shadow shadow-text/20 hover:bg-text/10',  
    menuStyle=`flex-col absolute top-12 right-0 bg-background rounded shadow shadow-text/50 h-fit min-w-52 z-60 p-1 ${isDropdownActive ? 'flex' : 'hidden'}`
}) => {

    return (
        <div
            className='flex w-fit h-fit relative'
        >
            <button
                className={buttonStyle}
                onClick={toggleDropdown}
            >
                <i>
                    {icon}
                </i>
                <h3
                    className={`${name === '' ? 'hidden' : 'flex'}`}
                >
                    {name}
                </h3>
            </button>
            <div
                className={menuStyle}
            >
                {children}
            </div>
        </div>
    )
}

export default DropdownMenu