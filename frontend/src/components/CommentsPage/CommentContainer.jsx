import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { useQuery } from '@tanstack/react-query'

const CommentContainer = ({
    comment,
}) => {

    const [isRepliesActive, setIsRepliesActive] = useState(false)
    
    const { data: replies = [] } = useQuery({
        
    })

    const handleToggleNewReply = () => {

    }

    return (
        <div
            className='flex flex-col gap-2 w-full h-fit'
        >
            <Comment
                author={comment?.author}
                content={comment?.content}
                handleToggleNewReply={() => handleToggleNewReply()}
                isRepliesActive={isRepliesActive}
                setIsRepliesActive={setIsRepliesActive}
            />
        </div>
    )
}

export default CommentContainer