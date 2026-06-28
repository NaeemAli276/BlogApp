import React, { useEffect, useState } from 'react'
import { formatCompactNumber, formatDate } from '../../utils/textUtils'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import RichTextViewer from './RichTextViewer'
import AuthorBtn from '../btns/AuthorBtn'
import Icon from '../../assets/Icon'


const ArticleContainer = ({ 
    post
}) => {

    const tags = ['tech', 'food', 'future']
    const location = useLocation()
    const navigation = useNavigate()
    
    const [isDropdownActive, setIsDropdownActive] = useState(false)
    const menuBtns = [
        {
            name: 'Bookmark',
            icon:   <Icon
                        type={'bookmark'}
                    />,
        },
        {
            name: 'Share',
            icon:   <Icon
                        type={'share'}
                    />
        }
    ]

    const handleNavigateBack = () => {

        const selectedPost = post 

        navigation('/My_posts', { state: 
            {
                from: 'preview',
                post: selectedPost
            } 
        })

    }

    const date = new Date().toISOString()

    return (
        <div
            className='w-3/5 h-full rounded overflow-y-scroll scrollbar-hide flex items-start justify-start p-1 flex-col gap-4'
        >

            <button
                className='flex flex-row items-center gap-1.5 text-text/70 hover:text-primary duration-200'
                onClick={
                    location.pathname.includes('preview')
                    ?   () => handleNavigateBack()
                    :   () => navigation(-1)
                }
            >
                
                <Icon
                    type={'arrow'}
                    size='16'
                    className='rotate-180'
                />
                {
                    location.pathname.includes('preview')
                    ?   'Exit preview'
                    :   'Previous'
                }
            </button>

            {/* title, details and thumbnails */}
            <div
                className='flex flex-col gap-4 w-full h-full'
            >

                {/* title and excerpt */}
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
                            <Icon
                                type={'circle'}
                                size='10'
                                pack='filled'
                            />
                            {post?.category?.category_name}
                        </span>

                        {/* date */}
                        <span
                            className='bg-secondary/50 p-1 rounded-full text-sm flex flex-row items-center gap-1 pl-2 pr-2.5 text-primary'
                        >
                            <Icon
                                type={'calendar'}
                                size='16'
                                pack='filled'
                            />
                            {
                                post?.created_at === "" || post?.created_at === null
                                ?   formatDate(date)
                                :   formatDate(post?.created_at)
                            }
                        </span>

                        <span
                            className='bg-secondary/50 p-1 rounded-full text-sm flex flex-row items-center gap-1 pl-2 pr-2.5 text-primary'
                        >
                            <Icon
                                type={'clock'}
                                size='16'
                                // className='size-2.5'
                                pack='filled'
                            />
                            5 min read
                        </span>
                    </div>

                    {/* tags */}
                    <div
                        className='flex flex-wrap items-center gap-2 w-fit h-fit'
                    >
                        {post?.tags?.map((tag) => (
                            <button
                                key={tag?.tag_name}
                                className='p-1 px-2 rounded-md bg-text/10 text-text text-sm hover:bg-primary hover:text-background duration-200'
                            >
                                # {tag?.tag_name}
                            </button>
                        ))}
                    </div>

                </div>

                {/* image and author btn */}
                <div
                    className='w-full h-fit aspect-video relative'
                >
                    <div
                        className='absolute top-0 left-0 z-20 w-full h-fit'
                    >
                        <div
                            className='w-full h-fit p-3 px-4 flex items-start justify-between'
                        >

                            <AuthorBtn
                                author={post?.author}
                                textTheme='light'
                                // hideEmail={true}
                            />

                            <span
                                className='text-background flex items-center gap-1'
                            >
                                <Icon
                                    type={'eye'}
                                    size='20'
                                />
                                {
                                    post?.view_count !== null || post?.view_count !== undefined
                                    ?   formatCompactNumber(post?.view_count)
                                    :   0
                                }
                            </span>
                        </div>

                    </div>
                    <div
                        className='absolute left-0 top-0 w-full rounded h-full bg-black/20'
                    >
                    </div>
                    {
                        post?.thumbnail === null || post?.thumbnail === undefined
                        ?   <div
                                className='w-full h-full flex items-center justify-center text-text'
                            >
                                <Icon
                                    type={'imageStack'}
                                    size='80'
                                />
                            </div>
                        :   <img 
                                src={
                                    Object.prototype.toString.call(post?.thumbnail) === '[object String]'
                                    ?   post?.thumbnail 
                                    :   URL.createObjectURL(post?.thumbnail)} 
                                alt="" 
                                className='rounded w-full h-full'
                            /> 
                    }
                </div>
            </div>

            {/* tags and content */}
            <div
                className='flex flex-col gap-4 w-full h-full'
            >

                {/* likes, dislikes and menu */}
                <div
                    className='flex flex-row items-start gap-5 w-full h-fit justify-between'
                >

                    {/* likes and dislikes */}
                    <div
                        className='flex flex-row items-center gap-1 w-fit'
                    >

                        <button
                            className={`flex flex-row gap-1.5 items-center text-text/70 font-medium  duration-200 text-base/tight ${location.pathname.includes('preview') ? '' : 'hover:text-primary'}`}
                            disabled={location.pathname.includes('preview') ? true : false}
                        >
                            {formatCompactNumber(post?.likes_count)}
                            <Icon
                                type={'like'}
                                pack=''
                            />
                        </button>

                        <Icon
                            type={'circle'}
                            pack='filled'
                            className='text-text/70 size-1.5'
                            size='xs'
                        />

                        <button
                            className={`flex flex-row-reverse gap-1.5 items-center text-text/70 font-medium  duration-200 text-base/tight ${location.pathname.includes('preview') ? '' : 'hover:text-primary'}`}
                            disabled={location.pathname.includes('preview') ? true : false}
                        >
                            {formatCompactNumber(post?.dislikes_count)}
                            <Icon
                                type={'like'}
                                pack=''
                                className='rotate-180'
                            />
                        </button>

                    </div>

                    <div
                        className='relative w-fit h-fit'
                    >
                        <button
                            className='p-1 hover:bg-text/20 rounded-full text-text'
                            onClick={() => setIsDropdownActive(!isDropdownActive)}
                        >
                            <Icon
                                type={'menu'}
                                pack=''
                            />
                        </button>
                        <div
                            className={`${isDropdownActive ? 'flex' : 'hidden'} w-56 h-fit bg-background shadow shadow-text/50 rounded absolute top-8 right-0 z-50 flex-col`}
                        >
                            {
                                menuBtns.map((btn) => (
                                    <button
                                        className='flex flex-row items-center gap-2 justify-start p-2.5 text-sm text-text hover:text-primary hover:bg-secondary/50 duration-200'
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

                <RichTextViewer
                    content={post?.mainContent}
                    className=''
                />

            </div>

        </div>
    )
}

export default ArticleContainer