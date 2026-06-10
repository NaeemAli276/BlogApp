import React, { useEffect } from 'react'
import defaultUserImg from '../../assets/user.png'
import AuthorBtn from '../btns/AuthorBtn'
import { formatDate, truncateText } from '../../utils/textUtils'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getPopularPosts } from '../../apis/postApi'

const SmallPostCard = ({
    post
}) => {

    const navigate = useNavigate()

    return (
        <div
            className='w-full h-fit relative aspect-video shadow shadow-text/50 rounded cursor-pointer'
            onClick={() => navigate(`/${post?.url}`, { state: post })}
        >

            <div
                className='absolute top-0 left-0 bg-black/30 z-10 w-full h-full rounded flex flex-col items-start justify-between p-3'
            >

                <div
                    className='w-full h-fit flex flex-row items-start justify-between'
                >
                    <AuthorBtn
                        author={post?.author}
                    />
                    <h3
                        className='text-background/80 text-xs font-medium flex-row flex gap-1 items-center'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                            <path d="M0 0h256v256H0z" fill="none" />
                            <path fill="currentColor" d="M208 34h-26V24a6 6 0 0 0-12 0v10H86V24a6 6 0 0 0-12 0v10H48a14 14 0 0 0-14 14v160a14 14 0 0 0 14 14h160a14 14 0 0 0 14-14V48a14 14 0 0 0-14-14M48 46h26v10a6 6 0 0 0 12 0V46h84v10a6 6 0 0 0 12 0V46h26a2 2 0 0 1 2 2v34H46V48a2 2 0 0 1 2-2m160 164H48a2 2 0 0 1-2-2V94h164v114a2 2 0 0 1-2 2m-70-78a10 10 0 1 1-10-10a10 10 0 0 1 10 10m44 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10m-88 40a10 10 0 1 1-10-10a10 10 0 0 1 10 10m44 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10m44 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10" stroke-width="2" stroke="currentColor" />
                        </svg>

                        {formatDate(post?.date)}
                    </h3>
                </div>
                

                {/* details */}
                <div
                    className='flex flex-col gap-4 w-full h-fit'
                >

                    {/* category and title */}
                    <div
                        className='flex flex-col-reverse gap-2 w-full h-fit'
                    >
                        <h3
                            className='text-background font-semibold'
                        >
                            {truncateText(post?.title, 120)}
                        </h3>
                        <span
                            className='text-xs text-primary font-medium bg-secondary w-fit px-2 p-1 flex gap-1 items-center rounded-full'
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={8} height={8} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20"></path></svg>
                            {post?.category}
                        </span>
                    </div>

                </div>

            </div>

            <img 
                src={post?.thumbnail} 
                alt="" 
                className='rounded z-0'
            />

        </div>
    )
}

export default SmallPostCard