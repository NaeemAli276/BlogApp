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
    const [newCommentContent, setNewCommentContent] = useState('')

    const { isLoading, error, data: commentsIds = [] } = useQuery({
        queryFn: () => getPostCommentsIds(selectedPostId),
        queryKey: ['get_comments_ids', selectedPostId],
        enabled: selectedPostId === null ? false : true
    })

    const queryClient = useQueryClient()

    const createCommentMutation = useMutation({
        mutationFn: createComment,
        mutationKey: ['create_comment'],
        onMutate: async (data) => {

            await queryClient.cancelQueries({ queryKey: ['get_comments_ids', selectedPostId] })

            const previousComments = queryClient.getQueryData(['get_comments_ids', selectedPostId])

            const optimisticComment = {
                id: new Date().toLocaleDateString(),
                user: {
                    id: user?.id,
                    username: user?.username,
                    profileImg: user?.profileImg,
                    email: user?.email
                },
                content: newCommentContent,
                isOptimistic: true
            }

            // console.log(optimisticComment)

            // queryClient.setQueryData(['get_comments_ids', selectedPostId], (old) => {
            //     return old ? [optimisticComment, ...old] : [optimisticComment]
            // })

            return { previousComments }

        },
        onSuccess: (data) => {

            queryClient.cancelQueries(['get_comments_ids', selectedPostId])

            queryClient.setQueryData(['get_comments_ids', selectedPostId], (old) => {

                // console.log(old)

                return old?.map(comment => 
                    comment?.id === `temp-${new Date().toLocaleDateString()}`
                    ?   { ...data, isOptimistic:false }
                    :   comment
                )
            })

            // console.log(data.data)
            setIsNewCommentActive(false)
            setNewCommentContent('')

        },
        onError: (error, variables, context) => {
            // Rollback to previous state on error
            if (context?.previousComments) {
                queryClient.setQueryData(['get_comments_ids', selectedPostId], context.previousComments);
            }
            console.error('Failed to add comment:', error);
        },
        onSettled: (data, error, variables, context) => {
            // Always refetch to ensure consistency
            queryClient.invalidateQueries({ queryKey: ['get_comments_ids', selectedPostId] });
        },        
    })

    const handleCreateComment = () => {

        const comment = {
            post_id: selectedPostId,
            user_id: user?.id,
            content: newCommentContent
        }

        createCommentMutation.mutate(comment)

    }

    const handleCommentChange = (html) => {
        setNewCommentContent(html)
    }

    const handleToggleNewComment = () => {
        if (isNewCommentActive) {
            setNewCommentContent('')
            setIsNewCommentActive(false)
        }
        else {
            setIsNewCommentActive(true)
        }
    }

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
                            onClick={() => handleToggleNewComment()}
                        > 
                            <Icon
                                type={'plus'}
                            />
                        </button>
                    </div>
                    <span className='w-full h-px bg-text/20'></span>
                </div>

                <div
                    className='flex flex-col gap-2 w-full h-fit overflow-y-scroll scrollbar-hide'
                >
                    {
                        isNewCommentActive &&
                        <NewCommentPlaceholder
                            content={newCommentContent}
                            handleCommentChange={handleCommentChange}
                            handleToggleNewComment={handleToggleNewComment}
                            handleCreateComment={() => handleCreateComment()}
                        />
                    }
                    {
                        commentsIds?.map((commentId) => (
                            <CommentContainer
                                key={commentId}
                                commentId={commentId}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }

}

export default CommentsHandlerContainer