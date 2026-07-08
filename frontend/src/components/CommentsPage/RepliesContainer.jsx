import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { createReply, getCommentReplies, getRepliesIds } from '../../apis/commentApi'
import Icon from '../../assets/Icon'
import Reply from '../CommentsPage/Reply'
import NewReplyPlaceholder from './NewReplyPlaceholder'
import { useAuth } from '../../context/AuthContext'

const RepliesContainer = ({
    isRepliesActive,
    commentId,
    isNewReplyActive,
    handleToggleNewReply,
    setIsNewReplyActive
}) => {

    const { isLoading, error, data: replies = [] } = useQuery({
        queryFn: () => getCommentReplies(commentId),
        queryKey: ['get_replies', commentId]
    })

    // useEffect(() => {
    //     console.log(replyIds)
    // }, [replyIds])

    if (isLoading) {
        return (
            <div
                className='p-0.5 pl-20'
            >
                <div
                    className='w-full min-h-40 bg-text/5 shadow shadow-text/20 rounded flex items-center justify-center text-text'
                >
                    <Icon
                        type={'spinner'}
                        className='animate-spin'
                    />
                </div>
            </div>
        )
    }

    return (
        <div
            className={`${isRepliesActive ? 'flex' : 'hidden'} flex-col gap-2 w-full h-fit pl-20`}
        >
            {
                isNewReplyActive &&
                <NewReplyPlaceholder
                    setIsNewReplyActive={setIsNewReplyActive}
                    handleToggleNewReply={handleToggleNewReply}
                    commentId={commentId}
                />
            }
            {
                replies?.map((reply) => (
                    <Reply
                        key={reply?.id}
                        reply={reply}
                    />
                ))
            }
        </div>
    )
}

export default RepliesContainer