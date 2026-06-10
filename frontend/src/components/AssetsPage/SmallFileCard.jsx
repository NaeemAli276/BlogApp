import React from 'react'


const SmallFileCard = ({ 
    filetype,
    name,
    usedAmount,
    size
}) => {
    return (
        <div
            className='flex flex-row items-center gap-3 bg-background p-2 shadow shadow-text/20 rounded w-full h-fit justify-between'
        >
            <div
                className='flex flex-row items-center gap-3 w-full h-fit'
            >
                {/* icons */}
                <svg className='p-1 rounded bg-accent/50 text-primary' xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2m0-2v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V19h-14ZM19 5v5.59L16.71 8.3a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14Z"></path><path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3"></path></svg>

                {/* name and filetype */}
                <div
                    className='flex flex-col gap-0 w-fit h-fit'
                >
                    <h2
                        className='text-primary text-sm/tight font-medium'   
                    >
                        {name}
                    </h2>
                    <h3
                        className='text-xs text-text/70'
                    >
                        {filetype}
                    </h3>
                </div>
            </div>

            {/* size */}
            <div
                className='w-fit flex items-center justify-end h-full'
            >
                <h3
                    className='w-full flex items-end justify-end text-text text-xs'
                >
                    {size}KB
                </h3>
            </div>

        </div>
    )
}

export default SmallFileCard