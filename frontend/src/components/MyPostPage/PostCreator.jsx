import React from 'react'
import PostContentContainer from '../../components/NewPostsPage/PostContentContainer'

const PostCreator = ({ 
    postView, 
    selectedPost = {}
}) => {
    
    switch(postView) {
        case(0): // empty state
            return (
                <div
                    className='w-full h-full col-span-10 row-span-12 rounded bg-background shadow shadow-text/30 flex items-center justify-center flex-col gap-5'
                >
                    <svg
                        className='text-text/40'
                        xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 256 256">
                        <path fill="currentColor" d="M200 88v112a16 16 0 0 1-16 16H40a16 16 0 0 1-16-16V88a16 16 0 0 1 16-16h144a16 16 0 0 1 16 16m16-48H64a8 8 0 0 0 0 16h152v120a8 8 0 0 0 16 0V56a16 16 0 0 0-16-16"></path>
                    </svg>

                    <div
                        className='flex flex-col gap-0.5 w-fit h-fit items-center justify-center'
                    >
                        <h2
                            className='text-text/70 text-lg font-medium'
                        >
                            No option has been selected
                        </h2>
                        <h3
                            className='text-center text-sm text-text/60 w-80'
                        >
                            Select a post to edit it, or click the plus button to create a new post.
                        </h3>
                    </div>

                </div>
            )
        case(1): // new post
            return (
                <PostContentContainer
                    selectedPost={selectedPost}
                    isNewPost={true}
                />
            )
        case(2): // updating post
            return (
                <PostContentContainer
                    selectedPost={selectedPost}
                    isNewPost={false}
                />
            )
    }

}

export default PostCreator