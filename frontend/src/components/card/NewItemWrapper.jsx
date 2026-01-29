import React, { useState } from 'react'
import NewItemWrapperBtn from '../buttons/NewItemWrapperBtn'
import ImageInput from '../inputs/ImageInput'
import TextInput from '../inputs/TextInput'
import NewPostTitleInput from '../inputs/PostTitleInput'
import PostParagraphInput from '../inputs/PostParagraphInput'
import PostHeadingInput from '../inputs/PostHeadingInput'

const NewItemWrapper = ({ block, changeIndex, deleteFtn, index, changeValue }) => {
    
    const [expand, setExpand] = useState(true)

    const optionBtns = [
        {
            name: 'trash',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox="0 0 24 24"><path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>,
            ftn: deleteFtn
        },
        {
            name: 'up',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox="0 0 24 24"><path d="M13 18v-6h4l-5-6-5 6h4v6z"></path></svg>,
            ftn: () => changeIndex('up',index)
        },
        {
            name: 'down',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox="0 0 24 24" transform={"rotate(180)"}><path d="M13 18v-6h4l-5-6-5 6h4v6z"></path></svg>,
            ftn: () => changeIndex('down', index)   
        },
    ]

    // just checks if its a thumbnail or title, can't be deleted
    const restricted = ['Title', 'Thumbnail']

    return (
        <div
            className='w-full h-fit bg-dark-background/10 dark:bg-dark-background/20 p-3 rounded-md flex flex-col gap-5'
        >
            <div
                className='flex flex-row items-center justify-between'
            >
                <button
                    className='font-medium flex gap-1 py-0.5 items-center text-primary dark:text-dark-text'
                    onClick={() => setExpand(!expand)}
                >
                    <svg className={`${expand ? 'rotate-180' : 'rotate-0'} `} xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox="0 0 24 24"><path d="m12 15.41 5.71-5.7-1.42-1.42-4.29 4.3-4.29-4.3-1.42 1.42z"></path></svg>
                    <h2 
                        className='flex flex-row'>
                            {block.type} <span className={`${!restricted.includes(block.type) ? 'hidden' : 'block'} text-rose-500`}>*</span> 
                    </h2>
                </button>
                <div
                    className={`${restricted.includes(block.type) ? 'hidden' : 'flex'} flex-row items-center w-fit h-fit border-text/5 border rounded`}
                >
                    {
                        optionBtns.map((btn, index) => (
                            <NewItemWrapperBtn
                                icon={btn.icon}
                                index={index}
                                maxlength={optionBtns.length}
                                ftn={btn.ftn}
                            />
                        ))
                    }
                </div>

            </div>
            <div
                className={`w-full h-full px-1 ${expand ? 'flex' : 'hidden'}`}
            >
                {
                    (block?.type === 'Title')
                    &&  <NewPostTitleInput
                            id={block?.id}
                            value={block?.content}
                            onChange={changeValue}
                        />
                }
                {
                    (block?.type === 'Image' || block?.type === 'Thumbnail') 
                    &&  <ImageInput
                            id={block?.id}
                            value={block?.file}
                            onChange={changeValue}
                            secondaryText={'Preferred size (1920 X 1080)'}
                            secondaryTextShow={true}
                        />
                }
                {
                    (block?.type === 'Paragraph')
                    &&  <PostParagraphInput
                            id={block?.id}
                            value={block?.content}
                            onChange={changeValue}
                        />
                }
                {
                    (block?.type === 'Heading')
                    &&  <PostHeadingInput
                            id={block?.id}
                            content={block?.content}
                            headingType={block?.headingType}
                            onChange={changeValue}
                        />
                }
            </div>
            
        </div>
    )
}

export default NewItemWrapper

