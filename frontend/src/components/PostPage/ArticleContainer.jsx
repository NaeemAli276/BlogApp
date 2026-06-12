import React, { useState } from 'react'
import { formatCompactNumber, formatDate } from '../../utils/textUtils'
import { Link } from 'react-router-dom'
import RichTextViewer from './RichTextViewer'
import AuthorBtn from '../btns/AuthorBtn'


const ArticleContainer = ({ 
    post
}) => {

    const tags = ['tech', 'food', 'future']
    const content = "<h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut.</h2><p></p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut, porro sit esse dolorum quaerat doloremque vel aut? Voluptatibus quam quasi deserunt.</p><p></p><img src=\"https://fastly.picsum.photos/id/573/960/544.jpg?hmac=ofppTMc_sLbA_7etXmTBDKoPgfyDrFeq1GYykJfuAys\" alt=\"https://fastly.picsum.photos/id/573/960/544.jpg?hmac=ofppTMc_sLbA_7etXmTBDKoPgfyDrFeq1GYykJfuAys\"><p></p><blockquote class=\"pl-4 max-w-none \"><p>this is a blockquote</p></blockquote><p></p><ol><li><p>this is a point</p></li><li><p>this is another point</p></li></ol><p></p><ul><li><p>this is an ordered point</p></li><li><p>this is another ordered point</p></li></ul><p></p><pre><code>Blockquote.configure({\n  HTMLAttributes: {\n    class: 'pl-4 max-w-none bg-background/0'\n  }\n}),</code></pre><p></p><p></p><p></p><p></p>"
    const [isDropdownActive, setIsDropdownActive] = useState(false)
    const menuBtns = [
        {
            name: 'Bookmark',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 256">
                    <path fill="currentColor" d="M184 34H72a14 14 0 0 0-14 14v176a6 6 0 0 0 9.18 5.09l60.81-38l60.83 38A6 6 0 0 0 198 224V48a14 14 0 0 0-14-14M72 46h112a2 2 0 0 1 2 2v117.18l-54.83-34.27a6 6 0 0 0-6.36 0L70 165.17V48a2 2 0 0 1 2-2m59.17 132.91a6 6 0 0 0-6.36 0L70 213.17v-33.84l58-36.25l58 36.25v33.84Z"></path>
                </svg>,
        },
        {
            name: 'Share',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 256">
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

            {/* title, details and thumbnails */}
            <div
                className='flex flex-col gap-4 w-full h-full'
            >

                <div
                    className='flex flex-col gap-2'
                >
                    <h1
                        className='text-2xl/tight font-semibold text-text'
                    >
                        {post?.title}
                    </h1>
                    <RichTextViewer
                        content={post?.excerpt}
                        className='text-text/70'
                    />

                </div>

                {/* details */}
                <div
                    className='flex flex-row items-center justify-between gap-2'
                >
                    
                    <div
                        className='flex flex-row items-center gap-2'
                    >
                        {/* category */}
                        <span
                            className='bg-secondary/50 p-1 rounded-full text-sm flex flex-row items-center gap-1 pl-2 pr-2.5 text-primary'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709"></path>
                            </svg>
                            {post?.category}
                        </span>

                        {/* date */}
                        <span
                            className='bg-secondary/50 p-1 rounded-full text-sm flex flex-row items-center gap-1 pl-2 pr-2.5 text-primary'
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.1 0-2 .9-2 2v1h18V6c0-1.1-.9-2-2-2M3 20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8H3z"></path></svg>
                            {formatDate(post?.date)}
                        </span>

                        <span
                            className='bg-secondary/50 p-1 rounded-full text-sm flex flex-row items-center gap-1 pl-2 pr-2.5 text-primary'
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 2C6.58 2 2 6.58 2 12s4.58 10 10 10 10-4.58 10-10S17.42 2 12 2m5 11h-6V7h2v4h4z"></path></svg>
                            5 min read
                        </span>
                    </div>

                    {/* likes, dislikes and menu */}
                    <div
                        className='flex flex-row items-center gap-5 w-fit h-fit'
                    >

                        {/* likes and dislikes */}
                        <div
                            className='flex flex-row items-center gap-1'
                        >

                            <button
                                className='flex flex-row gap-1.5 items-center text-text/70 font-medium hover:text-primary duration-200 text-base/tight'
                            >
                                {formatCompactNumber(post?.likes_count)}
                                <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M4 21h1V8H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2M20 8h-6.61l1.12-3.37c.2-.61.1-1.28-.27-1.8-.38-.52-.98-.83-1.62-.83h-.61c-.3 0-.58.13-.77.36L7.01 7.44V21h10.31a2 2 0 0 0 1.87-1.3l2.76-7.35c.04-.11.06-.23.06-.35v-2c0-1.1-.9-2-2-2Z"></path></svg>
                            </button>

                            <svg className='text-text' xmlns="http://www.w3.org/2000/svg" width={4} height={4} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709"></path>
                            </svg>

                            <button
                                className='flex flex-row-reverse gap-1.5 items-center text-text/70 font-medium hover:text-primary duration-200 text-base/tight'
                            >
                                {formatCompactNumber(post?.dislikes_count)}
                                <svg className='rotate-180' xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M4 21h1V8H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2M20 8h-6.61l1.12-3.37c.2-.61.1-1.28-.27-1.8-.38-.52-.98-.83-1.62-.83h-.61c-.3 0-.58.13-.77.36L7.01 7.44V21h10.31a2 2 0 0 0 1.87-1.3l2.76-7.35c.04-.11.06-.23.06-.35v-2c0-1.1-.9-2-2-2Z"></path></svg>
                            </button>

                        </div>

                        <div
                            className='relative'
                        >
                            <button
                                className='p-1 hover:bg-text/20 rounded-full text-text'
                                onClick={() => setIsDropdownActive(!isDropdownActive)}
                            >
                                <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 10a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0-12a2 2 0 1 0 0 4 2 2 0 1 0 0-4"></path></svg>
                            </button>
                            <div
                                className={`${isDropdownActive ? 'flex' : 'hidden'} w-56 h-fit bg-background shadow shadow-text/50 rounded absolute top-8 right-0 z-50 flex-col`}
                            >
                                {
                                    menuBtns.map((btn) => (
                                        <button
                                            className='flex flex-row items-center gap-2 justify-start p-2 text-sm px-2.5 text-text hover:text-primary hover:bg-secondary/50 duration-200'
                                            key={btn.name}
                                        >
                                            {btn.icon}
                                            {btn.name}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                    </div>

                </div>

                <div
                    className='w-full h-fit aspect-video relative'
                >
                    <div
                        className='absolute bottom-3 left-3 z-20'
                    >
                        <AuthorBtn
                            author={post?.author}
                            textTheme='light'
                            // hideEmail={true}
                        />
                    </div>
                    <div
                        className='absolute left-0 top-0 w-full rounded h-full bg-black/20'
                    >

                    </div>
                    <img 
                        src={post?.thumbnail} 
                        alt="" 
                        className='rounded w-full h-full'
                    />
                </div>
            </div>

            {/* tags and content */}
            <div
                className='flex flex-col gap-4 w-full h-full'
            >

                {/* tags */}
                <div
                    className='flex flex-col gap-3 w-full h-fit'
                >
                    <h2
                        className='text-text text-sm font-medium'
                    >
                        Tags:
                    </h2>
                    <div
                        className='flex flex-wrap items-center gap-2 w-full h-fit'
                    >
                        {tags?.map((tag) => (
                            <button
                                key={tag}
                                className='p-1 px-2 rounded-md bg-text/10 text-text text-sm hover:bg-primary hover:text-background duration-200'
                            >
                                # {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <RichTextViewer
                    content={post?.mainContent}
                    className=''
                />

            </div>

        </div>
    )
}

export default ArticleContainer