import React from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import PostContentContainer from '../../components/PostsPage/PostContentContainer'
import PostHandlerContainer from '../../components/PostsPage/PostHandlerContainer'

const UserNewPost = ({  }) => {
    return (
        <DashboardLayout>

            {/* btns
            <div
                className='w-full h-full col-span-full row-span-1'
            >

            </div> */}

            <PostContentContainer/>

            <PostHandlerContainer/>

        </DashboardLayout>
    )
}

export default UserNewPost