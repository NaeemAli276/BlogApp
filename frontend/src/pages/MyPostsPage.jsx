import React from 'react'
import DashboardLayout from '../components/layout/dashboard/DashboardLayout'
import UserPostsContainer from '../components/layout/PostPage/UserPostsContainer'

const MyPostsPage = () => {
    return (
        <DashboardLayout>
            
            {/* user posts */}
            <UserPostsContainer/>

        </DashboardLayout>
    )
}

export default MyPostsPage