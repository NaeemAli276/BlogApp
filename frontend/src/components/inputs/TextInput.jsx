import React, { useState } from 'react'

const TextInput = ({ value, onChange, name, secondaryText, type, isRequired = false, secondaryTextShow, placeholderText, showName = true }) => {


    return (
        <div
            className='flex flex-col w-full h-fit gap-1.5'
        >
            <h3
                className={`text-base/tight font-medium ${showName ? 'block' : 'hidden'} dark:text-dark-text text-text`}
            >
                {name}
                <span className={`${isRequired ? 'text-rose-500' : 'hidden'} `}>*</span>
            </h3>
            <input 
                type={type}
                value={value}
                placeholder={placeholderText}
                onChange={onChange}
                className='w-full h-fit p-2 pl-2.5 rounded dark:text-dark-text border-primary dark:border-dark-primary dark:bg-background/5 bg-background border-2 text-base/tight outline-none'
                required={isRequired}
            />
            <p
                className={`${secondaryTextShow ? 'block' : 'hidden'} dark:text-dark-text/60 text-text/60 pl-0.5 text-sm`}
            >
                {secondaryText}
            </p>
        </div>
    )
}

export default TextInput