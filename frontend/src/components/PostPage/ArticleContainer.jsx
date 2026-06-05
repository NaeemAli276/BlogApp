import React, { useState } from 'react'
import { formatCompactNumber } from '../../utils/textUtils'
import { Link } from 'react-router-dom'
import RichTextViewer from './RichTextViewer'


const ArticleContainer = ({ 
    post
}) => {

    const [isDropdownActive, setIsDropdownActive] = useState(false)
    const menuBtns = [
        {
            name: 'Bookmark',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256">
                    <path fill="currentColor" d="M184 34H72a14 14 0 0 0-14 14v176a6 6 0 0 0 9.18 5.09l60.81-38l60.83 38A6 6 0 0 0 198 224V48a14 14 0 0 0-14-14M72 46h112a2 2 0 0 1 2 2v117.18l-54.83-34.27a6 6 0 0 0-6.36 0L70 165.17V48a2 2 0 0 1 2-2m59.17 132.91a6 6 0 0 0-6.36 0L70 213.17v-33.84l58-36.25l58 36.25v33.84Z"></path>
                </svg>,
        },
        {
            name: 'Share',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256">
                    <path fill="currentColor" d="m229.66 109.66l-48 48a8 8 0 0 1-11.32-11.32L204.69 112H165a88 88 0 0 0-85.23 66a8 8 0 0 1-15.5-4A103.94 103.94 0 0 1 165 96h39.71l-34.37-34.34a8 8 0 0 1 11.32-11.32l48 48a8 8 0 0 1 0 11.32M192 208H40V88a8 8 0 0 0-16 0v128a8 8 0 0 0 8 8h160a8 8 0 0 0 0-16"></path>
                </svg>
        }
    ]

    return (
        <div
            className='w-3/5 h-full rounded overflow-y-scroll scrollbar-hide flex items-start justify-start p-1 flex-col gap-4'
        >
            
            <Link
                className='flex flex-row items-center gap-1.5 text-text/70 hover:text-primary duration-200'
                to={-1}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4m0 0l6-6m-6 6l6 6"></path>
                </svg>
                Back to posts
            </Link>

            {/* thumnail, image, title */}
            <div
                className='w-full h-full flex flex-col gap-2'
            >   

                {/* thumnail with title, or just title */}
                <div
                    className='relative w-full h-full aspect-video'
                >
                    {/* black overlay */}
                    <div className='w-full h-full bg-black/20 z-10 absolute top-0 left-0 rounded'>
                    </div>
                    {/* post thumbnail */}
                    <img 
                        src={post?.thumbnail} 
                        alt=""
                        className='rounded' 
                    />
                    {/* category and user */}
                    <div
                        className='absolute top-0 left-0 flex flex-row items-center justify-between p-4 w-full h-fit'
                    >
                        {/* user */}
                        <div
                            className='w-fit h-fit flex flex-row gap-2 z-50'
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
                                    />
                            }                                        
                            <h2
                                className='text-background font-semibold'
                            >
                                {post?.author.username}
                            </h2>
                        </div>
                        <h3
                            className='text-sm p-1 px-2 rounded font-semibold bg-primary text-background z-50'
                        >
                            {post?.category}
                        </h3>
                    </div>
                    <div
                        className='w-full h-fit absolute bottom-0 left-0 z-50 flex flex-col p-5 gap-2'
                    >   
                        
                        {/* title */}
                        <h2
                            className='w-4/5 h-fit text-background font-bold text-2xl'
                        >
                            {post?.title}
                        </h2>
                        <div
                            className='flex flex-row items-center justify-between w-full h-fit'
                        >    
                            {/* date */}
                            <h3
                                className='text-background/90 '
                            >
                                Date: {post?.date}
                            </h3>
                            <div
                                className='flex flex-row items-center gap-2 w-fit h-fit'
                            >
                                {
                                    post?.tags.map((tag) => (
                                        <button
                                            className='text-xs bg-secondary text-primary px-2 p-1 rounded font-medium flex flex-row items-center gap-1'
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

            {/* stats, menu btn, and excerpt */}
            <div
                className='flex flex-col gap-2 w-full h-full px-1'
            >

                {/* stats and menu btn */}
                <div
                    className='flex flex-row items-center gap-2 w-full h-fit'
                >
                    <div
                        className='flex flex-row items-center gap-3 w-full h-fit'
                    >
                        {/* views */}
                        <h3
                            className='flex flex-row items-center gap-1 text-text/70 font-medium'
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path></svg>
                            {formatCompactNumber(post?.views)}
                        </h3>
                        {/* likes */}
                        <h3
                            className='flex flex-row items-center gap-1 text-text/70 font-medium'
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M20 8h-5.61l1.12-3.37c.2-.61.1-1.28-.27-1.8-.38-.52-.98-.83-1.62-.83h-1.61c-.3 0-.58.13-.77.36L6.54 8H4.01c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13.31a2 2 0 0 0 1.87-1.3l2.76-7.35c.04-.11.06-.23.06-.35v-2c0-1.1-.9-2-2-2ZM6 19H4v-9h2zm14-7.18L17.31 19H8V9.36L12.47 4h1.15l-1.56 4.68a1.01 1.01 0 0 0 .95 1.32h7v1.82Z"></path></svg>
                            {formatCompactNumber(post?.likes)}
                        </h3>
                        {/* shares */}
                        <h3
                            className='flex flex-row items-center gap-1 text-text/70 font-medium'
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M5.5 15.5c1.07 0 2.02-.5 2.67-1.26l6.87 3.87c-.01.13-.04.26-.04.39 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5c-1.07 0-2.02.5-2.67 1.26l-6.87-3.87c.01-.13.04-.26.04-.39s-.02-.26-.04-.39l6.87-3.87C16.47 8.5 17.42 9 18.5 9 20.43 9 22 7.43 22 5.5S20.43 2 18.5 2 15 3.57 15 5.5c0 .13.02.26.04.39L8.17 9.76A3.48 3.48 0 0 0 5.5 8.5C3.57 8.5 2 10.07 2 12s1.57 3.5 3.5 3.5m13 1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5m0-13c.83 0 1.5.67 1.5 1.5S19.33 7 18.5 7 17 6.33 17 5.5 17.67 4 18.5 4m-13 6.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S4 12.83 4 12s.67-1.5 1.5-1.5"></path></svg>
                            {formatCompactNumber(post?.shares)}
                        </h3>
                    </div>
                    <div
                        className='relative w-fit h-fit'
                    >
                        <button
                            className='duration-200 p-1 rounded-full text-text hover:bg-text/10'
                            onClick={() => setIsDropdownActive(!isDropdownActive)}
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 10a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0-12a2 2 0 1 0 0 4 2 2 0 1 0 0-4"></path></svg>
                        </button>
                        <div
                            className={`${isDropdownActive ? 'flex' : 'hidden'} flex-col w-52 rounded h-fit shadow shadow-text/30 absolute top-10 right-0 z-50 bg-background`}
                        >
                            {
                                menuBtns.map((btn, index) => (
                                    <button
                                        className={`
                                            ${index === menuBtns.length -1 && 'rounded-b'} 
                                            ${index === 0 && 'rounded-t'}
                                            w-full h-fit p-2.5 px-3 text-text/70 cursor-pointer text-sm flex items-center gap-2 duration-200 hover:bg-secondary/50 hover:text-primary active:text-background active:bg-primary
                                        `}
                                    >
                                        <i>
                                            {btn?.icon}
                                        </i>
                                        <span>
                                            {btn?.name}
                                        </span>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    
                </div>

                {/* excerpt */}
                <RichTextViewer
                    content={post?.excerpt}
                    className='text-text px-1'
                />

                <span className={`${post?.excerpt !== '' ? '' : ''} w-full h-px bg-primary`}></span>

            </div>

            <div
                className='w-full h-full '
            >
                <RichTextViewer
                    content={post?.mainContent}
                />
            </div>

        </div>
    )
}

export default ArticleContainer