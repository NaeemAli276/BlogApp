import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../../api/Categories'

const CategoryDropdown = ({ onChange, value }) => {

    // query
    const { isLoading, error, data } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })

    // toggles
    const [expand, setExpand] = useState(false)

    const [currentValue, setCurrentValue] = useState(value)

    const handleClick = (value) => {
        setCurrentValue(value.name)
        onChange(value.name)
        setExpand(!expand)
    }

    return (    
        <div
            className='relative flex max-w-1/2 w-full h-full'
        >

            {/* show current value */}
            <button
                className='flex flex-row items-center justify-between w-full h-fit p-2 pl-3 bg-secondary text-text dark:text-dark-text dark:bg-background/10 rounded-md'    
                onClick={() => setExpand(!expand)}
            >
                <h2
                    className=''
                >
                    {
                        currentValue === null
                        ? 'None'
                        : currentValue
                    }
                </h2>
                <i>
                    <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="m12 15.41 5.71-5.7-1.42-1.42-4.29 4.3-4.29-4.3-1.42 1.42z"></path></svg>
                </i>
            </button>

            {/* options */}
            <div
                className={`absolute top-12 left-0 z-50 bg-secondary flex-col dark:bg-background/10 rounded-md w-full h-48 ${expand ? 'flex' : 'hidden'} overflow-y-scroll no-scrollbar`}
            >
                {
                    data?.categories.map((cat) => (
                        <button 
                            key={cat.id}
                            className='w-full h-fit p-2 px-3 hover:bg-dark-background/10 dark:hover:bg-background/10 text-start text-text dark:text-dark-text'
                            onClick={() => handleClick(cat)}
                        >
                            {cat.name}
                        </button>
                    ))
                }
            </div>

        </div>
    )
}

export default CategoryDropdown