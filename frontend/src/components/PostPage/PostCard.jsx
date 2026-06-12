import React from 'react'
import { truncateText } from '../../utils/textUtils'

const PostCard = ({
    post
}) => {
    return (
        <div
            className='relative aspect-video rounded cursor-pointer shadow shadow-text/30'
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
                        <div
                            className='w-fit h-fit flex flex-row gap-2 z-50 items-start'
                        >
                            {
                                post?.author?.profileImg === null
                                ?   <i
                                        className='p-1 rounded-full border-primary w-fit h-fit bg-background text-text'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                            <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                                                <circle cx={12} cy={6} r={4}></circle>
                                                <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"></path>
                                            </g>
                                        </svg>
                                    </i>
                                :   <img 
                                        src={post?.author?.profileImg} 
                                        alt="" 
                                        className='size-8 rounded-full'
                                    />
                            }  
                            <div
                            
                            >
                                <h2
                                    className='text-background font-semibold text-sm/tight'
                                >
                                    {post?.author?.username}
                                </h2>
                                <h3
                                    className='text-background/70 text-xs'
                                >
                                    {post?.author?.email}
                                </h3>
                            </div>                                      
                        </div>
                        <h3
                            className='text-sm p-1 px-2 rounded font-semibold bg-primary text-background z-50'
                        >
                            {post?.category}
                        </h3>
                    </div>
                </div>

                <div
                    className='w-full h-fit flex flex-col p-5 gap-2'
                >   
                    
                    {/* title */}
                    <h2
                        className='w-4/5 h-fit text-background font-bold text-xl'
                    >
                        {truncateText(post?.title, 90)}
                    </h2>
                    <div
                        className='flex flex-row items-center justify-between w-full h-fit'
                    >    
                        {/* date */}
                        <h3
                            className='text-background/90 text-sm'
                        >
                            Date: {post?.date}
                        </h3>
                        <div
                            className='flex flex-row items-center gap-2 w-fit h-fit'
                        >
                            {
                                post?.tags?.map((tag) => (
                                    <button
                                        className='text-xs bg-secondary text-primary px-2 p-1 rounded font-medium flex flex-row items-center gap-1'
                                        key={tag}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={6} height={6} viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path>
                                        </svg>
                                        {tag}
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