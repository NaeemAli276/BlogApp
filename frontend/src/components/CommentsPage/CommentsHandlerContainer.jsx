import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { createComment, updateComment, deleteComment, getPostCommentsIds } from '../../apis/commentApi'
import Icon from '../../assets/Icon'
import NewCommentPlaceholder from '../PostPage/NewCommentPlaceholder'
import { useAuth } from '../../context/AuthContext'
import CommentContainer from './CommentContainer'

const CommentsHandlerContainer = ({ 
    selectedPostId = null
}) => {

    const { user } = useAuth()

    const [isNewCommentActive, setIsNewCommentActive] = useState(false)

    const { isLoading, error, data: commentsIds = [] } = useQuery({
        queryFn: () => getPostCommentsIds(selectedPostId),
        queryKey: ['get_comments_ids', selectedPostId],
        enabled: selectedPostId === null ? false : true
    })

    if (isLoading) {
        return (
            <div
                className='w-full h-full col-span-10 row-span-full col-start-7 bg-background shadow shadow-text/20 rounded flex flex-col gap-2 items-center justify-center'
            >
                <Icon
                    type={'spinner'}
                    className='animate-spin text-text'
                />
            </div>
        )
    }
    if (error && selectedPostId !== null) {
        return (
            <div
                className='w-full h-full col-span-10 row-span-full col-start-7 bg-background shadow shadow-text/20 rounded flex flex-col gap-2 items-center justify-center'
            >
                <Icon
                    type={'sad'}
                    size='80'
                    className='text-text/70'
                />
                <h3
                    className='w-1/3 text-center'
                >
                    An error has occured, please try reloading the page
                </h3>
            </div>
        )
    }
    if (selectedPostId === null) {
        return (
            <div
                className='w-full h-full col-span-10 row-span-full col-start-7 bg-background shadow shadow-text/20 rounded flex flex-col gap-2 items-center justify-center'
            >
                <i
                    className='text-text/50'
                >
                    <Icon
                        type={'comments'}
                        size='80'
                    />
                </i>

                <div
                    className='flex flex-col gap-1 items-center justify-center text-center'
                >
                    <h2
                        className='font-medium text-xl'
                    >
                        No post selected
                    </h2>
                    <p
                        className='w-4/5 text-text/70'
                    >
                        Select a post to start creating, deleting or updating comments
                    </p>
                </div>
            </div>
        )
    }
    else {
        return (
            <div
                className='w-full h-full col-span-10 row-span-full col-start-7 bg-background shadow shadow-text/20 rounded flex flex-col gap-4 items-start justify-start p-5 py-4'
            >

                <div
                    className='flex flex-col gap-1 w-full h-fit'
                >
                    <div
                        className='w-full h-fit flex items-center justify-between '
                    >
                        <h1
                            className='text-text text-lg font-medium'
                        >
                            Comments
                        </h1>
                        <button
                            className='text-primary bg-secondary/30 rounded hover:bg-primary hover:text-background duration-200 cursor-pointer'
                        >
                            <Icon
                                type={'plus'}
                            />
                        </button>
                    </div>
                    <span className='w-full h-px bg-text/20'></span>
                </div>

                <div
                    className='flex flex-col gap-2 w-full h-fit'
                >
                    {
                        isNewCommentActive &&
                        <NewCommentPlaceholder/>
                    }
                    {
                        commentsIds.map((commentId) => (
                            <CommentContainer
                                comment={commentId}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }

}

export default CommentsHandlerContainer