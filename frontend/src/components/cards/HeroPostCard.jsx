import React, { useEffect, useState } from 'react'
import { formatDate, truncateText } from '../../utils/textUtils'
import { useNavigate } from 'react-router-dom'
import AuthorBtn from '../btns/AuthorBtn'
import { useQuery } from '@tanstack/react-query'
import { getMostPopularPost } from '../../apis/postApi'

const HeroPostCard = ({

}) => {

    const { isLoading, error, data } = useQuery({
        queryFn: getMostPopularPost,
        queryKey: ['most_popular_post']
    })

    const navigate = useNavigate()

    

    if (isLoading) {
        return (
            <div
                className='shadow shadow-text/50  aspect-video rounded bg-black/20 items-center justify-center flex'
            >
                <svg className=' animate-spin text-background' xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0-16a2 2 0 1 0 0 4 2 2 0 1 0 0-4M7.76 19.07c-.78.78-2.05.78-2.83 0s-.78-2.05 0-2.83 2.05-.78 2.83 0 .78 2.05 0 2.83M19.07 7.76c-.78.78-2.05.78-2.83 0s-.78-2.05 0-2.83 2.05-.78 2.83 0 .78 2.05 0 2.83M4 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m16 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2M4.93 7.76c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0 .78 2.05 0 2.83-2.05.78-2.83 0m11.31 11.31c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0 .78 2.05 0 2.83-2.05.78-2.83 0"></path></svg>
            </div>
        )
    }
    if (error) {
        return (
            <div
                className='aspect-video rounded bg-black/20 items-center justify-center flex shadow shadow-text/50 flex-col gap-2 text-text/80 '
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 256 256">
                    <path fill="currentColor" d="M128 26a102 102 0 1 0 102 102A102.12 102.12 0 0 0 128 26m0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90M82 108a10 10 0 1 1 10 10a10 10 0 0 1-10-10m92 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10m-.81 65a6 6 0 0 1-10.38 6c-7.84-13.54-20.2-21-34.81-21s-27 7.46-34.81 21a6 6 0 0 1-5.2 3a5.9 5.9 0 0 1-3-.81a6 6 0 0 1-2.18-8.19c9.92-17.16 26.39-27 45.19-27s35.27 9.84 45.19 27"></path>
                </svg>
                <h3
                    className='w-1/3 text-center'
                >
                    An error has occured, please try reloading the page
                </h3>
            </div>
        )
    }
    else {
        return (
            <div
                className='aspect-video relative shadow shadow-text/50 rounded cursor-pointer'
                onClick={() => navigate(`/posts/${data?.id}`)}
            >

                {/* author */}
                <div
                    className='absolute top-0 left-0 py-4 p-5 w-full h-fit'
                >
                    
                    <AuthorBtn
                        author={data?.author}
                    />

                </div>

                {/* overlay */}
                <div 
                    className='w-full h-3/10 bg-black/50 rounded-b z-10 absolute bottom-0 left-0 flex flex-col gap-2 p-5 py-4 text-background'
                >
                    
                    <span
                        className='bg-secondary w-fit text-primary px-2 p-0.5 rounded-full flex-row flex gap-1 items-center text-sm font-medium'
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={8} height={8} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20"></path></svg>
                        {data?.category}
                    </span>

                    {/* title */}
                    <div
                        className='flex flex-col justify-between w-full h-full'
                    >
                        <h2
                            className='text-xl font-semibold'
                        >
                            {truncateText(data?.title, 140)}
                        </h2>
                        <h4
                            className='text-background/80 text-sm flex gap-1 items-center'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                                <path d="M0 0h256v256H0z" fill="none" />
                                <path fill="currentColor" d="M208 34h-26V24a6 6 0 0 0-12 0v10H86V24a6 6 0 0 0-12 0v10H48a14 14 0 0 0-14 14v160a14 14 0 0 0 14 14h160a14 14 0 0 0 14-14V48a14 14 0 0 0-14-14M48 46h26v10a6 6 0 0 0 12 0V46h84v10a6 6 0 0 0 12 0V46h26a2 2 0 0 1 2 2v34H46V48a2 2 0 0 1 2-2m160 164H48a2 2 0 0 1-2-2V94h164v114a2 2 0 0 1-2 2m-70-78a10 10 0 1 1-10-10a10 10 0 0 1 10 10m44 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10m-88 40a10 10 0 1 1-10-10a10 10 0 0 1 10 10m44 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10m44 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10" stroke-width="2" stroke="currentColor" />
                            </svg>
                            {formatDate(data?.date)}
                        </h4>
                    </div>

                </div>

                {/* main image */}
                <div
                    className='w-full h-full'
                >
                    <img 
                        className='w-full h-full rounded' 
                        src={data?.thumbnail} 
                        alt="thumbnail" 
                    />
                </div>

            </div>
        )
    }

}

export default HeroPostCard