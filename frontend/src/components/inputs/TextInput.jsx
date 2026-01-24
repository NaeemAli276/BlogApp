import React from 'react'

const TextInput = ({ value, onChange, name, secondaryText, type, isRequired = false, secondaryTextShow, placeholderText }) => {
    return (
        <div
            className='flex flex-col w-full h-fit gap-1'
        >
            <h3
                className='text-base/tight font-medium'
            >
                {name}
            </h3>
            <input 
                type={type}
                value={value}
                placeholder={placeholderText}
                onChange={onChange}
                className='w-full h-fit p-2 pl-2.5 rounded border-primary border-2 text-base/tight outline-none'
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