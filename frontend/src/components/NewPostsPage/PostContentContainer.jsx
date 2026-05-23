import React, { useEffect, useState } from 'react'
import DropDownBox from './DropDownBox'
import TitleBlock from './TitleBlock'
import FeaturedImageBlock from './FeaturedImageBlock'
import RichTextEditorBlock from './RichTextEditorBlock'
import RichTextInput from '../inputs/RichTextInput'
import Toolbar from '../btns/Toolbar'
import ArticleTab from './ArticleTab'
import UrlBox from './UrlBox'
import LabelBox from './LabelBox'
import { Link } from 'react-router-dom'

const PostContentContainer = ({ 
    selectedPost = {},
    isNewPost = false
}) => {

    const tabs = ['Featured', 'Content', 'SEO']
    const [currentTab, setCurrentTab] = useState('Featured')
    const [post, setPost] = useState(selectedPost)

    // featured tab

    const handleThumbnail = (image) => {
        if (post.thumbnail === image) {
            setPost({...post, thumbnail: null})
        }
        else {
            setPost({...post, thumbnail: image})
        }
    }

    const handleExcerpt = (contentHTML) => {
        setPost({ ...post, excerpt: contentHTML })
    }

    // content tab

    const handleArticleChange = (contentHTML) => {
        setPost({ ...post , mainContent: contentHTML })
    }

    // SEO tab

    const handleSEOChange = (data, attr) => {

        setPost({ ...post, [attr]: data })

    }

    const handleTagChange = (tag) => {

        if (post.tags.includes(tag)) {
            const filterTags = post.tags.filter((currentTag) => currentTag !== tag)
            setPost({...post, tags: filterTags })
            return false // add it to the selected tags in the labelBox
        }
        else {
            setPost({...post, tags: [...post.tags, tag]})
            return true // remove it from the selected tags in the labelBox
        }

    }

    const handleCategoryChange = (cat) => {
        setPost({...post, category: cat})
    }

    useEffect(() => {
        setPost(selectedPost)
    }, [selectedPost])

    return (
        <form
            className='col-span-10 w-full row-span-12 rounded bg-background flex flex-col h-full shadow shadow-text/40 mt-1'
            // onClick={(e) => { e.preventDefault() }}
        >

            {/* tabs */}
            <div
                className='bg-secondary/70 w-full rounded-t h-fit flex flex-row'
            >
                {
                    tabs.map((tab, index) => (
                        <button 
                            key={tab}
                            className={` ${index === 0 && 'rounded-tl'} ${currentTab === tab ? 'bg-background text-primary' : 'text-text'} cursor-pointer p-2 px-3 text-sm font-medium`}
                            onClick={() => setCurrentTab(tab)}
                            type='button'
                        >
                            {tab}
                        </button>
                    ))
                }
            </div>

            {/* normal wrapper */}
            <div
                className=' w-full h-full flex flex-col overflow-hidden relative pb-10'
            >

                {/* featured tab */}
                <div
                    className={`${currentTab === 'Featured' ? 'flex' : 'hidden'} p-5 flex-col gap-4 w-full overflow-y-scroll scrollbar-hide h-full`}
                >
                    <TitleBlock
                        title={post.title}
                        setTitle={(e) => setPost({...post, title: e.target.value})}
                    />
                    <FeaturedImageBlock
                        handleThumbnail={handleThumbnail}
                        image={post.thumbnail}
                        
                    />
                    <RichTextEditorBlock
                        wordLimit={1000}
                        content={post.excerpt}
                        handleChangeContent={handleExcerpt}
                        hiddenComm={['headings', 'align', 'code', 'lists']}
                    />
                </div>

                {/* content tab */}
                <div
                    className={`${currentTab === 'Content' ? 'flex' : 'hidden'} flex-col gap-4 w-full h-full overflow-hidden p-3`}
                >
                    <ArticleTab
                        content={post.mainContent}
                        handleChangeContent={handleArticleChange}
                    />
                    {/* <RichTextInput
                        content={articleTab}
                        handleChangeContent={handleArticleChange}
                    /> */}
                </div>

                {/* SEO tab */}
                <div
                    className={`${currentTab === 'SEO' ? 'flex' : 'hidden'} p-5 flex-col gap-4 w-full overflow-y-scroll scrollbar-hide h-full`}
                >

                    <LabelBox
                        handleCategoryChange={handleCategoryChange}
                        handleTagChange={handleTagChange}
                        currentCategory={post.category}
                        currentTags={post.tags}
                    />

                    <UrlBox
                        titleStr={post.title}
                        handleUrlChange={handleSEOChange}
                    />

                </div>
                    
                {/* preview and create/update btn */}
                <div
                    className='absolute left-0 bottom-0 w-full h-fit bg-background flex flex-row items-center justify-end gap-2 p-2 rounded-b'
                >
                    <Link 
                        to={`/${post.url}`}
                        state={{ post:post }}
                        className='p-2 px-3 rounded bg-secondary/50 flex flex-row items-center gap-2 text-sm text-primary hover:bg-primary hover:text-background duration-200'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 256">
                            <path fill="currentColor" d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.5 133.5 0 0 1 25 128a133.3 133.3 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.5 133.5 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32"></path>
                        </svg>
                        <span>
                            Preview
                        </span>
                    </Link >
                    <button
                        className='p-2 px-3 rounded bg-primary flex flex-row items-center gap-2 text-sm text-background hover:bg-text/80 duration-200'
                    >
                        {
                            isNewPost === true // new post
                            ?   <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 256">
                                        <path fill="currentColor" d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8"></path>
                                    </svg>
                                    Create
                                </>
                            :   <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path fill="currentColor" d="M12.02 20q-1.664 0-3.119-.626T6.359 17.66t-1.714-2.542T4.02 12t.626-3.118T6.36 6.34T8.9 4.626T12.019 4q1.723 0 3.282.712q1.559.711 2.718 1.984V4.808q0-.214.144-.357t.356-.143t.357.143t.143.357v2.846q0 .348-.23.578t-.578.23h-2.845q-.214 0-.357-.144t-.143-.357t.143-.356t.357-.144h1.98q-1.044-1.15-2.41-1.805Q13.572 5 12.02 5Q9.094 5 7.057 7.038T5.019 12t2.038 4.963T12.019 19q2.472 0 4.375-1.55t2.447-3.934q.067-.228.228-.35q.162-.124.37-.093q.232.03.338.218t.044.409q-.571 2.764-2.746 4.532T12.019 20m.5-8.208l3 3q.14.14.15.344q.01.205-.15.364q-.16.16-.354.16t-.353-.16l-3.05-3.05q-.131-.13-.187-.27t-.056-.301V7.5q0-.213.144-.357T12.019 7t.357.143t.143.357z" stroke-width="0.2" stroke="currentColor" />
                                    </svg>

                                    Update                            
                                </>
                        }
                    </button>
                </div>

            </div>

        </form>
    )
}

export default PostContentContainer