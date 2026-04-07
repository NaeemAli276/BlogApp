import React from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import PostHandlerContainer from '../../components/NewPostPage/PostHandlerContainer'


const UserNewPost = ({  }) => {
    return (
        <DashboardLayout>

            {/* btns */}
            <div
                className='w-full h-full col-span-full row-span-1'
            >

            </div>

            <PostHandlerContainer/>

        </DashboardLayout>
    )
}

export default UserNewPost