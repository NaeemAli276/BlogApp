import React from 'react'
import { formatCompactNumber, truncateText } from '../../utils/textUtils'
import AuthorBtn from '../btns/AuthorBtn'
import { Link } from 'react-router-dom'

const VerticalPostCard = ({
    post
}) => {
    return (
        <div
            className='col-span-4 row-span-6 bg-background rounded shadow shadow-text/50 w-full h-full relative'
        >
            
            <img    
                src={post?.thumbnail} 
                alt="" 
                className='aspect-video h-1/2 w-full object-cover rounded-t'
            />

            <div className='w-full h-1/2 bg-black/10 absolute left-0 top-0'></div>

            <div
                className='absolute top-2/5 left-3 w-full h-fit z-50'
            >
                <AuthorBtn
                    author={post?.author}
                />
            </div>
            

            <div
                className='flex flex-col justify-between w-full h-1/2 p-3 '
            >
                <div
                    className='flex flex-col gap-2 w-full h-fit'
                >
                    <div
                        className='w-full h-fit flex flex-row items-center justify-between'
                    >
                        <span
                            className='bg-secondary w-fit text-primary px-2 p-0.5 rounded-full flex-row flex gap-1 items-center text-xs font-medium'
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={8} height={8} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20"></path></svg>
                            {post?.category}
                        </span>
                        <h3
                            className='text-text/80 text-xs flex-row flex gap-1 items-center'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                                <path d="M0 0h256v256H0z" fill="none" />
                                <path fill="currentColor" d="M208 34h-26V24a6 6 0 0 0-12 0v10H86V24a6 6 0 0 0-12 0v10H48a14 14 0 0 0-14 14v160a14 14 0 0 0 14 14h160a14 14 0 0 0 14-14V48a14 14 0 0 0-14-14M48 46h26v10a6 6 0 0 0 12 0V46h84v10a6 6 0 0 0 12 0V46h26a2 2 0 0 1 2 2v34H46V48a2 2 0 0 1 2-2m160 164H48a2 2 0 0 1-2-2V94h164v114a2 2 0 0 1-2 2m-70-78a10 10 0 1 1-10-10a10 10 0 0 1 10 10m44 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10m-88 40a10 10 0 1 1-10-10a10 10 0 0 1 10 10m44 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10m44 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10" stroke-width="2" stroke="currentColor" />
                            </svg>

                            {post?.date}
                        </h3>
                    </div>
                    <h3
                        className='text-text font-medium text-base/tight'
                    >

                        {truncateText(post?.title, 90)}
                    </h3>
                    <p
                        className='text-text/70 text-sm'
                    >
                        {truncateText(post?.excerpt, 200)}
                    </p>
                </div>
                <div
                    className='flex flex-row items-end justify-between w-full h-fit'
                >
                    <span
                        className='text-text/70 flex gap-1 items-center text-sm'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path></svg>
                        {formatCompactNumber(post?.view_count)}
                    </span>
                    <Link
                        className='w-fit flex h-fit items-center gap-2 text-sm text-text/80 hover:text-primary duration-200'
                        to={`/${post?.url}`}
                        state={{ post: post }}

                    >
                        View more
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16">
                            <path fill="currentColor" fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path>
                        </svg>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default VerticalPostCard