import React, { useEffect, useState } from 'react'
import TextInput from './TextInput'
import NewBlockWrapper from '../card/NewBlockWrapper'

const PostSlugInput = ({ slug , title, onChange }) => {
    
    // state
    const [expand, setExpand] = useState(true)

    const [currentSlug, setCurrentSlug] = useState(slug)
    
    const handleChangeContent = (e) => {
        setCurrentSlug(e.target.value) 
        onChange(e.target.value)
    }

    const convertTitleToSlug = () => {
        hyphenateAndLowercase(title)
    }

    function hyphenateAndLowercase(text) {
        setCurrentSlug( 
            text.trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, '') // Remove non-word characters except spaces and hyphens
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
        )
    }

    useEffect(() => {
        if (slug === '' && title !== '') {
            hyphenateAndLowercase(title)
        }
    }, [])

    return (

        <div
            className='w-full h-fit flex flex-col gap-5 bg-secondary dark:bg-dark-secondary p-3 rounded-md'
        >
            <button
                className='font-medium flex gap-1 py-0.5 items-center text-primary dark:text-dark-text'
                onClick={() => setExpand(!expand)}
            >
                <svg className={`${expand ? 'rotate-180' : 'rotate-0'} `} xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox="0 0 24 24"><path d="m12 15.41 5.71-5.7-1.42-1.42-4.29 4.3-4.29-4.3-1.42 1.42z"></path></svg>
                <h2 
                    className='flex flex-row'
                >
                    Slug
                </h2>
            </button>
            <div
                className={`${expand ? 'flex' : 'hidden'} w-full h-fit px-1 relative`}
            >
                <TextInput
                    name={'Slug'}
                    value={currentSlug}
                    onChange={handleChangeContent}
                    type={'text'}
                    isRequired={false}
                    placeholderText={'Enter a Slug...'}
                    showName={true}
                    secondaryText={'Type in an appropriate slug, so users can find your posts more easily'}
                    secondaryTextShow={true}
                />
                <button
                    className='w-fit h-fit p-2 top-7.25 right-2 absolute text-primary dark:text-dark-text cursor-pointer'
                    onClick={() => convertTitleToSlug()}
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m10.5 5 1-.67 1 .67-.33-1.17.83-.71L12 3l-.5-1-.5 1-1 .12.83.71zm9.83 8.67L19.5 12l-.83 1.67-1.67.21 1.39 1.18-.56 1.94 1.67-1.11L21.17 17l-.56-1.94L22 13.88zM4.83 9 6.5 7.89 8.17 9l-.56-1.95L9 5.88l-1.67-.21L6.5 4l-.83 1.67L4 5.88l1.39 1.17zm13.88-6.71a.996.996 0 0 0-1.41 0l-15.01 15a.996.996 0 0 0 0 1.41l3 3c.2.2.45.29.71.29s.51-.1.71-.29l15-15a.996.996 0 0 0 0-1.41zM6 19.59 4.41 18l9.09-9.09 1.59 1.59zm10.5-10.5L14.91 7.5 18 4.41 19.59 6z"></path></svg> 
                </button>
            </div>
        </div>
    )
}

export default PostSlugInput