import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/layout/dashboard/DashboardLayout'
import TextInput from '../components/inputs/TextInput'
import NewBlockWrapper from '../components/card/NewBlockWrapper'
import CreateBlockBtn from '../components/buttons/CreateBlockBtn'
import JsonViewer from '../components/general/JsonViewer'
import PostSlugInput from '../components/inputs/PostSlugInput'
import TagBlock from '../components/card/TagBlock'
import GeneralBtn from '../components/buttons/GeneralBtn'
import SmallCard from '../components/card/SmallCard'
import CategoryDropdown from '../components/inputs/CategoryDropdown'
import { getCurrentTime } from '../utils/DateUtils'
import ToggleCard from '../components/card/ToggleCard'
import ViewPostCard from '../components/card/ViewPostCard'


const CreatePostPage = () => {

    // toggles
    const [toggleView, setToggleView] = useState(false)

    const [postDetails, setPostDetails] = useState({
        title: '',
        json_blocks: [
            {
                id: 0,
                type: 'Title',
                sort_order: 0,
                content: ''
            },
            {
                id: 1,
                type: 'Thumbnail',
                sort_order: 1,
                path_url: null,
                file: null
            }
        ],
        slug: '',
        tags: [],
        category: null,
        viewable: true
    }) 
    const [totalBlocks, setTotalBlocks] = useState(2)
    const [selectedNav, setSelectedNav] = useState('SEO')

    const navBtns = ['Content', 'SEO', 'JSON']
    const blocktypes = [
        {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox="0 0 24 24"><path d="M4 10c0 3.31 2.69 6 6 6h2v4h2V6h2v14h2V6h3V4H10c-3.31 0-6 2.69-6 6m8 4h-2c-2.21 0-4-1.79-4-4s1.79-4 4-4h2z"></path></svg>,
            name: 'Paragraph'
        },
        {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox="0 0 24 24"><path d="M21 14V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h9v-2H5v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V14h2Zm-4.29-5.71a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14v5.59L16.73 8.3Z"></path><path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M21 16h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></svg>,
            name: 'Image'
        },
        {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox="0 0 24 24"><path d="M7 5v14h2v-6h6v6h2V5h-2v6H9V5z"></path></svg>,
            name: 'Heading'
        },
        {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M9.88 18.36a3 3 0 0 1-4.24 0 3 3 0 0 1 0-4.24l2.83-2.83-1.41-1.41-2.83 2.83a5.003 5.003 0 0 0 0 7.07c.98.97 2.25 1.46 3.54 1.46s2.56-.49 3.54-1.46l2.83-2.83-1.41-1.41-2.83 2.83Zm2.83-14.14L9.88 7.05l1.41 1.41 2.83-2.83a3 3 0 0 1 4.24 0 3 3 0 0 1 0 4.24l-2.83 2.83 1.41 1.41 2.83-2.83a5.003 5.003 0 0 0 0-7.07 5.003 5.003 0 0 0-7.07 0Z"></path><path d="m16.95 8.46-.71-.7-.7-.71-4.25 4.24-4.24 4.25.71.7.7.71 4.25-4.24z"></path></svg>,
            name: 'Hyperlink'
        }
    ]
    const btns = [
        {
            name: 'View',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path></svg>,
            colour: 'normal',
            ftn: () => toggleViewBtn()
        },
        {
            name: 'Publish',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M4 4h16v2H4zm8 4-5 6h4v7h2v-7h4z"></path></svg>,
            colour: 'primary',
            ftn: () => handlePublishBtn()
        },
    ]
    const date_time = [
        {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M5 20V8h14V6v14z"></path></svg>,
            purpose: new Date().toLocaleDateString('en-GB')
        },
        {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M12 2C6.58 2 2 6.58 2 12s4.58 10 10 10 10-4.58 10-10S17.42 2 12 2m0 18c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8-3.66 8-8 8"></path><path d="M13 7h-2v6h6v-2h-4z"></path></svg>,
            purpose: getCurrentTime().formatted
        }
    ]

    // json block functions
    ///////////////////////////////////////////////////////////////////////////////////

    const handleAddNewBlock = (type) => {

        if (type === 'Paragraph') {

            setPostDetails({
                ...postDetails, 
                json_blocks: [...postDetails.json_blocks, {
                    id: postDetails.json_blocks.length,
                    type: 'Paragraph',
                    sort_order: totalBlocks,
                    content: ''
                }]
            })

        }

        else if (type === 'Heading') {

            setPostDetails({
                ...postDetails, 
                json_blocks: [...postDetails.json_blocks, {
                    id: postDetails.json_blocks.length,
                    type: 'Heading',
                    sort_order: totalBlocks,
                    content: '',
                    headingType: 'H1'
                }]
            })

        }

        else if (type === 'Image') {

            setPostDetails({
                ...postDetails, 
                json_blocks: [...postDetails.json_blocks, {
                    id: postDetails.json_blocks.length,
                    type: 'Image',
                    sort_order: totalBlocks,
                    path_url: null,
                    file: null
                }]
            })

        }

        else if (type === 'Hyperlink') {

            setPostDetails({
                ...postDetails, 
                json_blocks: [...postDetails.json_blocks, {
                    id: postDetails.json_blocks.length,
                    type: 'Hyperlink',
                    sort_order: totalBlocks,
                    text: '',
                    link: ''
                }]
            })

        }

        // else if (type === 'Code') {

        //     setPostDetails({
        //         ...postDetails, 
        //         json_blocks: [...postDetails.json_blocks, {
        //             id: postDetails.json_blocks.length,
        //             type: 'Code',
        //             code: ''
        //         }]
        //     })

        // }

        setTotalBlocks(totalBlocks + 1)

    }

    const handleChangeBlockIndex = (type, index) => {

        if (type === 'up') {

            if (index <= 2) return
            else {
                const newItems = [...postDetails.json_blocks];

                // Swap current item with previous item
                [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
                setPostDetails({...postDetails, json_blocks: newItems});
            }

        }
        else {

            if (index >= postDetails.json_blocks.length - 1) return
            else {
                const newItems = [...postDetails.json_blocks];

                // Swap current item with previous item
                [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
                setPostDetails({...postDetails, json_blocks: newItems});
            }

        }

    }

    const handleDeleteBlock = (id) => {
        
        const filteredItems = postDetails.json_blocks.filter(prev => prev.id !== id)

        setPostDetails({...postDetails, json_blocks: filteredItems})

    }

    const handleChangeBlockValue = (id, value, type) => {

        // image blocks
        if (type === 'Image' || type === 'Thumbnail') {

            if (value === null) {

                setPostDetails((prevPosts) => ({
                    ...prevPosts,
                    json_blocks: prevPosts.json_blocks.map(block =>
                        block.id === id 
                        ? { ...block, path_url: null, file: null } 
                        : block
                    )
                }))

            }
            else {
                setPostDetails((prevPosts) => ({
                    ...prevPosts,
                    json_blocks: prevPosts.json_blocks.map(block =>
                        block.id === id 
                        ? { ...block, path_url: value.name, file: value } 
                        : block
                    )
                }))
            }
            
        }

        else if (type === 'Title') {

            setPostDetails({
                ...postDetails,
                title: value
            })

        }

        else if (type === 'Paragraph') {

            setPostDetails((prevPosts) => ({
                ...prevPosts,
                json_blocks: prevPosts.json_blocks.map(block =>
                    block.id === id 
                    ? { ...block, content: value } 
                    : block
                )
            }))

        }

        else if (type === 'Heading') {

            setPostDetails((prevPosts) => ({
                ...prevPosts,
                json_blocks: prevPosts.json_blocks.map(block =>
                    block.id === id 
                    ? { ...block, content: value.content, headingType: value.headingType } 
                    : block
                )
            }))

        }

        else if (type === 'Hyperlink') {

            setPostDetails((prevPosts) => ({
                ...prevPosts,
                json_blocks: prevPosts.json_blocks.map(block =>
                    block.id === id 
                    ? { ...block, link: value.link, text: value.text } 
                    : block
                )
            }))

        }

    }

    ///////////////////////////////////////////////////////////////////////////////////

    // SEO functions
    ///////////////////////////////////////////////////////////////////////////////////

    const handleChangeSlug = (value) => {
        setPostDetails({
            ...postDetails,
            slug: value
        })
    }

    const handleTagClick = (value) => {

        if (!postDetails.tags.includes(value)) {

            setPostDetails({
                ...postDetails,
                tags: [...postDetails.tags, value]
            })

        }
        else {

            const filteredTags = postDetails.tags.filter(tag => tag.id !== value?.id)
            setPostDetails({
                ...postDetails,
                tags: filteredTags
            }) 

        }

    }

    const handleCategoryClick = (value) => {

        setPostDetails({...postDetails, category:value})

    }
    
    ///////////////////////////////////////////////////////////////////////////////////

    // general btn functions
    ///////////////////////////////////////////////////////////////////////////////////
    
    const toggleViewBtn = () => {
        setToggleView(!toggleView)
    }

    const handlePublishBtn = () => {

    }

    ///////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        console.log(postDetails)
    }, [postDetails])

    return (
        <DashboardLayout>
            
            {/* content manager */}
            <div
                className='col-span-11 row-span-14 row-start-3 bg-background dark:bg-dark-background rounded-md shadow shadow-text/50 dark:shadow-none w-full h-full relative flex flex-col overflow-hidden '
            >

                {/* nav part */}
                <div
                    className='flex flex-row items-center font-medium w-full h-fit bg-secondary dark:bg-dark-secondary rounded-t-md'
                >
                    {
                        navBtns.map((btn, index) => (
                            <button
                                key={btn}
                                className={`${btn === selectedNav ? 'bg-background dark:bg-dark-background text-primary dark:text-dark-text' : 'text-text dark:text-dark-text'} ${index === 0 && 'rounded-tl-md'} p-2 px-4 cursor-pointer`}
                                onClick={() => setSelectedNav(btn)}
                            >
                                {btn}
                            </button>
                        ))
                    }
                </div>

                {/* main part */}
                <div
                    className='p-5 w-full h-full flex'
                >
                    
                    {/* content */}
                    <div
                        className={`${selectedNav === 'Content' ? 'flex' : 'hidden'} w-full h-full overflow-y-scroll no-scrollbar flex-col gap-2 pb-40`}
                    >
                        {
                            postDetails.json_blocks.map((block, index) => (
                                <NewBlockWrapper
                                    key={block.id}                                
                                    block={block}
                                    deleteFtn={() => handleDeleteBlock(block.id)}
                                    changeIndex={handleChangeBlockIndex}
                                    index={index}
                                    changeValue={handleChangeBlockValue}
                                />
                            ))
                        }
                    </div>

                    {/* SEO */}
                    <div
                        className={`${selectedNav === 'SEO' ? 'flex' : 'hidden'} w-full h-full overflow-y-scroll flex-col gap-2 pb-40`}
                    >
                        <PostSlugInput
                            slug={postDetails.slug}
                            title={postDetails.title}
                            onChange={handleChangeSlug}
                        />
                        <TagBlock
                            currentTags={postDetails.tags}
                            handleTagClick={handleTagClick}
                        />
                    </div>

                    {/* JSON */}
                    <div
                        className={`${selectedNav === 'JSON' ? 'flex' : 'hidden'} w-full h-full bg-dark-background/10 rounded`}
                    >
                        <JsonViewer
                            data={postDetails.json_blocks}
                        />
                    </div>

                </div>

                {/* create new block */}
                <div
                    className={`${selectedNav === 'Content' ? 'flex' : 'hidden'} absolute bottom-0 left-0 w-full bg-background dark:bg-dark-background rounded-b-md flex flex-row gap-2 z-10`}
                >
                    <div
                        className='flex flex-row gap-2 w-full h-full p-2'
                    >
                        {
                            blocktypes.map((type) => (
                                <CreateBlockBtn
                                    key={type.name}
                                    icon={type.icon}
                                    name={type.name}
                                    ftn={() => handleAddNewBlock(type.name)}
                                />
                            ))
                        }
                    </div>
                    
                </div>

            </div>

            {/* other details */}
            <div
                className='col-span-5 row-span-16 row-start-3 flex flex-col gap-8 w-full h-full pl-4'
            >   

                {/* general buttons */}
                <div
                    className='flex flex-row items-center justify-end w-full h-fit gap-2'
                >
                    {
                        btns.map((btn) => (
                            <GeneralBtn
                                key={btn.name}
                                colour={btn.colour}
                                name={btn.name}
                                icon={btn.icon}
                                ftn={btn.ftn}
                            />
                        ))
                    }
                </div>

                {/* is viewable */}
                <div
                    className='w-full h-fit flex justify-end'
                >
                    <ToggleCard
                        text={'Allow users to see your post?'}
                        value={postDetails.viewable}
                        toggleFtn={() => setPostDetails({...postDetails, viewable: !postDetails.viewable})}
                        purpose={'Viewable'}
                    />
                </div>

                {/* date and time */}
                <div
                    className='flex flex-col gap-2 w-full h-fit items-end justify-start'
                >   

                    <h1
                        className='text-text dark:text-dark-text font-medium w-fit'
                    >
                        Post date
                    </h1>

                    <div
                        className='w-fit h-fit flex flex-row items-center gap-2'
                    >   
                        {
                            date_time.map((val) => (
                                <SmallCard
                                    key={val.purpose}
                                    icon={val.icon}
                                    purpose={val.purpose}
                                />
                            ))
                        }
                    </div>

                </div>

                {/* category */}
                <div
                    className='flex flex-col w-full h-fit gap-2 items-end'
                >

                    <h1
                        className='text-text dark:text-dark-text font-medium w-fit'
                    >
                        Category
                    </h1>

                    <CategoryDropdown
                        onChange={handleCategoryClick}
                        value={postDetails.category}
                    />

                </div>

            </div>

            {/* View post component */}
            <ViewPostCard
                postDetials={postDetails}
                toggleView={() => setToggleView(!toggleView)}
                showView={toggleView}
            />

        </DashboardLayout>
    )
}

export default CreatePostPage