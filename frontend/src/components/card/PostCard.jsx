import React from 'react'
import { formatNumber, truncateText } from '../../utils/TextUtils'
import { formatToDDMMYY } from '../../utils/DateUtils'

const PostCard = ({ image, title, views, status, date, category, tags }) => {
    return (
        <div
            className='relative w-full bg-secondary dark:bg-dark-secondary min-h-80 h-full flex-1 flex flex-col gap-2 rounded-md p-2.5'
        >       

            {/* status */}
            <div
                className='absolute top-3.5 right-3.5 p-1 px-1.5 bg-accent dark:bg-dark-accent text-xs rounded text-secondary font-medium'
            >                                                                                   
                <h2>
                    {status}
                </h2>
            </div>

            {/* image */}
            <div
                className='w-fit h-fit aspect-video rounded-md'
            >
                <img   
                    src={image}
                    className='rounded'
                    alt='postimage' 
                />
            </div>

            {/* category and date */}
            <div
                className='flex flex-row items-center justify-between w-full h-fit'
            >
                <h3
                    className='text-text/80 dark:text-dark-text/80 text-xs/tight'
                >   
                    {category}
                </h3>
            </div>

            {/* title */}
            <div
                className='flex w-full h-fit flex-col gap-0 min-h-15 items-start'    
            >
                <h2
                    className='font-medium text-text dark:text-dark-text text-base/tight'
                >
                    {truncateText(title, 45)}
                </h2>
            </div>

            <span className='w-full min-h-px bg-primary dark:bg-dark-primary'></span>

            {/* tags */}
            <div
                className='flex flex-row items-center flex-wrap gap-1'
            >
                {
                    tags.map((tag) => (
                        <h4
                            className='bg-primary dark:bg-dark-primary text-dark-text p-0.5 px-1.5 rounded text-xs font-medium'
                        >
                            {tag}
                        </h4>
                    ))
                }
            </div>

            {/* date and views */}
            <div
                className='flex flex-row items-end justify-between w-full h-full'
            >
                <h2
                    className='flex flex-row items-center gap-1 text-text/80 dark:text-dark-text/80 text-[13px]'
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M5 20V8h14V6v14z"></path><path d="M7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"></path></svg>
                    {formatToDDMMYY(date)}
                </h2>
                <h2
                    className='flex flex-row items-center gap-1 text-text/80 dark:text-dark-text/80 text-sm'
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path></svg>
                    {formatNumber(views)}
                </h2>
            </div>

        </div>
    )
}

export default PostCard