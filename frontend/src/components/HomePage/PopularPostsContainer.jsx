import React from 'react'
import SmallPostCard from '../cards/SmallPostCard'
import { useQuery } from '@tanstack/react-query'
import { getPopularPosts } from '../../apis/postApi'

const PopularPostsContainer = ({}) => {

    const { isLoading, error, data } = useQuery({
        queryFn: getPopularPosts,
        queryKey: ['popular_posts']
    })

    if (isLoading) {
        return (
            <div
                className='w-full h-full col-span-4 row-span-full flex flex-col gap-4 bg-black/20 shadow shadow-text/50 rounded items-center justify-center text-text'
            >
                <svg className=' animate-spin text-text' xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0-16a2 2 0 1 0 0 4 2 2 0 1 0 0-4M7.76 19.07c-.78.78-2.05.78-2.83 0s-.78-2.05 0-2.83 2.05-.78 2.83 0 .78 2.05 0 2.83M19.07 7.76c-.78.78-2.05.78-2.83 0s-.78-2.05 0-2.83 2.05-.78 2.83 0 .78 2.05 0 2.83M4 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m16 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2M4.93 7.76c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0 .78 2.05 0 2.83-2.05.78-2.83 0m11.31 11.31c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0 .78 2.05 0 2.83-2.05.78-2.83 0"></path></svg>
                Loading
            </div>
        )
    }
    if (error) {
        return (
            <div
                className='aspect-video rounded bg-black/20 items-center justify-center flex shadow shadow-text/50 flex-col gap-2 text-text/80 col-span-4 row-span-full w-full h-full'
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 256 256">
                    <path fill="currentColor" d="M128 26a102 102 0 1 0 102 102A102.12 102.12 0 0 0 128 26m0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90M82 108a10 10 0 1 1 10 10a10 10 0 0 1-10-10m92 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10m-.81 65a6 6 0 0 1-10.38 6c-7.84-13.54-20.2-21-34.81-21s-27 7.46-34.81 21a6 6 0 0 1-5.2 3a5.9 5.9 0 0 1-3-.81a6 6 0 0 1-2.18-8.19c9.92-17.16 26.39-27 45.19-27s35.27 9.84 45.19 27"></path>
                </svg>
                <h3
                    className='w-4/5 text-center'
                >
                    An error has occured, please try reloading the page
                </h3>
            </div>
        )
    }
    else {
        return (
            <div
                className='w-full h-full col-span-4 row-span-full flex flex-col gap-4'
            >

                <h2
                    className='text-text font-medium text-xl/tight'
                >
                    Popular posts
                </h2>

                <div
                    className='flex flex-col gap-2 w-full h-full overflow-y-scroll scrollbar-hide p-1'
                >
                    {
                        data?.map((post) => (
                            <SmallPostCard
                                key={post.id}
                                post={post}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }

}

export default PopularPostsContainer