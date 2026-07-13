import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPostsFromCategory } from '../../apis/postApi'
import Icon from '../../assets/Icon'
import SmallPostCard from '../cards/SmallPostCard'
import ExplorePostCard from '../cards/ExplorePostCard'

const CategoryContainer = ({
    category
}) => {

    const { isLoading, error, data: posts = [] } = useQuery({
        queryKey: ['get_posts_by_category', category],
        queryFn: () => getPostsFromCategory(category)
    })

    if (isLoading) {
        return (
            <div
                className='w-full min-h-80 bg-background shadow shadow-text/20 rounded flex items-center justify-center'
            >
                <Icon
                    type={'spinner'}
                />
            </div>
        )
    }
    if (error) {
        return (
            <div
                className='w-full min-h-80 bg-background shadow shadow-text/20 rounded flex items-center justify-center'
            >
                <Icon
                    type={'sad'}
                />
                <h2>
                    Failed to posts, try reload the page
                </h2>
            </div>
        )
    }
    else {
        return (
            <div
                className={`w-full h-fit flex flex-col gap-1 ${posts.length <= 0 ? 'hidden' : 'flex'}`}
            >

                <h2
                    className='text-lg font-medium text-text'
                >
                    {category}
                </h2>

                <div
                    className='flex flex-row items-center gap-2 w-full h-56 overflow-x-scroll'
                >
                    {
                        posts?.map((post) => (
                            <ExplorePostCard
                                post={post}
                            />
                        ))
                    }
                </div>

            </div>
        )
    }

}

export default CategoryContainer