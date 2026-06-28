import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import Toolbar from '../btns/Toolbar'
import RichTextInput from '../inputs/RichTextInput'
import Icon from '../../assets/Icon'
import { useLocation } from 'react-router-dom'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { createComment, getPostComments } from '../../apis/commentApi'
import { useAuth } from '../../context/AuthContext'

const CommentsSection = ({
    post_id
}) => {

    const { user } = useAuth()

    const location = useLocation()

    // const [comments, setComments] = useState([
    //     {
    //         username: 'John Doe',
    //         profileImg: null,
    //         email: 'johnDoe@example.com',
    //         content: 'Lorem ipsum dolor sit <b>amet consectetur adipisicing elit.</b> Eveniet magnam hic, facere amet, id qui sunt aspernatur architecto eum pariatur quam tenetur aut molestias quis quasi quibusdam. Fugit, est fugiat.',
    //         time: ''

    //     },
    //     {
    //         username: 'Jane Doe',
    //         profileImg: null,
    //         email: 'JaneDoe@example.com',
    //         content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet magnam hic, facere amet, id qui sunt aspernatur architecto eum pariatur quam tenetur aut molestias quis quasi quibusdam. Fugit, est fugiat.',
    //         time: ''

    //     },
    //     {
    //         username: 'Bob Smith',
    //         profileImg: null,
    //         email: 'BobSmith@example.com',
    //         content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet magnam hic, facere amet, id qui sunt aspernatur architecto eum pariatur quam tenetur aut molestias quis quasi quibusdam. Fugit, est fugiat.',
    //         time: ''

    //     },
    //     {
    //         username: 'Generic Username',
    //         profileImg: null,
    //         email: 'genericUsername@example.com',
    //         content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet magnam hic, facere amet, id qui sunt aspernatur architecto eum pariatur quam tenetur aut molestias quis quasi quibusdam. Fugit, est fugiat.',
    //         time: ''

    //     },
    // ])
    const [comment, setComment] = useState(``) // the users new comment

    const handleCommentChange = (contentHTML) => {
        setComment(contentHTML)
    }

    const { isLoading, error, data: comments = [] } = useQuery({
        queryFn: () => getPostComments(post_id),
        queryKey: ['get_comments_for_post', post_id]
    })

    const queryClient = useQueryClient()

    const createPostMutation = useMutation({
        mutationFn: createComment,
        mutationKey: ['create_comment'],
        onMutate: async (data) => {

            await queryClient.cancelQueries({ queryKey: ['get_comments_for_post', post_id] })

            const previousComments = queryClient.getQueryData(['get_comments_for_post', post_id])

            const optimisticComment = {
                id: new Date().toLocaleDateString(),
                user: user,
                content: comment,
                isOptimistic: true
            }

            queryClient.setQueryData(['get_comments_for_post', post_id], (old) => {
                return old ? [optimisticComment, ...old] : [optimisticComment]
            })

            return { previousComments }

        },
        onSuccess: (data) => {

            queryClient.setQueryData(['get_comments_for_post', post_id], (old) => {

                console.log(old)

                return old?.map(comment => 
                    comment?.id === `temp-${new Date().toLocaleDateString()}`
                    ?   { ...data, isOptimistic:false }
                    :   comment
                )
            })

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

    // useEffect(() => {
    //     console.log(data)
    // }, [data])


    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    const handleCreateComment = () => {
            
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
                className='w-full h-full rounded text-text p-4 flex flex-col gap-4 relative bg-background shadow shadow-text/20 '
            >

                {/* reply */}
                <div
                    className='w-full h-fit bg-background relative rounded pb-2 overflow-y-hidden'
                >
                    <RichTextInput
                        hiddenComm={['headings', 'align', 'code', 'lists']}
                        className='w-full h-full outline-none p-2 text-clip flex-1 min-h-32 max-h-64 overflow-y-scroll scrollbar-hide'
                        wordLimit={1024}
                        content={comment}
                        handleChangeContent={handleCommentChange}
                        enabled={location.pathname.includes('preview') ? false : true}
                    />
                    {/* submit btn */}
                    <button
                        className={`
                            ${comment?.length <= 0 ? 'hidden' : 'flex'} 
                            p-1 bg-secondary/50 text-primary 
                            duration-200
                            hover:bg-primary hover:text-background rounded-xs
                            absolute bottom-4.5 right-2.5 z-50 cursor-pointer
                        `}
                    >   
                        <Icon
                            type={'logo'}
                            size='20'
                        />
                    </button>
                </div>

                <span className='w-full h-px bg-primary/70'></span>

                <h2
                    className='font-medium text-lg'
                >
                    Comments
                </h2>

                <div
                    className='flex flex-col gap-3 w-full h-full max-h-84 overflow-y-scroll p-0.5 scrollbar-hide'
                >
                    {

                        comments?.length <= 0 
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
                                />
                            ))
                    }
                </div>

            </div>
        )
    }
}

export default CommentsSection