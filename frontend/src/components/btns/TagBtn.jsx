import React from 'react'

const TagBtn = ({ name, handleSelectTag }) => {
    return (
        <button
            className='p-1 px-2 rounded bg-accent/50 text-text w-fit h-fit text-sm hover:text-background hover:bg-primary flex flow-row gap-1 duration-200 cursor-pointer items-center'
            onClick={handleSelectTag}
            type='button'
        >
            <svg className='text-secondary' xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path></svg>
            {name}
        </button>
    )
}

export default TagBtn