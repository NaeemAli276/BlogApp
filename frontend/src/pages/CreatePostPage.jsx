import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/layout/dashboard/DashboardLayout'
import GeneralBtn from '../components/buttons/GeneralBtn'
import SmallCard from '../components/card/SmallCard'
import CategoryDropdown from '../components/inputs/CategoryDropdown'
import { getCurrentTime } from '../utils/DateUtils'
import ToggleCard from '../components/card/ToggleCard'
import ViewPostCard from '../components/card/ViewPostCard'
import ContentManager from '../components/layout/PostPage/ContentManager'

const CreatePostPage = () => {

    // toggles
    const [toggleView, setToggleView] = useState(false)

    // state
    const [postDetails, setPostDetails] = useState({
        json_blocks: [
            {
                id: 1,
                type: 'Thumbnail',
                sort_order: 1,
                path_url: null,
                file: null
            },
            {
                id: 0,
                type: 'Title',
                sort_order: 0,
                content: ''
            },
        ],
        slug: '',
        tags: [],
        category: null,
        viewable: true
    }) 

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

    const handleCategoryClick = (value) => {

        setPostDetails({...postDetails, category:value})

    }

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
            <ContentManager
                postDetails={postDetails}
                setPostDetails={setPostDetails}
            />

            {/* other details */}
            <div
                className='col-span-5 row-span-16 row-start-3 flex flex-col gap-6 w-full h-full pl-4'
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

                {/* is viewable */}
                <div
                    className='w-full h-fit flex justify-end'
                >
                    <ToggleCard
                        text={'Only allow your friends to view your post?'}
                        value={postDetails.viewable}
                        toggleFtn={() => setPostDetails({...postDetails, viewable: !postDetails.viewable})}
                        purpose={'Only friends'}
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