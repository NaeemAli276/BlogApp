import React from 'react'

const GeneralBtns = ({ colour, textColour, name, icon, ftn }) => {
    return (
        <button
            className={`
                ${colour === 'primary' && 'bg-primary dark:bg-dark-primary hover:bg-primary/80 dark:hover:bg-dark-primary/80 text-dark-text'} 
                ${colour === 'normal' && 'bg-dark-background/10 hover:bg-dark-background/20 dark:bg-background/10 hover:dark:bg-background/20 text-text dark:text-dark-text'}
                flex flex-row items-center gap-2 p-2 px-3 rounded-md font-medium duration-200`}
            onClick={ftn}
        >
            {icon}
            {name}
        </button>
    )
}

export default GeneralBtns