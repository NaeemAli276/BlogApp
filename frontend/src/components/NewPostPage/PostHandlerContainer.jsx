import React, { useState } from 'react'

const PostHandlerContainer = () => {

    const tabs = ['Featured', 'Content', 'SEO']
    const [currentTab, setCurrentTab] = useState('Featured')


    // featured tab



    return (
        <div
            className='col-span-11 w-full row-span-15 rounded border-2 border-primary flex flex-col gap-2 h-full'
        >

            {/* tabs */}
            <div
                className='bg-secondary w-full rounded-t'
            >
                {
                    tabs.map((tab, index) => (
                        <button
                            className={` ${index === 0 && 'rounded-tl'} ${currentTab === tab ? 'bg-background text-primary' : 'bg-secondary text-text'} cursor-pointer p-2 px-3 text-sm font-medium`}
                            onClick={() => setCurrentTab(tab)}
                        >
                            {tab}
                        </button>
                    ))
                }
            </div>

            {/* featured tab */}
            <div
                className={`${currentTab === 'Featured' ? 'flex' : 'hidden'} p-3`}
            >
                featured
            </div>

        </div>
    )
}

export default PostHandlerContainer