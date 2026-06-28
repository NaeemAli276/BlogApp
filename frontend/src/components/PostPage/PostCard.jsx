import React from 'react'
import { formatDate, truncateText } from '../../utils/textUtils'
import { useNavigate } from 'react-router-dom'
import Icon from '../../assets/Icon'
import AuthorBtn from '../btns/AuthorBtn'

const PostCard = ({
    post,
    ftn = null
}) => {

    const navigate = useNavigate()

    return (
        <div
            className='relative aspect-video rounded cursor-pointer shadow shadow-text/30'
            onClick={ftn === null ? () => navigate(`/posts/${post?.id}`) : ftn}
        >   
            <img 
                src={post?.thumbnail} 
                alt="" 
                className='w-full h-fit rounded'    
            />
            <div
                className='w-full h-full absolute left-0 top-0 z-50 bg-black/20 flex flex-col justify-between rounded'
            >

                {/* name and category */}
                <div
                    className='flex flex-row items-center justify-between w-full h-fit'
                >
                    <div
                        className='absolute top-0 left-0 flex flex-row items-center justify-between p-4 w-full h-fit'
                    >
                        {/* user */}
                        <AuthorBtn
                            author={post?.author}
                        />
                        <h3
                            className='text-sm p-1 px-2 rounded font-semibold bg-primary text-background z-50'
                        >
                            {post?.category?.category_name}
                        </h3>
                    </div>
                </div>

                <div
                    className='w-full h-fit flex flex-col p-5 gap-2'
                >   
                    
                    {/* title */}
                    <h2
                        className='w-9/10 h-fit text-background font-bold text-xl'
                    >
                        {truncateText(post?.title, 90)}
                    </h2>
                    <div
                        className='flex flex-row items-center justify-between w-full h-fit'
                    >    
                        {/* date */}
                        <h3
                            className='text-background/90 text-sm flex gap-1.5'
                        >
                            <Icon
                                type={'calendar'}
                                size='20'
                            />
                            {formatDate(post?.created_at)}
                        </h3>
                        <div
                            className='flex flex-row items-center gap-2 w-fit h-fit'
                        >
                            {
                                post?.tags?.map((tag) => (
                                    <button
                                        className='text-xs bg-secondary text-primary px-2 p-1 rounded font-medium flex flex-row items-center gap-1'
                                        key={tag?.id}
                                    >
                                        <Icon
                                            type={'circle'}
                                            size='8'
                                        /> 
                                        {tag?.tag_name}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard