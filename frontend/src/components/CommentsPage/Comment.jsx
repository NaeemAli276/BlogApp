import React, { useEffect, useState } from 'react'
import Icon from '../../assets/Icon'
import AuthorBtn from '../btns/AuthorBtn'
import RichTextCommentInput from '../PostPage/RichTextCommentInput'
import RichTextViewer from '../PostPage/RichTextViewer'
import { useAuth } from '../../context/AuthContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteComment } from '../../apis/commentApi'

const Comment = ({
    comment,
    handleToggleNewReply,
    isRepliesActive,
    setIsRepliesActive
}) => {

    const { user } = useAuth()

    const [isEditActive, setIsEditActive] = useState(false)
    const [isDropdownActive, setIsDropdownActive] = useState(false)

    const [content, setContent] = useState(comment?.content || '')

    const queryClient = useQueryClient()

    const deleteCommentMutation = useMutation({
        mutationKey: ['delete_comment'],
        mutationFn: deleteComment,
        onMutate: async (deletedId) => {
            if (comment?.id) return { originalComment: {} };

            await queryClient.cancelQueries({ 
                queryKey: ['get_comments_ids', comment?.post_id] 
            });

            // Get previous data with fallback
            const originalComment = queryClient.getQueryData(['get_comments_ids', comment?.post_id]) || {};

            // Update the cache with safety checks
            queryClient.setQueryData(['get_comments_ids', comment?.post_id], (oldData) => {
                // If oldData is undefined or null, return empty array
                if (!oldData) return [];
                
                // Filter out the deleted post
                return oldData?.filter((comment) => comment?.id !== deletedId);
            });

            return { originalComment };
        },

        onError: (error, deletedId, context) => {
            // Restore previous data
            if (comment?.id) {
                queryClient.setQueryData(
                    ['get_comments_ids', comment?.post_id], 
                    context?.originalComment || {}
                );
            }
            console.error('Delete error:', error);
        },

        onSettled: () => {
            if (comment?.id) {
                queryClient.invalidateQueries({ 
                    queryKey: ['get_comments_ids', comment?.post_id] 
                });
            }
        },

    })

    const handleDeleteComment = () => {
        deleteCommentMutation.mutate(comment?.id)
        console.log('this ran')
    }

    const handleCommentChange = (content) => {
        setContent(content)
    }

    const handlesStartEditing = () => {
        setIsEditActive(true)
    }

    const handleCloseEditing = () => {
        setIsEditActive(false)
        setContent(comment?.content)
    }

    const menuBtns = [
        {
            name: 'Edit',
            ftn: () => handlesStartEditing(),
            icon:   <Icon type={'edit'} size='18'/>
        },
        {
            name: 'Report',
            ftn: () => setIsReportActive(true),
            icon:   <Icon type={'alert'} size='18'/>,
        },
        {
            name: 'Delete',
            ftn: () => handleDeleteComment(),
            icon:   <Icon type={'trash'} size='18'/>
        },
    ]

    useEffect(() => {
        console.log(comment?.id)
    }, [comment])

    // useEffect(() => {
    //     setContent(comment?.content)
    // }, [comment])

    return (
        <div
            className='w-full h-fit bg-accent/20 shadow shadow-text/10 p-3 pb-3.5 rounded flex flex-col gap-2 justify-between relative'        
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
                                    onClick={menuBtns[0].ftn}
                                >
                                    {menuBtns[0].icon}
                                    {menuBtns[0].name}
                                </button>
                                <button
                                    className='flex flex-row items-center gap-2 w-full h-fit p-2 py-2.5 text-sm hover:bg-rose-100/70 hover:text-rose-600 rounded-b duration-200 cursor-pointer'
                                    onClick={menuBtns[2].ftn}
                                >
                                    {menuBtns[2].icon}
                                    {menuBtns[2].name}
                                </button>
                            </>
                        :   <>
                                <button
                                    className='flex flex-row items-center gap-2 w-full h-fit p-2 py-2.5 text-sm hover:bg-secondary/50 hover:text-primary rounded duration-200 cursor-pointer'
                                    onClick={menuBtns[1].ftn}
                                >
                                    {menuBtns[1].icon}
                                    {menuBtns[1].name}
                                </button>
                            </>
                    }
                </div>

            </div>

            {
                isEditActive
                ?   <RichTextCommentInput
                        content={content}
                        handleChangeContent={handleCommentChange}
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
    )
}

export default Comment