import React, { useState } from 'react'
import DropDownBox from './DropDownBox'
import TitleBox from './TitleBox'
import FeaturedImage from './FeaturedImage'

const PostHandlerContainer = ({ data }) => {

    const tabs = ['Featured', 'Content', 'SEO']
    const [currentTab, setCurrentTab] = useState('Featured')


    // featured tab
    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState(null)


    // functions

    const handleThumbnail = (image) => {
        if (thumbnail === image) {
            setThumbnail(null)
        }
        else {
            setThumbnail(image)
        }
    }


    return (
        <div
            className='col-span-11 w-full row-span-16 rounded border-2 border-primary flex flex-col h-full '
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
                className='p-5 w-full h-9/10 flex flex-col'
            >

                {/* featured */}
                <div
                    className={`${currentTab === 'Featured' ? 'flex' : 'hidden'} flex-col gap-4 w-full overflow-y-scroll pb-10 `}
                >
                    <TitleBox
                        title={title}
                        setTitle={setTitle}
                    />
                    <FeaturedImage
                        handleThumbnail={handleThumbnail}
                        image={thumbnail}
                    />
                </div>
                
            </div>

        </div>
    )
}

export default PostHandlerContainer