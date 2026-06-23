import React from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import ArticleContainer from '../../components/PostPage/ArticleContainer'
import CommentsSection from '../../components/PostPage/CommentsSection'
import SimilarPostsContainer from '../../components/PostPage/SimilarPostsContainer'
import { useEffect } from 'react'

const PreviewPage = () => {
    
    const location = useLocation()

    const post = location.state

    useEffect(() => {
        console.log(post)
    }, [post])
    
    return (
        <Layout>
            <div
                className='flex flex-row gap-2 w-full h-full'
            >
                <ArticleContainer
                    post={post}
                />

                <div
                    className='w-2/5 h-1/4 overflow-y-scroll pt-11 p-1 flex flex-col gap-8'
                >
                    <CommentsSection
                        comments={post?.comments}
                    />
                    <SimilarPostsContainer
                        category={post?.category}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default PreviewPage