import React, { useEffect, useState, useSyncExternalStore } from 'react'
import RichTextViewer from '../PostPage/RichTextViewer'
import AuthorBtn from '../btns/AuthorBtn'
import Icon from '../../assets/Icon'
import { useAuth } from '../../context/AuthContext'
import RichTextCommentInput from './RichTextCommentInput'
import Reply from './Reply'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createReply, deleteReply, getCommentReplies, updateReply } from '../../apis/commentApi'
import NewReplyPlaceholder from './NewReplyPlaceholder'

const Comment = ({
    comment,
    handleDeleteComment,
    handleUpdateComment
}) => {

    const { user } = useAuth()

    const [content, setContent] = useState(comment?.content || '') // used for replacing text when updating
    const [replyContent, setReplyContent] = useState('')

    const [isEditActive, setIsEditActive] = useState(false)
    const [isDropdownActive, setIsDropdownActive] = useState(false)
    const [isReportActive, setIsReportActive] = useState(false)    
    const [isRepliesActive, setIsRepliesActive] = useState(false)
    const [isNewReplyActive, setIsNewReplyActive] = useState(false)

    const { isLoading, error, data } = useQuery({
        queryFn: () => getCommentReplies(comment?.id),
        queryKey: ['get_replies', comment?.id],
    })

    const queryClient = useQueryClient()

    const createReplyMutation = useMutation({
        mutationFn: createReply,
        mutationKey: ['create_reply'],
        onMutate: async (data) => {

            await queryClient.cancelQueries({ queryKey: ['get_replies', comment?.id] })

            const previousReplies = queryClient.getQueryData(['get_replies', comment?.id])

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

            queryClient.setQueryData(['get_replies', comment?.id], (old) => {
                return old ? [optimisticReply, ...old] : [optimisticReply]
            })

            return { previousReplies }

        },
        onSuccess: (data) => {

            queryClient.setQueryData(['get_replies', comment?.id], (old) => {

                // console.log(old)

                return old?.map(reply => 
                    reply?.id === `temp-${new Date().toLocaleDateString()}`
                    ?   { ...data, isOptimistic:false }
                    :   reply
                )
            })

            // console.log(data.data)
            setIsNewReplyActive(false)

        },
        onError: (error, variables, context) => {
            // Rollback to previous state on error
            if (context?.previousReplies) {
                queryClient.setQueryData(['get_replies', comment?.id], context.previousReplies);
            }
            console.error('Failed to add comment:', error);
        },
        onSettled: (data, error, variables, context) => {
            // Always refetch to ensure consistency
            queryClient.invalidateQueries({ queryKey: ['get_replies', comment?.id] });
        },
    })

    const deleteReplyMutation = useMutation({
        mutationFn: deleteReply,
        mutationKey: ['delete_reply'],
        onMutate: async (deletedId) => {
            if (comment?.id) return { previousReplies: [] };

            await queryClient.cancelQueries({ 
                queryKey: ['get_replies', comment?.id] 
            });

            // Get previous data with fallback
            const previousReplies = queryClient.getQueryData(['get_replies', comment?.id]) || [];

            // Update the cache with safety checks
            queryClient.setQueryData(['get_replies', comment?.id], (oldData) => {
                // If oldData is undefined or null, return empty array
                if (!oldData) return [];
                
                // Filter out the deleted post
                return oldData?.filter((reply) => reply?.id !== deletedId);
            });

            return { previousReplies };
        },

        onError: (error, deletedId, context) => {
            // Restore previous data
            if (comment?.id) {
                queryClient.setQueryData(
                    ['get_replies', comment?.id], 
                    context?.previousReplies || []
                );
            }
            console.error('Delete error:', error);
        },

        onSettled: () => {
            if (comment?.id) {
                queryClient.invalidateQueries({ 
                    queryKey: ['get_replies', comment?.id] 
                });
            }
        },

    })

    const updateReplyMutation = useMutation({
        mutationFn: updateReply,
        mutationKey: ['update_reply'],
        onSuccess: (updatedReplyFromServer) => {
            console.log('updated post from server: ', updatedReplyFromServer);

            queryClient.setQueryData(['get_replies', comment?.id], (oldData) => {
                
                console.log('old data: ', oldData)    

                return oldData?.map((reply) => 
                    reply?.id === updatedReplyFromServer?.id ? updatedReplyFromServer : reply
                )
            })

            // 2. Safely trigger a background refetch to ensure alignment with database
            queryClient.invalidateQueries({ queryKey: ['get_replies', comment?.id] });
        },  
        onError: (error) => {
            console.error('Update error:', error);
        }
    });

    const handleReplyChange = (contentHTML) => {
        setReplyContent(contentHTML)
    }

    const handleCloseCommentEditing = () => {
        setIsEditActive(false)
        setContent(comment?.content)
    }

    const handleToggleUpdatingComment = () => {
        setIsDropdownActive(false)
        setIsEditActive(true)
    }

    const handleUpdatingCommentProcess = () => {
        handleUpdateComment(comment?.id, content)
        setIsEditActive(false)
        setContent(content)
    }

    const handleCreateReply = () => {

        const reply = {
            comment_id: comment?.id,
            user_id: user?.id,
            content: replyContent
        }

        createReplyMutation.mutate(reply)

    }

    const handleDeleteReply = (id) => {
        deleteReplyMutation.mutate(id)
    }

    const handleToggleNewReply = () => {
        setIsNewReplyActive(true)
        setIsRepliesActive(true)
    }

    const handleCloseNewReply = () => {
        setReplyContent('')
        setIsNewReplyActive(false)
    }

    const handleUpdateReply = (id, content) => {

        const updatedReply = {
            id: id,
            content: content
        }

        updateReplyMutation.mutate(updatedReply)
    }

    const menuBtns = [
        {
            name: 'Delete',
            ftn: () => handleDeleteComment(comment?.id),
            icon:   <Icon type={'trash'} size='18'/>
        },
        {
            name: 'Edit',
            ftn: () => handleToggleUpdatingComment(),
            icon:   <Icon type={'edit'} size='18'/>
        },
        {
            name: 'Report',
            ftn: () => setIsReportActive(true),
            icon:   <Icon type={'alert'} size='18'/>,
        }
    ]

    return (
        <div
            className='flex flex-col gap-2 w-full h-fit'
        >
            
            {/* main comment */}
            <div
                className='w-full h-fit bg-accent/20 shadow shadow-text/10 p-3 pb-3.5 rounded flex flex-col gap-2 justify-between relative'
            >

                <div
                    className='flex flex-col gap-2 w-full h-fit'
                >
                    {/* profileImg, name and email and menu */}
                    <div
                        className='flex flex-row items-start justify-between w-full h-fit relative'
                    >
                        <AuthorBtn
                            author={comment?.user}
                            textTheme='dark'
                        />
                        <Icon
                            type={'menu'}
                            size='28'
                            className='rotate-90 hover:bg-text/10 rounded-full duration-200'
                            onClick={() => setIsDropdownActive(!isDropdownActive)}
                        />

                        <div
                            className={`${isDropdownActive ? 'flex' : 'hidden'} flex-col w-52 h-fit bg-background shadow shadow-text/20 absolute top-8 right-0 z-90 rounded`}
                        >
                            {
                                comment?.user?.id === user?.id
                                ?   <>
                                        <button
                                            className='flex flex-row items-center gap-2 w-full h-fit p-2 py-2.5 text-sm hover:bg-secondary/50 hover:text-primary rounded-t duration-200 cursor-pointer'
                                            onClick={menuBtns[1].ftn}
                                        >
                                            {menuBtns[1].icon}
                                            {menuBtns[1].name}
                                        </button>
                                        <button
                                            className='flex flex-row items-center gap-2 w-full h-fit p-2 py-2.5 text-sm hover:bg-rose-100/70 hover:text-rose-600 rounded-b duration-200 cursor-pointer'
                                            onClick={menuBtns[0].ftn}
                                        >
                                            {menuBtns[0].icon}
                                            {menuBtns[0].name}
                                        </button>
                                    </>
                                :   <>
                                        <button
                                            className='flex flex-row items-center gap-2 w-full h-fit p-2 py-2.5 text-sm hover:bg-secondary/50 hover:text-primary rounded duration-200 cursor-pointer'
                                            onClick={menuBtns[2].ftn}
                                        >
                                            {menuBtns[2].icon}
                                            {menuBtns[2].name}
                                        </button>
                                    </>
                            }
                        </div>

                    </div>

                    {
                        isEditActive
                        ?   <RichTextCommentInput
                                content={content}
                                handleChangeContent={handleReplyChange}
                            />
                        :   <RichTextViewer
                                content={content}
                                className='px-1 text-text/70 text-sm'
                            />
                    }

                    {
                        isEditActive
                        &&  <div
                                className='absolute bottom-1 right-0 p-1 px-2 flex flex-row gap-2'
                            >
                                <button
                                    className='bg-rose-200/70 text-rose-600 p-1 rounded cursor-pointer hover:bg-rose-500 hover:text-background duration-200'
                                    onClick={() => handleCloseCommentEditing()}
                                >
                                    <Icon
                                        type={'close'}
                                        size='20'
                                    />
                                </button>
                                <button
                                    className={`${content?.length <= 7 ? 'hidden' : 'flex'} bg-emerald-200/70 text-emerald-600 p-1 rounded cursor-pointer hover:bg-emerald-500 hover:text-background duration-200`}
                                    onClick={() => handleUpdatingCommentProcess()}
                                >
                                    <Icon
                                        type={'check'}
                                        size='20'
                                    />
                                </button>
                            </div>
                    }

                    <div
                        className={`${isEditActive ? 'hidden' : 'flex'} items-center gap-3 w-full h-fit px-1 mt-2`}
                    >
                        <button
                            className='items-center text-text/70 text-sm font-medium flex flex-row gap-1 hover:text-primary duration-200'
                            onClick={() => setIsRepliesActive(!isRepliesActive)}
                        >
                            Replies
                            <Icon
                                type={'chevron'}
                                className={`${isRepliesActive ? 'rotate-180' : 'rotate-0'} duration-200 text-text`}
                                size='18'
                            />
                        </button>
                        <button
                            className='items-center text-text/70 text-sm font-medium flex flex-row gap-1.5 hover:text-primary duration-200'
                            onClick={() => handleToggleNewReply()}
                        >
                            Reply
                            <Icon
                                type={'comments'}
                                className='text-text'
                                size='14'
                            />
                        </button>
                    </div>

                </div>

            </div>

            {/* replies */}
            <div
                className='flex flex-col gap-2 w-full h-fit'
            >
                {
                    (isNewReplyActive && user !== null) &&
                    <NewReplyPlaceholder
                        handleCloseNewReply={handleCloseNewReply}
                        handleReplyChange={handleReplyChange}
                        handleCreateReply={handleCreateReply}
                        content={replyContent}
                    />
                }
                {
                    isRepliesActive &&
                    data?.map((reply) => (
                        <Reply
                            key={reply?.id}
                            reply={reply}
                            handleDeleteReply={handleDeleteReply}
                            handleUpdateReply={handleUpdateReply}
                        />
                    ))
                }
            </div>
            
        </div>
    )
}

export default Comment