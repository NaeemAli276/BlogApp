import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import Toolbar from '../btns/Toolbar'
import RichTextInput from '../inputs/RichTextInput'
import Icon from '../../assets/Icon'
import { useLocation } from 'react-router-dom'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { createComment, deleteComment, getPostComments, updateComment } from '../../apis/commentApi'
import { useAuth } from '../../context/AuthContext'
import NewCommentPlaceholder from './NewCommentPlaceholder'

const CommentsSection = ({
    post_id
}) => {

    const { user } = useAuth()

    const location = useLocation()

    const [isNewCommentActive, setIsNewCommentActive] = useState(false)
    const [content, setContent] = useState('')

    const { isLoading, error, data: comments = [] } = useQuery({
        queryFn: () => getPostComments(post_id),
        queryKey: ['get_comments_for_post', post_id]
    })

    const queryClient = useQueryClient()

    const createCommentMutation = useMutation({
        mutationFn: createComment,
        mutationKey: ['create_comment'],
        onMutate: async (data) => {

            await queryClient.cancelQueries({ queryKey: ['get_comments_for_post', post_id] })

            const previousComments = queryClient.getQueryData(['get_comments_for_post', post_id])

            const optimisticComment = {
                id: new Date().toLocaleDateString(),
                user: {
                    id: user?.id,
                    username: user?.username,
                    profileImg: user?.profileImg,
                    email: user?.email
                },
                content: content,
                isOptimistic: true
            }

            queryClient.setQueryData(['get_comments_for_post', post_id], (old) => {
                return old ? [optimisticComment, ...old] : [optimisticComment]
            })

            return { previousComments }

        },
        onSuccess: (data) => {

            queryClient.setQueryData(['get_comments_for_post', post_id], (old) => {

                // console.log(old)

                return old?.map(comment => 
                    comment?.id === `temp-${new Date().toLocaleDateString()}`
                    ?   { ...data, isOptimistic:false }
                    :   comment
                )
            })

            // console.log(data.data)
            setIsNewCommentActive(false)

        },
        onError: (error, variables, context) => {
            // Rollback to previous state on error
            if (context?.previousComments) {
                queryClient.setQueryData(['get_comments_for_post', post_id], context.previousComments);
            }
            console.error('Failed to add comment:', error);
        },
        onSettled: (data, error, variables, context) => {
            // Always refetch to ensure consistency
            queryClient.invalidateQueries({ queryKey: ['get_comments_for_post', post_id] });
        },
    })

    const deleteCommentMutation = useMutation({
        mutationFn: deleteComment,
        mutationKey: ['delete_comment'],
        onMutate: async (deletedId) => {
            if (post_id) return { previousComments: [] };

            await queryClient.cancelQueries({ 
                queryKey: ['get_comments_for_post', post_id] 
            });

            // Get previous data with fallback
            const previousComments = queryClient.getQueryData(['get_comments_for_post', post_id]) || [];

            // Update the cache with safety checks
            queryClient.setQueryData(['get_comments_for_post', post_id], (oldData) => {
                // If oldData is undefined or null, return empty array
                if (!oldData) return [];
                
                // Filter out the deleted post
                return oldData?.filter((comment) => comment?.id !== deletedId);
            });

            return { previousComments };
        },

        onError: (error, deletedId, context) => {
            // Restore previous data
            if (post_id) {
                queryClient.setQueryData(
                    ['get_comments_for_post', post_id], 
                    context?.previousComments || []
                );
            }
            console.error('Delete error:', error);
        },

        onSettled: () => {
            if (post_id) {
                queryClient.invalidateQueries({ 
                    queryKey: ['get_comments_for_post', post_id] 
                });
            }
        },

    })

    const updateCommentMutation = useMutation({
        mutationFn: updateComment,
        mutationKey: ['update_comment'],
        onSuccess: (updatedCommentFromServer) => {
            console.log('updated post from server: ', updatedCommentFromServer);

            queryClient.setQueryData(['get_comments_for_post', post_id], (oldData) => {
                
                console.log('old data: ', oldData)    

                return oldData?.map((comment) => 
                    comment?.id === updatedCommentFromServer?.id ? updatedCommentFromServer : comment 
                )
            })

            // 2. Safely trigger a background refetch to ensure alignment with database
            queryClient.invalidateQueries({ queryKey: ['get_comments_for_post', post_id] });
        },  
        onError: (error) => {
            console.error('Update error:', error);
        }
    });

    const handleCommentChange = (contentHTML) => {
        setContent(contentHTML)
    }

    const handleCreateComment = () => {

        const comment = {
            post_id: post_id,
            user_id: user?.id,
            content: content
        }

        createCommentMutation.mutate(comment)
    }

    const handleDeleteComment = (id) => {
        deleteCommentMutation.mutate(id)
    }

    const handleUpdateComment = (id, content) => {

        const updatedComment = {
            id: id,
            content: content
        }

        updateCommentMutation.mutate(updatedComment)
    }

    if (isLoading) {
        return (
            <div
                className='w-full min-h-80 h-full rounded text-text p-4 flex items-center justify-center bg-black/5 shadow shadow-text/20'
            >
                <Icon
                    type={'spinner'}
                    className='animate-spin'
                />
            </div>
        )
    }
    if (error) {
        return (
            <div
                className='w-full min-h-56 h-full rounded text-text p-4 flex items-center justify-center bg-black/5 shadow shadow-text/20 flex-col'
            >
                <Icon
                    type={'sad'}
                    className='text-text'
                    size='80'
                />
                <h3
                    className='w-3/5 text-center text-text/80'
                >
                    An error has occured, please try reloading the page
                </h3>
            </div>
        )
    }
    else {
        return (
            <div
                className='w-full h-full rounded text-text p-4 flex flex-col gap-3 bg-background shadow shadow-text/20 '
            >

                {/* <span className='w-full h-px bg-primary/70'></span> */}

                <div
                    className='w-full h-fit flex flex-row items-start justify-between'
                >
                    <h2
                        className='font-medium text-lg/tight'
                    >
                        Comments
                    </h2>
                    <button
                        className={`${user !== null ? 'flex' : 'hidden'} bg-secondary/50 text-primary hover:bg-primary hover:text-background duration-200 rounded cursor-pointer`}
                        onClick={() => setIsNewCommentActive(true)}
                    >
                        <Icon
                            type={'plus'}
                        />
                    </button>
                </div>

                <div
                    className='flex flex-col gap-3 w-full h-full max-h-96 overflow-y-scroll p-0.5 scrollbar-hide'
                >
                    {
                        isNewCommentActive && user !== null
                        &&  <NewCommentPlaceholder
                                setIsNewCommentActive={setIsNewCommentActive}
                                handleCommentChange={handleCommentChange}
                                handleCreateComment={handleCreateComment}
                                content={content}
                            />
                    }
                    {
                        comments?.length <= 0 && isNewCommentActive === false
                        ?   <div
                                className='flex flex-col gap-5 items-center justify-center w-full h-80 bg-black/5 rounded'
                            >   
                                <Icon
                                    type={'comments'}
                                    pack=''
                                    size='80'
                                    className='text-text/70'
                                />
                                <div
                                    className='flex flex-col gap-0 items-center justify-center w-fit h-fit text-center'
                                >   
                                    <h2
                                        className='text-xl font-medium'
                                    >
                                        No comments
                                    </h2>
                                    <h3
                                        className='text-text/70 text-sm w-3/4'
                                    >   
                                        There are no comments for this post, be the first one to comment
                                    </h3>
                                </div>
                            </div>  
                        :   comments?.map((comment) => (
                                <Comment
                                    key={comment?.id}
                                    comment={comment}
                                    handleDeleteComment={handleDeleteComment}
                                    handleUpdateComment={handleUpdateComment}
                                />
                            ))
                    }
                </div>

            </div>
        )
    }
}

export default CommentsSection