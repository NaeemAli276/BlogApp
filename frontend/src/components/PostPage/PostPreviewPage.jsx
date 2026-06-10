import React from 'react'
import Layout from '../Layout/Layout'
import { useLocation } from 'react-router-dom'

const PostPreviewPage = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const post = location?.state?.post

    return (
        <Layout>
            <div
                className='flex flex-row gap-2 w-full h-full'
            >
                <ArticleContainer
                    post={post}
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

export default PostPreviewPage