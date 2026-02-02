import React, { useState } from 'react'

const PostTagBtn = ({ name, ftn, isSelected = false }) => {
    
    return (
        <button
            className='flex flex-row items-center gap-2 w-fit h-fit p-1 px-2.5 rounded-full bg-background dark:bg-dark-accent/50 hover:bg-primary hover:text-dark-text duration-200 cursor-pointer dark:text-dark-text dark:hover:bg-dark-primary text-primary '
            onClick={() => ftn()}
        >   
            <h2
                className='text-sm'
            >
                {name}
            </h2>
            {
                isSelected
                ?   <svg  
                        xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                    </svg>   
                :   <svg  
                        xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path>
                    </svg>
            }
        </button>
    )
}

export default PostTagBtn