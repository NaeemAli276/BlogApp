import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/layout/dashboard/DashboardLayout'
import TextInput from '../components/inputs/TextInput'
import NewBlockWrapper from '../components/card/NewBlockWrapper'
import CreateBlockBtn from '../components/buttons/CreateBlockBtn'
import JsonViewer from '../components/general/JsonViewer'
import PostSlugInput from '../components/inputs/PostSlugInput'
import TagBlock from '../components/card/TagBlock'

const CreatePostPage = () => {

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
        slug: ''
    }) 
    const [totalBlocks, setTotalBlocks] = useState(2)
    const [selectedNav, setSelectedNav] = useState('Content')

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
        setPostDetails({...postDetails, slug: value})
    }
    
    ///////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        console.log(postDetails)
    }, [postDetails])

    return (
        <DashboardLayout>
            
            {/* content manager */}
            <div
                className='col-span-11 row-span-14 row-start-3 bg-background dark:bg-background/10 rounded-md shadow shadow-text/50 w-full h-full relative flex flex-col overflow-hidden'
            >

                {/* nav part */}
                <div
                    className='flex flex-row items-center font-medium w-full h-fit bg-text/10 dark:bg-dark-background/20 rounded-t-md'
                >
                    {
                        navBtns.map((btn, index) => (
                            <button
                                key={btn}
                                className={`${btn === selectedNav ? 'bg-background dark:bg-background/5 text-accent dark:text-dark-text' : 'text-text dark:text-dark-text'} ${index === 0 && 'rounded-tl-md'} p-2 px-4 cursor-pointer`}
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
                        className={`${selectedNav === 'Content' ? 'flex' : 'hidden'} w-full h-full overflow-y-scroll flex-col gap-2 pb-40`}
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
                        <TagBlock/>
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
                        className='flex flex-row gap-2 w-full h-full dark:bg-background/19 p-2'
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
                className='col-span-3 row-span-10 row-start-3 '
            >

                

            </div>

        </DashboardLayout>
    )
}

export default CreatePostPage