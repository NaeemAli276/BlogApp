import React, { useState } from 'react'
import TextInput from '../inputs/TextInput'
import DropdownMenu from '../inputs/DropdownMenu'
import RadioBtn from '../btns/RadioBtn'
import PostCard from '../PostPage/PostCard'
import Icon from '../../assets/Icon'
import { useLocation } from 'react-router-dom'

const PostsViewer = ({ 
    posts = [], 
    handlePostSelect, 
    handleSelectNewPost
}) => {

    const location = useLocation()

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

    if (posts?.length <= 0) {
        return (
            <div
                className='bg-background shadow shadow-text/50 rounded col-span-6 row-span-16 flex items-center justify-center w-full h-full flex-col gap-2'
            >
                <div
                    className='flex flex-col gap-1 w-fit h-fit items-center justify-center'
                >
                    <h2
                        className='text-xl/tight font-medium text-text'
                    >
                        No posts
                    </h2>
                    <h3
                        className='text-center text-sm w-3/4 text-text/70'
                    >
                        You currently have no posts, press the button to start making some
                    </h3>
                </div>

                <button
                    onClick={() => handlePostSelect(null, true)}
                    className='bg-primary flex gap-1 rounded hover:bg-secondary hover:text-text duration-200 p-2 px-3 text-background items-center text-sm mt-8'
                >
                    <Icon
                        type={'plus'}
                        className=''
                    />
                    <h2>
                        Create post
                    </h2>
                </button>

            </div>  
        )
    }
    else {
        return (
            <div
                className='flex flex-col gap-2 w-full h-full col-span-6 row-span-16 col-start-1'
            >

                {/* search and filter */}
                <div
                    className='flex flex-row items-start gap-2 w-full h-fit'
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
                            <Icon
                                type={'filter'}
                                size='24'
                            />
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
                        className={`p-2 rounded bg-secondary/50 text-primary hover:bg-primary hover:text-background duration-200 cursor-pointer shadow shadow-text/30 ${location.pathname.includes('My_posts') ? 'flex' : 'hidden'}`}
                        title='New post'
                        onClick={handleSelectNewPost}
                    >
                        <Icon
                            type={'plus'}
                            size='24'
                        />
                    </button>

                </div>

                <div
                    className='flex flex-col gap-2 w-full h-full p-0.5 overflow-y-scroll pb-20 scrollbar-hide'
                >
                    {
                        posts?.map((post) => (
                            <PostCard   
                                key={post.id}
                                post={post} 
                                ftn={location.pathname.includes('My_posts') 
                                    ? () => handlePostSelect(post) 
                                    : () => handlePostSelect(post?.id)}
                            />
                        ))
                    }
                </div>

            </div>
        )
    }

}

export default PostsViewer