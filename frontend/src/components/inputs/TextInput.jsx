import React from 'react'

const TextInput = ({ 
    text, 
    handleText, 
    name = '', 
    extraText, 
    isRequired, 
    placeholder = 'Enter some text...', 
    type = 'text',
    readOnly = false, 
    children,
    className = 'placeholder:text-text/50 outline-none w-full p-2 border-2 border-primary rounded text-text' 
}) => {
    return (
        <div
            className='rounded flex flex-col gap-1 w-full relative'
        >
            <h2
                className={`text-text ${name.length <= 0 ? 'hidden' : 'flex'}`}
            >
                {name}<span className='text-rose-500'>{isRequired && '*'}</span>
            </h2>
            <input 
                type={type} 
                className={className}
                onChange={handleText}
                value={text}
                placeholder={placeholder}
                readOnly={readOnly}
            />
            <h2
                className='text-text/50 text-sm'
            >
                {extraText} 
            </h2>
            {children}
        </div>
    )
}

export default TextInput