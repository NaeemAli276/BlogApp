import React, { useEffect } from 'react'
import defaultUserImg from '../../assets/user.png'
import AuthorBtn from '../btns/AuthorBtn'
import { formatDate, truncateText } from '../../utils/textUtils'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getPopularPosts } from '../../apis/postApi'
import Icon from '../../assets/Icon'

const SmallPostCard = ({
    post
}) => {

    const navigate = useNavigate()

    return (
        <div
            className='w-full h-fit relative aspect-video shadow shadow-text/50 rounded cursor-pointer'
            onClick={() => navigate(`/posts/${post?.id}`)}
        >

            <div
                className='absolute top-0 left-0 bg-black/30 z-10 w-full h-full rounded flex flex-col items-start justify-between p-3'
            >

                <div
                    className='w-full h-fit flex flex-row items-start justify-between'
                >
                    <AuthorBtn
                        author={post?.author}
                    />
                    <h3
                        className='text-background/80 text-xs font-medium flex-row flex gap-1 items-center'
                    >
                        <Icon
                            type={'calendar'}
                            size='xs'
                        />
                        {formatDate(post?.date)}
                    </h3>
                </div>
                

                {/* details */}
                <div
                    className='flex flex-col gap-4 w-full h-fit'
                >

                    {/* category and title */}
                    <div
                        className='flex flex-col-reverse gap-2 w-full h-fit'
                    >
                        <h3
                            className='text-background font-semibold'
                        >
                            {truncateText(post?.title, 120)}
                        </h3>
                        <span
                            className='text-xs text-primary font-medium bg-secondary w-fit px-2 p-1 flex gap-1 items-center rounded-full'
                        >
                            <Icon
                                type={'circle'}
                                size='xs'
                                pack='filled'
                                className='size-2.5'
                            />
                            {post?.category}
                        </span>
                    </div>

                </div>

            </div>

            <img 
                src={post?.thumbnail} 
                alt="" 
                className='rounded z-0'
            />

        </div>
    )
}

export default SmallPostCard