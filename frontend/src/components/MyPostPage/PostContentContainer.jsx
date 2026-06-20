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
import Icon  from '../../assets/Icon'

const PostContentContainer = ({ 
    postView = 0,
    selectedPost = {}
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
        // setPost({ ...post, excerpt: contentHTML })
    }

    // content tab

    const handleArticleChange = (contentHTML) => {
        // setPost({ ...post , mainContent: contentHTML })
    }

    // SEO tab

    const handleSEOChange = (data, attr) => {
        // setPost({ ...post, [attr]: data })
    }

    const handleTagChange = (tag) => {

        // if (post.tags.includes(tag)) {
        //     const filterTags = post.tags.filter((currentTag) => currentTag !== tag)
        //     setPost({...post, tags: filterTags })
        // }
        // else {
        //     setPost({...post, tags: [...post.tags, tag]})
        // }

    }

    const handleCategoryChange = (cat) => {
        // setPost({...post, category: cat})
    }

    if (postView === 0) {
        return (
            <div
                className='w-full h-full col-span-10 row-span-full col-start-7 bg-background shadow shadow-text/50 rounded flex flex-col gap-2 items-center justify-center'
            >
                
                <Icon
                    type={'cardView'}
                    size='2xl'
                    className='text-text/50'
                />

                <div
                    className='flex flex-col gap-1 items-center justify-center text-center'
                >
                    <h2
                        className='font-medium text-xl'
                    >
                        No post selected
                    </h2>
                    <p
                        className='w-3/5 text-text/70'
                    >
                        Select a post to start updating or, press the create button so start a new post
                    </p>
                </div>

            </div>
        )
    }
    else {
        return (
            <div
                className='flex flex-col w-full h-full col-span-10 col-start-7 row-span-full bg-background shadow shadow-text/50 rounded relative overflow-hidden gap-4 pb-10'
            >

                {/* tabs */}
                <div
                    className='w-full h-fit bg-secondary flex flex-row items-center'
                >
                    {
                        tabs?.map((tab, index) => (
                            <button
                                onClick={() => setCurrentTab(tab)}
                                className={`p-2 text-sm px-3 font-medium cursor-pointer
                                    ${index <= 0 && 'rounded-tl'}
                                    ${currentTab === tab ? 'bg-background text-primary' : 'bg-secondary text-text'}    
                                `}
                            >
                                {tab}
                            </button>
                        ))
                    }
                </div>

                {/* featured */}
                <div
                    className={`${currentTab === 'Featured' ? 'flex' : 'hidden'} flex flex-col gap-3 px-5  overflow-y-scroll pb-10`}
                >
                    
                    <TitleBlock
                        title={post?.title}
                        setTitle={(e) => setPost({...post, title: e.target.value})}
                    />

                    <FeaturedImageBlock
                        image={post?.thumbnail}
                        handleThumbnail={handleThumbnail}
                    />

                </div>

            </div>
        )
    }
    

}

export default PostContentContainer