import React from 'react'
import Icon from '../../assets/Icon'

const TagBtn = ({ 
    name, 
    handleTagChange, 
    isAlreadySelected = false 
}) => {
    return (
        <button
            className={`p-1 px-2 rounded bg-accent/60 text-primary w-fit h-fit text-sm hover:text-background hover:bg-primary flow-row gap-1 duration-200 cursor-pointer items-center group ${isAlreadySelected ? 'hidden' : 'flex'}`}
            onClick={handleTagChange}
            type='button'
        >
            <Icon
                type={'circle'}
                className='text-primary group-hover:text-secondary size-2.5'
                pack='filled'
                size='xs' 
            />
            <span

            >
                {name}
            </span>
        </button>
    )
}

export default TagBtn