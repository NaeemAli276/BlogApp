import React from 'react'
import { formatCompactNumber, formatDate, truncateText } from '../../utils/textUtils'
import AuthorBtn from '../btns/AuthorBtn'
import { Link } from 'react-router-dom'
import Icon from '../../assets/Icon'

const VerticalPostCard = ({
    post
}) => {
    return (
        <div
            className='col-span-4 row-span-6 bg-background rounded shadow shadow-text/50 w-full h-full relative'
        >
            
            <img    
                src={post?.thumbnail} 
                alt="" 
                className='aspect-video h-1/2 w-full object-cover rounded-t'
            />

            <div className='w-full h-1/2 bg-black/20 absolute left-0 top-0'></div>

            <div
                className='absolute top-2/5 left-3 w-full h-fit z-50'
            >
                <AuthorBtn
                    author={post?.author}
                />
            </div>
            

            <div
                className='flex flex-col justify-between w-full h-1/2 p-3 '
            >
                <div
                    className='flex flex-col gap-2 w-full h-fit'
                >
                    <div
                        className='w-full h-fit flex flex-row items-center justify-between'
                    >
                        <span
                            className='bg-secondary w-fit text-primary px-2 pl-1 p-0.5 rounded-full flex-row flex gap-1 items-center text-xs font-medium'
                        >

                            <Icon
                                type={'circle'}
                                size='16'
                                pack='filled'
                                className='size-2.5'
                            />
                            {post?.category?.category_name}
                        </span>
                        <h3
                            className='text-text/80 text-xs flex-row flex gap-1 items-center'
                        >
                            <Icon
                                type={'calendar'}
                                size='16'
                            />
                            {formatDate(post?.date)}
                        </h3>
                    </div>
                    <h3
                        className='text-text font-medium text-base/tight'
                    >

                        {truncateText(post?.title, 68)}
                    </h3>
                    <p
                        className='text-text/70 text-sm'
                    >
                        {truncateText(post?.excerpt, 120)}
                    </p>
                </div>
                <div
                    className='flex flex-row items-end justify-between w-full h-fit'
                >
                    <span
                        className='text-text/70 flex gap-1 items-center text-sm'
                    >
                        <Icon
                            type={'eye'}
                            size='20'
                        />
                        {formatCompactNumber(post?.view_count)}
                    </span>
                    <Link
                        className='w-fit flex h-fit items-center gap-2 text-sm text-text/80 hover:text-primary duration-200'
                        to={`/posts/${post?.id}`}
                        // state={post?.id}
                    >
                        View more
                        <Icon
                            type={'arrow'}
                            size='20'
                        />
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default VerticalPostCard