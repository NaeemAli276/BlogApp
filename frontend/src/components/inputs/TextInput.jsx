import React from 'react'

const TextInput = ({ text, handleText, name, extraText, isRequired, placeholder = 'Enter some text...', type = 'text' }) => {
    return (
        <div
            className='p-3 rounded bg-background flex flex-col gap-1 w-full'
        >
            <h2
                className='text-text'
            >
                {name}<span className='text-rose-500'>{isRequired && '*'}</span>
            </h2>
            <input 
                type={type} 
                className='placeholder:text-text/50 outline-none w-full p-2 border-2 border-primary rounded '
                onChange={handleText}
                value={text}
                placeholder={placeholder}
            />
            <h2
                className='text-text/70 text-sm'
            >
                {extraText} 
            </h2>
        </div>
    )
}

export default TextInput