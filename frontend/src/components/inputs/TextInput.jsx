import React from 'react'

const TextInput = ({ value, onChange, name, secondaryText, type, isRequired = false, secondaryTextShow, placeholderText, showName = true }) => {
    return (
        <div
            className='flex flex-col w-full h-fit gap-1'
        >
            <h3
                className={`text-base/tight font-medium ${showName ? 'block' : 'hidden'} dark:text-dark-text`}
            >
                {name}
                <span className={`${isRequired ? 'text-rose-500' : 'hidden'} `}>*</span>
            </h3>
            <input 
                type={type}
                value={value}
                placeholder={placeholderText}
                onChange={onChange}
                className='w-full h-fit p-2 pl-2.5 rounded dark:text-dark-text border-primary dark:border-dark-primary border-2 text-base/tight outline-none'
                required={isRequired}
            />
            <p
                className={`${secondaryTextShow ? 'block' : 'hidden'}`}
            >
                {secondaryText}
            </p>
        </div>
    )
}

export default TextInput