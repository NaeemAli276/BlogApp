import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { useQuery } from '@tanstack/react-query'
import { getPostsFromCategory } from '../../apis/postApi'
import Icon from '../../assets/Icon'

const SimilarPostsContainer = ({
    category
}) => {

    const { isLoading, error, data } = useQuery({
        queryFn: () => getPostsFromCategory(category?.category_name),
        queryKey: ['posts_from_category', category?.category_name]
    })

    if (isLoading) {
        return (
            <div
                className='w-full h-80 bg-text/5 flex flex-col gap-3 px-1 rounded items-center justify-center shadow shadow-text/30'
            >
                <Icon
                    type={'spinner'}
                    className='text-text animate-spin'
                />
            </div>
        )
    }
    else if (error) {
        return (
            <div
                className='aspect-video rounded bg-text/5  items-center justify-center flex shadow shadow-text/30 flex-col gap-2 text-text/80 '
            >
                <Icon
                    type={'sad'}
                    className='text-text'
                    size='80'
                />
                <h3
                    className='w-3/5 text-center'
                >
                    An error has occured, please try reloading the page
                </h3>
            </div>
        )
    }
    else {
        return (
            <div
                className='w-full h-fit flex flex-col gap-3 px-1'
            >

                <h3
                    className='font-medium text-text text-xl '
                >
                    Related posts
                </h3>

                <div
                    className='flex flex-col gap-2 w-full h-full'
                >
                    {
                        data?.map((post) => (
                            <PostCard
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

export default SimilarPostsContainer