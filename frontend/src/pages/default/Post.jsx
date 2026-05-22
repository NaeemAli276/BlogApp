import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import ArticleContainer from '../../components/PostPage/ArticleContainer'
import CommentsSection from '../../components/PostPage/CommentsSection'


const Post = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const post = location.state?.post

    useEffect(() => {
        console.log(post)
    }, [])

    return (
        <Layout>

            <div
                className='flex flex-row gap-2 w-full h-full'
            >
                <ArticleContainer
                    post={post}
                />

                <div
                    className='w-2/5 h-1/4 overflow-y-scroll pt-11 p-1'
                >
                    <CommentsSection/>
                </div>
            </div>

        </Layout>
        
    )
}

export default Post