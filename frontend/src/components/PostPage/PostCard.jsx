import React from 'react'
import DropdownMenu from '../inputs/DropdownMenu'
import { truncateText } from '../../utils/textUtils'

const PostCard = ({ 
    post = null,
    ftn = () => {}
}) =>
{

    return (
        <div
            className='bg-background rounded flex flex-col gap-2 shadow shadow-text/20 relative cursor-pointer hover:-translate-y-3 active:-translate-y-1 duration-200 hover:shadow-text/70 hover:z-50'
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
                    {/* views */}
                    <h3
                        className='flex flex-row items-center gap-1 text-background '
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path></svg>
                        20.4k
                    </h3>
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