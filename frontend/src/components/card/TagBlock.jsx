import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTags } from '../../api/tags'

const TagBlock = () => {
    // state
    const [expand, setExpand] = useState(true)
    
    const { isLoading, error, data: tags } = useQuery({
        queryKey: ['tags'],
        queryFn: getTags 
    })

    useEffect(() => {
        console.log(tags)
    })
    
    return (

        <div
            className='w-full h-fit flex flex-col gap-5 bg-dark-background/10 dark:bg-dark-background/20 p-3 rounded-md'
        >
            <button
                className='font-medium flex gap-1 py-0.5 items-center text-primary dark:text-dark-text'
                onClick={() => setExpand(!expand)}
            >
                <svg className={`${expand ? 'rotate-180' : 'rotate-0'} `} xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox="0 0 24 24"><path d="m12 15.41 5.71-5.7-1.42-1.42-4.29 4.3-4.29-4.3-1.42 1.42z"></path></svg>
                <h2 
                    className='flex flex-row'   
                >
                    Tags
                </h2>
            </button>

        </div>
    )
}

export default TagBlock