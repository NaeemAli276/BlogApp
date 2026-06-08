import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import ArticleContainer from '../../components/PostPage/ArticleContainer'
import CommentsSection from '../../components/PostPage/CommentsSection'
import SimilarPostsContainer from '../../components/PostPage/SimilarPostsContainer'
import { useQuery } from '@tanstack/react-query'
import { getRequestedPost } from '../../apis/postApi'

const PostPage = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const post_id = location?.pathname.substring(7)

    const { isLoading, error, data } = useQuery({
        queryFn: () => getRequestedPost(post_id),
        queryKey: ['post_data', post_id]
    })


    useEffect(() => {
        console.log(data)
    }, [data])
    
    if (isLoading) {
        return (
            <Layout>
                <div
                    className='w-full h-[83vh] flex items-center justify-center flex-row gap-2 text-text'
                >
                    <svg className='animate-spin' xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0-16a2 2 0 1 0 0 4 2 2 0 1 0 0-4M7.76 19.07c-.78.78-2.05.78-2.83 0s-.78-2.05 0-2.83 2.05-.78 2.83 0 .78 2.05 0 2.83M19.07 7.76c-.78.78-2.05.78-2.83 0s-.78-2.05 0-2.83 2.05-.78 2.83 0 .78 2.05 0 2.83M4 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m16 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2M4.93 7.76c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0 .78 2.05 0 2.83-2.05.78-2.83 0m11.31 11.31c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0 .78 2.05 0 2.83-2.05.78-2.83 0"></path></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 256 256">
                        <path fill="currentColor" d="M128 26a102 102 0 1 0 102 102A102.12 102.12 0 0 0 128 26m0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90M82 108a10 10 0 1 1 10 10a10 10 0 0 1-10-10m92 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10m-.81 65a6 6 0 0 1-10.38 6c-7.84-13.54-20.2-21-34.81-21s-27 7.46-34.81 21a6 6 0 0 1-5.2 3a5.9 5.9 0 0 1-3-.81a6 6 0 0 1-2.18-8.19c9.92-17.16 26.39-27 45.19-27s35.27 9.84 45.19 27"></path>
                    </svg>
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
                        className='w-2/5 h-1/4 overflow-y-scroll pt-11 p-1 flex flex-col gap-4'
                    >
                        <CommentsSection/>
                        <SimilarPostsContainer/>
                    </div>
                </div>

            </Layout>
            
        )
    }

}

export default PostPage