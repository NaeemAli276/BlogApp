import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import AuthorBtn from '../btns/AuthorBtn'
import RichTextCommentInput from '../PostPage/RichTextCommentInput'
import Icon from '../../assets/Icon'
import { createReply } from '../../apis/commentApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const NewReplyPlaceholder = ({
    commentId,
    handleToggleNewReply,
    setIsNewReplyActive
}) => {

    const { user } = useAuth()

    const [content, setContent] = useState('')

    const queryClient = useQueryClient()

    const createReplyMutation = useMutation({
        mutationFn: createReply,
        mutationKey: ['create_reply'],
        onMutate: async (data) => {

            await queryClient.cancelQueries({ queryKey: ['get_replies', commentId] })

            const previousReplies = queryClient.getQueryData(['get_replies', commentId])

            const optimisticReply = {
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

            // console.log(optimisticReply)

            // queryClient.setQueryData(['get_replies', commentId], (old) => {
            //     return old ? [optimisticReply, ...old] : [optimisticReply]
            // })

            return { previousReplies }

        },
        onSuccess: (data) => {

            queryClient.cancelQueries(['get_replies', commentId])

            queryClient.setQueryData(['get_replies', commentId], (old) => {

                // console.log(old)

                return old?.map(reply => 
                    reply?.id === `temp-${new Date().toLocaleDateString()}`
                    ?   { ...data, isOptimistic:false }
                    :   reply
                )
            })

            // console.log(data.data)
            setIsNewReplyActive(false)
            setContent('')

        },
        onError: (error, variables, context) => {
            // Rollback to previous state on error
            if (context?.previousReplies) {
                queryClient.setQueryData(['get_replies', commentId], context.previousReplies);
            }
            console.error('Failed to add comment:', error);
        },
        onSettled: (data, error, variables, context) => {
            // Always refetch to ensure consistency
            queryClient.invalidateQueries({ queryKey: ['get_replies', commentId] });
        },        
    })

    const handleCreateReply = () => {

        const reply = {
            comment_id: commentId,
            user_id: user?.id,
            content: content
        }

        createReplyMutation.mutate(reply)
    }

    const handleReplyChange = (html) => {
        setContent(html)
    }

    const handleCloseNewReply = () => {
        handleToggleNewReply()
        setContent('')
    }

    return (
        <div
            className='flex relative gap-2 w-full h-fit pl-6'
        >

            {/* corner/connection */}
            <Icon
                type={'corner'}
                className='rotate-270'
            />

            <div
                className='w-full bg-accent/20 shadow shadow-text/10 p-3 pb-2 rounded flex flex-col gap-2 justify-between relative'
            >
                <div
                    className='flex flex-col gap-2 w-full h-fit'
                >
                    {/* profileImg, name and email and menu */}
                    <div
                        className='flex flex-col gap-2.5 items-start justify-between w-full h-full'
                    >
                        <AuthorBtn
                            author={user}
                            textTheme='dark'
                        />
                        
                        <RichTextCommentInput
                            content={content}
                            handleChangeContent={handleReplyChange}
                        />

                        <div
                            className='absolute bottom-1 right-0 p-1 px-2 flex flex-row gap-2'
                        >
                            <button
                                className='bg-rose-200/70 text-rose-600 p-1 rounded cursor-pointer hover:bg-rose-500 hover:text-background duration-200'
                                onClick={() => handleCloseNewReply()}
                            >
                                <Icon
                                    type={'close'}
                                    size='20'
                                />
                            </button>
                            <button
                                className={`${content?.length <= 7 ? 'hidden' : 'flex'} bg-emerald-200/70 text-emerald-600 p-1 rounded cursor-pointer hover:bg-emerald-500 hover:text-background duration-200`}
                                onClick={() => handleCreateReply()}
                            >
                                <Icon
                                    type={'check'}
                                    size='20'
                                />
                            </button>
                        </div>

                    </div>                

                </div>
            </div>
        </div>
    )
}

export default NewReplyPlaceholder