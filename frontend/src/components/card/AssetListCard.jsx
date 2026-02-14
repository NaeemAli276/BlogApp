import React from 'react'

const AssetListCard = ({ name, date, deleteFtn, loadFile, index, type }) => {
    return (
        <div
            className={`text-text dark:text-dark-text p-3 px-4 grid grid-cols-4 items-center justify-between w-full h-fit ${index % 2 !== 0 && 'bg-dark-background/4 dark:bg-background/4'}`}
            onClick={loadFile}
        >
            
            {/* name */}
            <div
                className='flex gap-4 items-center w-full h-full'
            >
                <i
                    className='p-1.5 bg-secondary dark:bg-dark-secondary rounded-full text-primary dark:text-dark-primary'
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2m0-2v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V19h-14ZM19 5v5.59L16.71 8.3a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14Z"></path><path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3"></path></svg>
                </i>
                <h2
                    className='font-medium'
                >
                    {name}
                </h2>
            </div>

            {/* date */}
            <div
                className='flex items-center w-full h-full justify-end'
            >
                <h2
                    className='text-sm'
                >
                    {date}
                </h2>
            </div>

            {/* type */}
            <div
                className='flex items-center w-full h-full justify-end'
            >
                <h2
                    className='text-sm text-primary dark:to-dark-primary' 
                >
                    {type}
                </h2>
            </div>

            {/* deleteBtn */}
            <div
                className='flex items-center w-full h-full justify-end'
            >
                <button
                    className='bg-rose-200 text-rose-800 dark:bg-rose-500 dark:text-rose-100 p-1.5 rounded-md'
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                </button>
            </div>

        </div>
    )
}

export default AssetListCard