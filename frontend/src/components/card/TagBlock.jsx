import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTags } from '../../api/tags'
import PostTagBtn from '../buttons/PostTagBtn'

const TagBlock = ({ handleTagClick, currentTags }) => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['tags'],
        queryFn: getTags 
    })

    // toggles
    const [expand, setExpand] = useState(true)
    
    // state
    const [selectedTags, setSelectedTags] = useState(currentTags || [])
    const [availableTags, setAvailableTags] = useState([])

    const handleTagChange = (value) => {

        console.log(value)

        if (!selectedTags.includes(value)) {
            setSelectedTags([...selectedTags, value])
            setAvailableTags(availableTags.filter((tag) => tag.id !== value.id))
            handleTagClick(value)
        }
        else {
            setSelectedTags(selectedTags.filter((tag) => tag.id !== value.id))
            setAvailableTags([...availableTags, value])
            handleTagClick(value)
        }

    }

    useEffect(() => {
        if (data) {
            setAvailableTags(data.data);
        }
    }, [data]);


    // useEffect(() => {
    //     console.log(data)
    // }, [data]);
    
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
                    Tags
                </h2>
            </button>

            <div
                className={`${expand ? 'flex' : 'hidden'} flex flex-col gap-2 w-full h-full`}
            >

                {/* selected tags */}
                <div
                    className='flex flex-col gap-5 w-full h-fit'
                >
                    <h2
                        className='w-full pl-1 font-medium text-text dark:text-dark-text'
                    >
                        Selected Tags
                    </h2>
                    <div
                        className='flex flex-row flex-wrap w-full h-fit gap-2'
                    >
                        {   
                            selectedTags.map((tag) => (
                                <PostTagBtn
                                    key={tag?.id}
                                    name={tag?.name}
                                    ftn={() => handleTagChange(tag)}
                                    isSelected={true}
                                />
                            ))
                        }
                    </div>
                </div>

                {/* separator */}
                <span
                    className='w-full min-h-px bg-primary dark:bg-dark-primary'
                ></span>

                {/* all tags */}
                <div
                    className='flex flex-row items-center flex-wrap w-full h-full'
                >
                    {
                        isLoading 
                        ?   <div
                                className='w-full h-full flex flex-row gap-2 items-center justify-center py-20 bg-background rounded'
                            >
                                <svg className='animate-spin text-accent' xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M13 7h-2V2h2zm0 15h-2v-5h2zm9-9h-5v-2h5zM7 13H2v-2h5zm9.24-3.83-.7-.71-.71-.7 1.77-1.77 1.76-1.77.71.71.71.71-1.77 1.76zM5.64 19.78l-.71-.71-.71-.71 1.77-1.76 1.77-1.77.7.71.71.7-1.77 1.77zm12.72 0-1.76-1.77-1.77-1.77.71-.7.7-.71 1.77 1.77 1.77 1.76-.71.71zM7.76 9.17 5.99 7.4 4.22 5.64l.71-.71.71-.71L7.4 5.99l1.77 1.77-.71.7z"></path></svg>
                                <h2
                                    className='text-accent'
                                >
                                    Loading...
                                </h2>
                            </div>
                        :   <div
                                className='w-full h-full flex'
                            >
                                {
                                    availableTags === null
                                    ?   <div    
                                            className='flex flex-col gap-2 bg-background dark:bg-background/5 rounded w-full h-fit py-20 items-center justify-center'
                                        >
                                            <i
                                                className='p-2 bg-primary/20 dark:bg-dark-primary dark:text-dark-text text-primary rounded-full'
                                            >
                                                <svg className='' xmlns="http://www.w3.org/2000/svg" width={56} height={56} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M3 3h4v4H3zm7 0h4v4h-4z"></path><path d="M10 3h4v4h-4zm7 0h4v4h-4zM3 17h4v4H3zm7 0h4v4h-4z"></path><path d="M10 17h4v4h-4zm7 0h4v4h-4zM3 10h4v4H3zm7 0h4v4h-4z"></path><path d="M10 10h4v4h-4zm7 0h4v4h-4z"></path></svg>
                                            </i>
                                            <h2
                                                className='text-xl font-semibold dark:text-dark-text'
                                            >
                                                No Tags
                                            </h2>
                                            <p
                                                className='text-center w-60 text-text/70 dark:text-dark-text/50'
                                            >
                                                Couldn't retrieve any tags, or there wasn't any tags.
                                            </p>
                                        </div>
                                    :   <div
                                            className='flex flex-col gap-5 w-full h-full'
                                        >
                                            <h2
                                                className='w-full pl-1 font-medium text-text dark:text-dark-text'
                                            >
                                                Available Tags
                                            </h2>
                                            <div
                                                className='w-full h-full gap-2 flex flex-row flex-wrap rounded'
                                            >
                                                {
                                                    availableTags?.map((tag) => (
                                                        <PostTagBtn
                                                            key={tag.id}
                                                            name={tag.name}
                                                            ftn={() => handleTagChange(tag)}
                                                            isSelected={false}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                }
                            </div>
                    }
                </div>

            </div>

        </div>
    )
}

export default TagBlock