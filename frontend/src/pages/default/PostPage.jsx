import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import ArticleContainer from '../../components/PostPage/ArticleContainer'
import CommentsSection from '../../components/PostPage/CommentsSection'
import SimilarPostsContainer from '../../components/PostPage/SimilarPostsContainer'
import { useQuery } from '@tanstack/react-query'
import { getRequestedPost } from '../../apis/postApi'
import Icon from '../../assets/Icon'

const PostPage = () => {

    const location = useLocation()
    const post_id = location?.pathname.substring(7)

    const { isLoading, error, data } = useQuery({
        queryFn: () => getRequestedPost(post_id),
        queryKey: ['post_data', post_id]
    })

    // useEffect(() => {
    //     console.log(data)
    // }, [data])
    
    if (isLoading) {
        return (
            <Layout>
                <div
                    className='w-full h-[83vh] flex items-center justify-center flex-row gap-2 text-text'
                >
                    <Icon
                        type={'spinner'}
                        // size='xs'
                        className='animate-spin'
                    />
                    Loading Post
                </div>
            </Layout>
        )
    }
    else if (error) {
        return (
            <Layout>
                <div
                    className='aspect-video rounded items-center justify-center flex flex-col gap-2 text-text/80 w-full h-[80vh] col-span-full row-span-10'
                >
                    <Icon
                        type={'sad'}
                        size='xl'
                    />
                    <h3
                        className='w-2/5 text-center'
                    >
                        An error has occured, either this link does not exist or it failed to retrieve the post, please try reloading the page
                    </h3>
                </div>
            </Layout>
        )
    }
    else if (data) {
        return (
            <Layout>

                <div
                    className='flex flex-row gap-2 w-full h-full'
                >
                    <ArticleContainer
                        post={data}
                    />

                    <div
                        className='w-2/5 h-1/4 overflow-y-scroll pt-11 p-1 flex flex-col gap-8'
                    >
                        <CommentsSection
                            comments={data?.comments}
                        />
                        <SimilarPostsContainer
                            category={data?.category}
                        />
                    </div>
                </div>

            </Layout>
            
        )
    }

}

export default PostPage