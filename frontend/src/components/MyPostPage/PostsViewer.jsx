import React, { useState } from 'react'
import TextInput from '../inputs/TextInput'
import DropdownMenu from '../inputs/DropdownMenu'
import RadioBtn from '../btns/RadioBtn'
import PostCard from '../cards/PostCard'

const PostsViewer = ({ 
    posts, 
    handlePostSelect, 
}) => {

    const [activeFilter, setActiveFilter] = useState('Recent')
    const [isDropdownActive, setIsDropdownActive] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const filterBtns = [
        'Recent',
        'Oldest',
        'Popular',
        'Unpopular'
    ]

    const handleFilter = (filter) => {
        setActiveFilter(filter)
        setIsDropdownActive(false)
    }

    return (
        <div
            className='flex flex-col gap-2 w-full h-full col-span-6 row-span-12 '
        >

            {/* search and filter */}
            <div
                className='flex flex-row items-center gap-2 w-full h-fit'
            >

                <TextInput
                    className={'bg-background shadow shadow-text/20 p-2 rounded outline-none text-text'}
                    placeholder='Search a post...'
                    type='input'
                    text={searchQuery}
                    handleText={(e) => setSearchQuery(e.target.value)}
                />

                <DropdownMenu
                    toggleDropdown={() => setIsDropdownActive(!isDropdownActive)}
                    isDropdownActive={isDropdownActive} 
                    icon={
                        <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M20 2H4c-.55 0-1 .45-1 1v2c0 .22.07.43.2.6L9 13.33V21a1 1 0 0 0 1 1c.15 0 .31-.04.45-.11l4-2A1 1 0 0 0 15 19v-5.67l5.8-7.73c.13-.17.2-.38.2-.6V3c0-.55-.45-1-1-1m-1 2.67-5.8 7.73c-.13.17-.2.38-.2.6v5.38l-2 1V13c0-.22-.07-.43-.2-.6L5 4.67V4h14z"></path></svg>
                    }
                >
                    {
                        filterBtns.map((btn) => (
                            <RadioBtn
                                key={btn}
                                name={btn}
                                isActive={btn === activeFilter}
                                onClick={() => handleFilter(btn)}
                            />
                        ))
                    }                    
                </DropdownMenu>

                <button
                    className='p-2 rounded bg-secondary/50 text-primary hover:bg-primary hover:text-background duration-200 cursor-pointer shadow shadow-text/30'
                    title='New post'
                    onClick={() => handlePostSelect(null, true)}
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path></svg>
                </button>

            </div>

            <div
                className='flex flex-col gap-2 w-full h-full p-0.5 overflow-y-scroll pb-20 scrollbar-hide'
            >
                {
                    posts.map((post) => (
                        <PostCard   
                            key={post.id}
                            post={post} 
                            ftn={() => handlePostSelect(post)}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default PostsViewer