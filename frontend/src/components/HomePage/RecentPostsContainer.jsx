import React from 'react'
import VerticalPostCard from '../cards/VerticalPostCard'
import { useQuery } from '@tanstack/react-query'
import { getMostRecentPosts } from '../../apis/postApi'
import Icon from '../../assets/Icon'

const RecentPostsContainer = () => {
    
    const { isLoading, error, data } = useQuery({
        queryFn: getMostRecentPosts,
        queryKey: ['recent_posts'],
        refetchInterval: 10000
    })

    if (isLoading) {
        return (
            <div
                className='w-full h-full col-span-full row-span-8 aspect-video rounded bg-black/20 items-center justify-center flex shadow shadow-text/50 '
            >
                <Icon
                    type={'spinner'}
                    className='animate-spin text-text'
                />
            </div>
        )
    }
    else if (error !== null) {
        return (
            <div
                className='aspect-video rounded bg-black/20 items-center justify-center flex shadow shadow-text/50 flex-col gap-2 text-text/80 w-full h-full col-span-full row-span-10'
            >
                <Icon
                    type={'sad'}
                    className='text-text'
                    size='80'
                />
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
                className='col-span-full gap-4 row-span-10 w-full h-full grid-cols-12 grid-rows-12 grid'
            >
                {
                    data?.map((post) => (
                        <VerticalPostCard
                            key={post.id}
                            post={post}
                        />
                    ))
                }
            </div>
        )
    }

}

export default RecentPostsContainer