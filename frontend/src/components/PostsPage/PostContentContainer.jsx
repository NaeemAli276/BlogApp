import React, { useEffect, useState } from 'react'
import DropDownBox from './DropDownBox'
import TitleBlock from './TitleBlock'
import FeaturedImageBlock from './FeaturedImageBlock'
import RichTextEditorBlock from './RichTextEditorBlock'
import RichTextInput from '../inputs/RichTextInput'
import Toolbar from '../btns/Toolbar'
import ArticleTab from './ArticleTab'
import UrlBox from './UrlBox'
import TagsBox from './TagsBox'

const PostContentContainer = ({ data }) => {

    const tabs = ['Featured', 'Content', 'SEO']
    const [currentTab, setCurrentTab] = useState('Featured')
    const [post, setPost] = useState({ // where everything about the post is going to be stored
        title: '',
        thumbnail: null,
        excerpt: '',
        mainContent: '',
        url: '',
        tags: [],
        metaDesc: '',
    })

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

    const handleTagChange = (selectedTag, availableTags) => {

        if (post.tags.includes(selectedTag)) { // checks if the tag is already selected
            
            // filters out the tag
            const filteredTags = post.tags.filter(tag => tag !== selectedTag)
            // adds the tag
            setPost({ ...post, tags: filteredTags })

            return [...availableTags, selectedTag]

        }
        else { // adds the tag to the post tags

            // add the tag to the post
            setPost({ ...post, tags: [...post.tags, selectedTag] })

            // gets rid of the tag for the available tag array
            const filteredTags = availableTags.filter(tag => tag !== selectedTag)

            return filteredTags

        }

    }

    // useEffect(() => {
    //     console.log(post)
    // }, [post])

    return (
        <form
            className='col-span-11 w-full row-span-16 rounded border-2 border-primary bg-background flex flex-col h-full shadow shadow-text/40'
            // onClick={(e) => { e.preventDefault() }}
        >

            {/* tabs */}
            <div
                className='bg-secondary w-full rounded-t h-fit flex flex-row'
            >
                {
                    tabs.map((tab, index) => (
                        <button 
                            key={tab}
                            className={` ${index === 0 && 'rounded-tl'} ${currentTab === tab ? 'bg-background text-primary' : 'bg-secondary text-text'} cursor-pointer p-2 px-3 text-sm font-medium`}
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
                className=' w-full h-full flex flex-col overflow-hidden '
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

                    <UrlBox
                        titleStr={post.title}
                        handleUrlChange={handleSEOChange}
                    />

                    <TagsBox
                        handleTagChange={handleTagChange}
                        currentTags={post.tags}
                    />

                </div>

            </div>

        </form>
    )
}

export default PostContentContainer