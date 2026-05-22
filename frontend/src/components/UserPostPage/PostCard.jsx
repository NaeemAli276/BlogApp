import React from 'react'
import DropdownMenu from '../inputs/DropdownMenu'
import { truncateText, formatCompactNumber } from '../../utils/textUtils'

const PostCard = ({ 
    post = null,
    ftn = () => {}
}) =>
{

    return (
        <div
            className='bg-background rounded flex flex-col gap-2 shadow shadow-text/20 relative cursor-pointer hover:-translate-y-3 active:-translate-y-1 duration-200 hover:shadow-text/70 hover:z-50u'
            onClick={ftn}
        >

            <div
                className='bg-black/30 absolute top-0 left-0 z-10 w-full h-full rounded'
            >
            </div>

            {/* thumbnail */}
            <div
                className='w-full h-fit flex'
            >
                {

                    post.thumbnail === null
                    ?   <svg  
                            xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2M8.5 7c.83 0 1.5.67 1.5 1.5S9.33 10 8.5 10 7 9.33 7 8.5 7.67 7 8.5 7M5 17.41l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V19h-14v-1.59Z"></path>
                        </svg>
                    :   <img 
                            src={post.thumbnail} 
                            alt=""
                            className='rounded w-full h-full aspect-video'
                        />
                }
            </div>

            <div
                className='absolute top-0 z-20 left-0 flex flex-col justify-between w-full h-full p-4'
            >

                {/* view count and menu button */}
                <div
                    className='flex flex-row items-center justify-between w-full h-fit relative '
                >
                    <div
                        className='flex flex-row items-center gap-3 w-fit h-fit'
                    >
                        {/* views */}
                        <h3
                            className='flex flex-row items-center gap-1 text-background '
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path></svg>
                            {formatCompactNumber(post.views)}
                        </h3>
                        {/* likes */}
                        <h3
                            className='flex flex-row items-center gap-1 text-background '
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M20 8h-5.61l1.12-3.37c.2-.61.1-1.28-.27-1.8-.38-.52-.98-.83-1.62-.83h-1.61c-.3 0-.58.13-.77.36L6.54 8H4.01c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13.31a2 2 0 0 0 1.87-1.3l2.76-7.35c.04-.11.06-.23.06-.35v-2c0-1.1-.9-2-2-2ZM6 19H4v-9h2zm14-7.18L17.31 19H8V9.36L12.47 4h1.15l-1.56 4.68a1.01 1.01 0 0 0 .95 1.32h7v1.82Z"></path></svg>
                            {formatCompactNumber(post.likes)}
                        </h3>
                        {/* shares */}
                        <h3
                            className='flex flex-row items-center gap-1 text-background '
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M5.5 15.5c1.07 0 2.02-.5 2.67-1.26l6.87 3.87c-.01.13-.04.26-.04.39 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5c-1.07 0-2.02.5-2.67 1.26l-6.87-3.87c.01-.13.04-.26.04-.39s-.02-.26-.04-.39l6.87-3.87C16.47 8.5 17.42 9 18.5 9 20.43 9 22 7.43 22 5.5S20.43 2 18.5 2 15 3.57 15 5.5c0 .13.02.26.04.39L8.17 9.76A3.48 3.48 0 0 0 5.5 8.5C3.57 8.5 2 10.07 2 12s1.57 3.5 3.5 3.5m13 1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5m0-13c.83 0 1.5.67 1.5 1.5S19.33 7 18.5 7 17 6.33 17 5.5 17.67 4 18.5 4m-13 6.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S4 12.83 4 12s.67-1.5 1.5-1.5"></path></svg>
                            {formatCompactNumber(post.shares)}
                        </h3>
                    </div>
                    <h2
                        className='w-fit h-fit rounded text-sm p-1 px-2 shadow shadow-text/10 bg-primary text-background'
                    >
                        {post.category}
                    </h2>
                </div>

                {/* title */}
                <div
                    className='flex flex-col gap-1 w-full h-fit'
                >
                    <div
                        className='flex flex-row items-center gap-2'
                    >

                    </div>
                    <h2
                        className='text-background font-semibold'
                    >
                        {truncateText(post.title, 75)}
                    </h2>
                    <h4
                        className='text-sm text-background/80 '
                    >
                        Date: {post.date}
                    </h4>
                </div>

            </div>

        </div>
    )
}

export default PostCard