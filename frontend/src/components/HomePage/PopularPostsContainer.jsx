import React from 'react'
import SmallPostCard from '../cards/SmallPostCard'
import { useQuery } from '@tanstack/react-query'
import { getPopularPosts } from '../../apis/postApi'
import Icon from '../../assets/Icon'

const PopularPostsContainer = ({}) => {

    const { isLoading, error, data } = useQuery({
        queryFn: getPopularPosts,
        queryKey: ['popular_posts']
    })

    if (isLoading) {
        return (
            <div
                className='w-full h-full col-span-4 row-span-full flex flex-col gap-4 bg-black/20 shadow shadow-text/50 rounded items-center justify-center '
            >
                <Icon
                    type={'spinner'}
                    className='text-text animate-spin'
                />
            </div>
        )
    }
    if (error) {
        return (
            <div
                className='aspect-video rounded bg-black/20 items-center justify-center flex shadow shadow-text/50 flex-col gap-2 text-text/80 col-span-4 row-span-full w-full h-full'
            >
                <Icon
                    type={'sad'}
                    className='text-text'
                    size='80'
                />
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