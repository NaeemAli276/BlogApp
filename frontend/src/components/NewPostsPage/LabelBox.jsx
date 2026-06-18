import React, { useEffect, useState } from 'react'
import DropDownBox from './DropDownBox'
import TagBtn from '../btns/TagBtn'
import TextInput from '../inputs/TextInput'
import Icon from '../../assets/Icon'
import { useQuery } from '@tanstack/react-query'
import { getTags } from '../../apis/TagApi'
import { getCategories } from '../../apis/CategoryApi'

const LabelBox = ({ 
    currentTags = [], 
    currentCategory = 'None', 
    handleCategoryChange,
    handleTagChange
}) => {

    // toggles
    const [isCategoryDropdownActive, setIsCategoryDropdownActive] = useState(false)
    const [isTagsDropdownActive, setIsTagsDropdownActive] = useState(false)

    const [tags, setTags] = useState([ // the tags to be fetched from backend
        "javascript",
        "programming",
        "webdev",
        "react",
        "nodejs",
        "html",
        "css",
        "frontend",
        "backend",
    ])
    const [categories, setCategories] = useState([
        'Health',
        'Food',
        'Coding',
        'Nature',
        'Lifestyle'
    ])
    const [searchInput, setSearchInput] = useState('')
    
    const [selectedCategory, setSelectedCategory] = useState(currentCategory)

    const handleCategoryClick = (cat) => {
        handleCategoryChange(cat)
        setSelectedCategory(cat)
        setIsCategoryDropdownActive(false)
    }

    const handleActiveTags = () => {
        const filterTags = tags.filter((tag) => !currentTags.includes(tag))
        setTags(filterTags)
    }

    const handleTagClick = (tag) => {

        if (handleTagChange(tag) === false) {
            setTags([...tags, tag])
        }
        else if (handleTagChange(tag) === true) {
            const filterTags = tags.filter((currentTag) => currentTag !== tag)
            setTags(filterTags)
        }

    }

    const { isLoading, error, data } = useQuery({
        queryFn: getTags,
        queryKey: ['get_labels']
    })

    useEffect(() => {
        handleActiveTags()
    } ,[])

    useEffect(() => {
        console.log(data)
    }, [data])

    if (isLoading) {
        return (
            <DropDownBox
                name='Category & Tags'
            > 
                <div
                    className='min-h-56 w-full rounded bg-background flex items-center justify-center'
                >
                    <Icon
                        className='animate-spin to-text'
                        type={'spinner'}
                    />
                </div>
            </DropDownBox>
        )
    }
    else if (error) {
        return (
            <DropDownBox
                name='Category & Tags'
            > 
                <div
                    className='min-h-56 rounded bg-background items-center justify-center flex flex-col gap-2 text-text/80 w-full'
                >
                    <Icon
                        type={'sad'}
                        size='xl'
                        className='text-text'
                    />
                    <h3
                        className='w-1/3 text-center'
                    >
                        An error has occured, please try reloading the page
                    </h3>
                </div>
            </DropDownBox>    
        )
    }
    else {
        return (
            <DropDownBox
                name='Category & Tags'
            >   
                
                {/* container */}
                <div
                    className='flex flex-col gap-5 w-full h-full bg-background p-2 px-3 rounded '
                >

                    {/* categories dropdown */}
                    <div
                        className='flex flex-col w-full h-fit relative gap-1'
                    >

                        <h4
                            className='text-text pl-0.5'
                        >
                            Category 
                        </h4>

                        {/* btn */}
                        <button
                            className={`w-full h-fit p-2 rounded border-2 border-primary ${selectedCategory !== 'None' ? 'text-text' : 'text-text/70'} text-start px-3 flex-row flex justify-between items-center cursor-pointer`}
                            type='button'
                            onClick={() => setIsCategoryDropdownActive(!isCategoryDropdownActive)}
                        >
                            {selectedCategory}
                            <i 
                                className={isCategoryDropdownActive ? 'rotate-0 mb-0.5' : 'rotate-180 mb-0.5'}
                            >
                                <Icon
                                    type={'caret'}
                                />
                            </i>
                        </button>

                        <div
                            className={`${isCategoryDropdownActive ? 'flex' : 'hidden'} w-full h-fit  top-20 right-0 bg-background flex flex-col shadow shadow-text/50 rounded z-50 mt-1`}
                        >
                            {
                                categories.map((cat, index) => (
                                    <button
                                        onClick={() => handleCategoryClick(cat)}
                                        key={cat}
                                        className={`p-2 px-3 text-start duration-200 cursor-pointer 
                                            ${index === 0 && 'rounded-t'} 
                                            ${index === categories.length - 1 && 'rounded-b'}
                                            ${selectedCategory === cat ? 'bg-primary text-background' : 'bg-background text-text  hover:bg-secondary/50 hover:text-primary'}    
                                        `} 
                                        type='button'
                                    >
                                        {cat}
                                    </button>
                                ))
                            }
                        </div>

                    </div>

                    {/* tags container */}
                    <div
                        className='flex flex-col w-full h-fit gap-1'
                    >

                        <h4
                            className='text-text pl-0.5'
                        >
                            Tags
                        </h4>

                        <div
                            className='w-full h-full flex relative flex-col gap-2'
                        >

                            {/* tags btn */}
                            <div
                                className='w-full h-fit p-2 rounded border-2 border-primary text-text text-start px-3 flex-row flex justify-between items-center cursor-pointer'
                                type='button'
                            >
                                <div
                                    className='flex flex-row items-center gap-2 w-full h-fit overflow-x-scroll scrollbar-hide'
                                >
                                    {
                                        currentTags.length <= 0 
                                        ?   <span
                                                className='font-medium text-text/50'
                                            >
                                                No tags selected
                                            </span> 
                                        :   currentTags.map((tag) => (
                                                <TagBtn
                                                    key={tag}
                                                    name={tag}
                                                    handleSelectTag={() => handleTagClick(tag)}
                                                />
                                            ))
                                    }
                                    
                                </div>
                                
                                <Icon
                                    type={'caret'}
                                    className={`${isTagsDropdownActive ? 'rotate-0' : 'rotate-180'}`}
                                    onClick={() => setIsTagsDropdownActive(!isTagsDropdownActive)}
                                />
                            </div>

                            <div
                                className={`${isTagsDropdownActive ? 'flex' : 'hidden'} w-full top-13 right-0 h-fit flex-col gap-5 bg-background shadow shadow-text/50 px-3.5 p-3 rounded`}
                            >

                                <TextInput
                                    placeholder='Search tags...'
                                    name={'Tags'}
                                    text={searchInput}
                                    handleText={(e) => setSearchInput(e.target.value)}
                                />

                                <div
                                    className='flex flex-wrap gap-2 w-full h-fit'
                                >
                                    {
                                        tags.map((tag) => (
                                            <TagBtn
                                                key={tag}
                                                name={tag}
                                                handleSelectTag={() => handleTagClick(tag)}
                                            />
                                        ))
                                    }
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </DropDownBox>
        )
    }

    
}

export default LabelBox