import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { useQuery } from '@tanstack/react-query'
import { getComment, getPostCommentsIds } from '../../apis/commentApi'
import Icon from '../../assets/Icon'
import RepliesContainer from '../CommentsPage/RepliesContainer'

const CommentContainer = ({
    commentId,
}) => {

    const [isRepliesActive, setIsRepliesActive] = useState(false)
    const [isNewReplyActive, setIsNewReplyActive] = useState(false)
    
    const { isLoading, data: comment = {} } = useQuery({
        queryKey: ['get_comment', commentId],
        queryFn: () => getComment(commentId),
        refetchInterval: 100000,
        refetchOnMount: true
    })

    const handleToggleNewReply = () => {

        if (isNewReplyActive) {
            setIsNewReplyActive(false)
            setIsRepliesActive(false)
        }
        else {
            setIsNewReplyActive(true)
            setIsRepliesActive(true)
        }

    }

    if (isLoading) {
        return (
            <div
                className='p-0.5'
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
    else {
        return (
            <div
                className='flex flex-col gap-2 w-full h-fit'
            >
                <Comment
                    comment={comment}
                    handleToggleNewReply={handleToggleNewReply}
                    isRepliesActive={isRepliesActive}
                    setIsRepliesActive={setIsRepliesActive}
                />

                <div
                    className='flex flex-col gap-2 w-full h-fit'
                >
                    <RepliesContainer
                        isNewReplyActive={isNewReplyActive}
                        isRepliesActive={isRepliesActive}
                        commentId={comment?.id}
                        handleToggleNewReply={handleToggleNewReply}
                        setIsNewReplyActive={setIsNewReplyActive}
                    />
                </div>

            </div>
        )
    }
}

export default CommentContainer