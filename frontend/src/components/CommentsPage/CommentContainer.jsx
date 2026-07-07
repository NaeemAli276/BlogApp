import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { useQuery } from '@tanstack/react-query'
import { getComment, getPostCommentsIds } from '../../apis/commentApi'
import Icon from '../../assets/Icon'

const CommentContainer = ({
    commentId,
}) => {

    const [isRepliesActive, setIsRepliesActive] = useState(false)
    
    const { isLoading, data: comment = {} } = useQuery({
        queryKey: ['get_comment', commentId],
        queryFn: () => getComment(commentId),
        refetchInterval: 100000,
        refetchOnMount: true
    })

    const handleToggleNewReply = () => {

    }

    if (isLoading) {
        return (
            <div
                className='w-full h-56 bg-background shadow shadow-text/20 rounded flex items-center justify-center'
            >
                <Icon
                    type={'spinner'}
                />
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
                    handleToggleNewReply={() => handleToggleNewReply()}
                    isRepliesActive={isRepliesActive}
                    setIsRepliesActive={setIsRepliesActive}
                />
            </div>
        )
    }
}

export default CommentContainer