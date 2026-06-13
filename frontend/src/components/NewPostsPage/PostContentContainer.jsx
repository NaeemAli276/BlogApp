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
import { Icon } from '../icon'

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
                        <Icon
                            type={'eye'}
                            size={'sm'}
                        />
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
                                    <Icon
                                        type={'plus'}
                                    />
                                    Create
                                </>
                            :   <>
                                    <Icon
                                        type={'update'}
                                    />
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