import React from 'react'
import { formatDate } from '../../utils/textUtils'
import Icon from '../../assets/Icon'
import { useNavigate } from 'react-router-dom'

const ExplorePostCard = ({
    post = {},
}) => {

    const navigate = useNavigate()

    const handlePostClick = () => {
        navigate(`/posts/${post?.id}`)
    }

    return (
        <div
            className='relative aspect-video min-w-92 max-w-92 cursor-pointer'
            onClick={() => handlePostClick()}
        >

            {/* image */}
            <img    
                src={post?.thumbnail} 
                alt="" 
                className='w-full h-fit rounded'    
            />

            <div
                className='absolute top-0 left-0 rounded bg-black/20 w-full h-full p-3 flex flex-col justify-between'
            >

                {/* tags and date */}
                <div
                    className='flex flex-row items-start justify-between w-full h-fit'
                >
                    <div
                        className='w-fit h-fit flex flex-row items-center gap-1'
                    >
                        {
                            post?.tags?.map((tag) => (
                                <span
                                    className='text-sm bg-primary text-background font-medium rounded p-1 px-2'
                                >
                                    {tag?.tag_name}
                                </span>
                            ))
                        }
                    </div>

                    <span
                        className='text-sm font-medium text-background flex gap-1 items-center'
                    >
                        <Icon
                            type={'calendar'}
                            size='16'
                        />
                        {formatDate(post?.created_at)}
                    </span>

                </div>

                {/* title */}
                <h2
                    className='text-background pr-10 font-semibold'
                >
                    {post?.title}
                </h2>

            </div>

        </div>
    )
}

export default ExplorePostCard