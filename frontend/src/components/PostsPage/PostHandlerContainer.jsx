import React, { useEffect, useState } from 'react'
import DropDownBox from './DropDownBox'
import TitleBlock from './TitleBlock'
import FeaturedImageBlock from './FeaturedImageBlock'
import RichTextEditorBlock from './RichTextEditorBlock'
import RichTextInput from '../inputs/RichTextInput'
import Toolbar from '../btns/Toolbar'
import ArticleTab from './ArticleTab'

const PostHandlerContainer = ({ data }) => {

    const tabs = ['Featured', 'Content', 'SEO']
    const [currentTab, setCurrentTab] = useState('Content')

    const [featuredTab, setFeaturedTab] = useState({
        title: '',
        thumbnail: null,
        excerpt: ''        
    })

    const [articleTab, setArticleTab] = useState('')
    
    // featured tab

    const handleThumbnail = (image) => {
        if (featuredTab.thumbnail === image) {
            setFeaturedTab({...featuredTab, thumbnail: null})
        }
        else {
            setFeaturedTab({...featuredTab, thumbnail: image})
        }
    }

    const handleExcerpt = (contentHTML) => {
        setFeaturedTab({ ...featuredTab, excerpt: contentHTML })
    }

    // content tab

    const handleArticleChange = (contentHTML) => {
        setArticleTab(contentHTML)
    }


    useEffect(() => {
        console.log(featuredTab)
    }, [featuredTab])


    return (
        <div
            className='col-span-11 w-full row-span-16 rounded border-2 border-primary flex flex-col h-full'
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
                        title={featuredTab.title}
                        setTitle={(e) => setFeaturedTab({...featuredTab, title: e.target.value})}
                    />
                    <FeaturedImageBlock
                        handleThumbnail={handleThumbnail}
                        image={featuredTab.thumbnail}
                    />
                    <RichTextEditorBlock
                        content={featuredTab.excerpt}
                        handleChangeContent={handleExcerpt}
                    />
                </div>

                {/* content tab */}
                <div
                    className={`${currentTab === 'Content' ? 'flex' : 'hidden'} flex-col gap-4 w-full h-full overflow-hidden p-3`}
                >
                    <ArticleTab
                        content={articleTab}
                        handleChangeContent={handleArticleChange}
                    />
                    {/* <RichTextInput
                        content={articleTab}
                        handleChangeContent={handleArticleChange}
                    /> */}
                </div>

            </div>

        </div>
    )
}

export default PostHandlerContainer