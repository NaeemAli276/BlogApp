import React, { useState } from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import PostsViewer from '../../components/MyPostPage/PostsViewer'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../context/AuthContext'
import CommentsHandlerContainer from '../../components/CommentsPage/CommentsHandlerContainer'


const CommentsPage = () => {

    const { user } = useAuth()

    const { isLoading, error, data } = useQuery({
        queryFn: () => getMyPosts(user?.id),
        queryKey: ['get_my_posts', user?.id]
    })

    const [selectedPostId, setSelectedPostId] = useState(null)
    const [view, setView] = useState()

    const handlePostSelect = (id) => {
        setSelectedPostId(id)
    }

    return (
        <DashboardLayout>
            
            <PostsViewer
                posts={data}
                handlePostSelect={handlePostSelect}
            />

            <CommentsHandlerContainer
                selectedPostId={selectedPostId}
            />

        </DashboardLayout>
    )
}

export default CommentsPage