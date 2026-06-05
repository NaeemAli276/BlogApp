import React from 'react'
import { truncateText } from '../../utils/textUtils'
import { useNavigate } from 'react-router-dom'
import AuthorBtn from '../btns/AuthorBtn'

const HeroPostCard = ({
    post = {},
}) => {

    const navigate = useNavigate()

    return (
        <div
            className='aspect-video relative shadow shadow-text/50 rounded'
            onClick={() => navigate(`/${post?.url}`, { state: post })}
        >

            {/* author */}
            <div
                className='absolute top-0 left-0 py-4 p-5 w-full h-fit'
            >
                
                <AuthorBtn
                    author={post?.author}
                />

            </div>

            {/* overlay */}
            <div 
                className='w-full h-3/10 bg-black/50 rounded-b z-10 absolute bottom-0 left-0 flex flex-col gap-2 p-5 py-4 text-background'
            >
                
                <span
                    className='bg-background w-fit text-primary px-2 p-0.5 rounded-full flex-row flex gap-1 items-center text-sm font-medium'
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={8} height={8} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20"></path></svg>
                    {post?.category}
                </span>

                {/* title */}
                <div
                    className='flex flex-col justify-between w-full h-full'
                >
                    <h2
                        className='text-xl font-semibold'
                    >
                        {truncateText(post?.title, 140)}
                    </h2>
                    <h4
                        className='text-background/80 text-sm'
                    >
                        Date: {post?.date}
                    </h4>
                </div>

            </div>

            {/* main image */}
            <div
                className='w-full h-full'
            >
                <img 
                    className='w-full h-full rounded' 
                    src={post?.thumbnail} 
                    alt="thumbnail" 
                />
            </div>

        </div>
    )
}

export default HeroPostCard