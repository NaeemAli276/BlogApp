import React from 'react'

const SubmitBtn = ({
    className = 'w-full h-fit p-2 bg-secondary/70 font-medium text-primary rounded hover:bg-primary hover:text-background duration-200 cursor-pointer shadow shadow-text/30',
    text = 'submit',
    ftn = () => {},
}) => {
    return (
        <button
            className={className}
            onClick={ftn}
            type='submit'
        >
            {text}
        </button>
    )
}

export default SubmitBtn