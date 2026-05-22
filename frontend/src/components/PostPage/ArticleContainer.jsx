import React from 'react'
import { formatCompactNumber } from '../../utils/textUtils'
import { Link } from 'react-router-dom'
import RichTextViewer from './RichTextViewer'


const ArticleContainer = ({ 
    post
}) => {

    return (
        <div
            className='w-3/5 h-full rounded overflow-y-scroll scrollbar-hide flex items-start justify-start p-1 flex-col gap-4'
        >
            
            <Link
                className='flex flex-row items-center gap-1.5 text-text/70 hover:text-primary duration-200'
                to={'/posts'}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4m0 0l6-6m-6 6l6 6"></path>
                </svg>
                Back to posts
            </Link>

            {/* thumbnail, excerpt, category, tags, title, date */}
            <div
                className='flex flex-col w-full h-full p-2 rounded bg-background shadow shadow-text/20 gap-0'
            >

                {/* thumbnail */}
                <div
                    className='h-full w-auto aspect-video rounded relative'
                >
                    <img 
                        src={post.thumbnail}
                        alt=""
                        className='w-full h-full rounded'
                    />
                    <h3
                        className='text-background bg-primary px-2 p-0.5 font-medium rounded absolute bottom-3 left-3'
                    >
                        {post.category}
                    </h3>

                    {/* stats */}
                    <div
                        className='w-fit h-fit flex flex-row items-center gap-5 absolute bottom-3 right-3 p-1'
                    >
                        {/* views */}
                        <h3
                            className='text-background font-medium flex gap-1'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256">
                                <path fill="currentColor" d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.5 133.5 0 0 1 25 128a133.3 133.3 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.5 133.5 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32"></path>
                            </svg>
                            {formatCompactNumber(post.views)}
                        </h3>

                        {/* likes */}
                        <h3
                            className='text-background font-medium flex gap-1'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256">
                                <g fill="currentColor">
                                    <path d="M80 104v104H32a8 8 0 0 1-8-8v-88a8 8 0 0 1 8-8Z" opacity={0.2}></path>
                                    <path d="M234 80.12A24 24 0 0 0 216 72h-56V56a40 40 0 0 0-40-40a8 8 0 0 0-7.16 4.42L75.06 96H32a16 16 0 0 0-16 16v88a16 16 0 0 0 16 16h172a24 24 0 0 0 23.82-21l12-96A24 24 0 0 0 234 80.12M32 112h40v88H32Zm191.94-15l-12 96a8 8 0 0 1-7.94 7H88v-94.11l36.71-73.43A24 24 0 0 1 144 56v24a8 8 0 0 0 8 8h64a8 8 0 0 1 7.94 9"></path>
                                </g>
                            </svg>
                            {formatCompactNumber(post.likes)}
                        </h3>

                        {/* shares */}
                        <h3
                            className='text-background font-medium flex gap-1'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256">
                                <path fill="currentColor" d="m229.66 109.66l-48 48a8 8 0 0 1-11.32-11.32L204.69 112H165a88 88 0 0 0-85.23 66a8 8 0 0 1-15.5-4A103.94 103.94 0 0 1 165 96h39.71l-34.37-34.34a8 8 0 0 1 11.32-11.32l48 48a8 8 0 0 1 0 11.32M192 208H40V88a8 8 0 0 0-16 0v128a8 8 0 0 0 8 8h160a8 8 0 0 0 0-16"></path>
                            </svg>
                            {formatCompactNumber(post.shares)}
                        </h3>
                    </div>
                </div>

                {/* excerpt, category, tags, title, date */}
                <div
                    className='flex flex-col gap-2 p-4 h-full w-full'
                >

                    {/* title, excerpt, btns */}
                    <div
                        className='flex flex-row items-end justify-between h-full gap-2'
                    >

                        {/* title and excerpt */}
                        <div
                            className='flex flex-col gap-2 w-7/10 h-full'
                        >
                            <h1
                                className='text-text font-semibold text-lg'
                            >
                                {post.title}
                            </h1>
                            <h2
                                className='text-text/70'
                            >
                                <RichTextViewer
                                    content={post.excerpt}
                                    className='p-0'
                                />
                            </h2>
                        </div>

                        {/* btns */}
                        <div
                            className='flex flex-col justify-end gap-2 w-3/10 h-fit'
                        >
                            
                            {/* bookmark btn */}
                            <button
                                className='font-medium flex flex-row-reverse items-center justify-bewteen text-start p-2 rounded bg-text/10 text-text/80 border-2 border-text/5 hover:bg-text/20 duration-200 text-sm'
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width={24} 
                                    height={24} 
                                    viewBox="0 0 256 256"
                                    className="w-2/10"
                                >
                                    <path fill="currentColor" d="M184 32H72a16 16 0 0 0-16 16v176a8 8 0 0 0 12.24 6.78L128 193.43l59.77 37.35A8 8 0 0 0 200 224V48a16 16 0 0 0-16-16m0 16v113.57l-51.77-32.35a8 8 0 0 0-8.48 0L72 161.56V48Zm-51.77 129.22a8 8 0 0 0-8.48 0L72 209.57v-29.14l56-35l56 35v29.14Z"></path>
                                </svg>
                                <span
                                    className='w-8/10'
                                >
                                    Bookmark
                                </span>
                            </button>

                            {/* share btn */}
                            <button
                                className='flex flex-row-reverse items-center gap-1 text-start p-2 rounded bg-secondary/50 text-primary border-2 border-text/5 hover:bg-primary hover:text-background duration-200 text-sm font-medium'
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width={24} 
                                    height={24} 
                                    viewBox="0 0 256 256"
                                    className="w-2/10"
                                >
                                    <path fill="currentColor" d="m229.66 109.66l-48 48a8 8 0 0 1-11.32-11.32L204.69 112H165a88 88 0 0 0-85.23 66a8 8 0 0 1-15.5-4A103.94 103.94 0 0 1 165 96h39.71l-34.37-34.34a8 8 0 0 1 11.32-11.32l48 48a8 8 0 0 1 0 11.32M192 208H40V88a8 8 0 0 0-16 0v128a8 8 0 0 0 8 8h160a8 8 0 0 0 0-16"></path>
                                </svg>
                                <span
                                    className='w-8/10'
                                >
                                    Share
                                </span>
                            </button>

                        </div>

                    </div>

                </div>

                <div
                    className='px-4 pb-2 w-full h-fit flex flex-col gap-4'
                >
                    <span className='w-full min-h-px h-px bg-primary'></span>
                    {/* tags */}
                    <div
                        className='w-full h-fit flex items-center gap-2 flex-wrap'
                    >
                        {
                            post?.tags.map((tag) => (
                                <button
                                    className='text-sm p-1.5 px-2.5 rounded bg-secondary/50 text-primary flex flex-row items-center gap-1 font-medium'
                                >
                                    <svg  
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width={8} 
                                        height={8} 
                                        fill={"currentColor"} 
                                        viewBox={"0 0 24 24"}><path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20"></path>
                                    </svg>
                                    {tag}
                                </button>
                            ))
                        }
                    </div>
                </div>

            </div>

            <div
                className='w-full h-full '
            >
                <RichTextViewer
                    content={post.mainContent}
                />
            </div>

        </div>
    )
}

export default ArticleContainer