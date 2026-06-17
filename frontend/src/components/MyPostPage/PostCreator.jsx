import React from 'react'
import PostContentContainer from '../../components/NewPostsPage/PostContentContainer'
import Icon from '../../assets/Icon'

const PostCreator = ({ 
    postView, 
    selectedPost = {}
}) => {
    
    switch(postView) {
        case(0): // empty state
            return (
                <div
                    className='w-full h-full col-span-10 row-span-full rounded bg-background shadow shadow-text/30 flex items-center justify-center flex-col gap-5 col-start-7'
                >
                    <Icon
                        type={'cardView'}
                        className='text-text/40'
                        size='xl'
                    />

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