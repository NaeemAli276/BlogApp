import React, { useEffect, useMemo, useState } from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import PostsViewer from '../../components/MyPostPage/PostsViewer'
import AnalyticsCard from '../../components/cards/AnalyticsCard'
import PostCreator from '../../components/MyPostPage/PostCreator'
import { useQuery } from '@tanstack/react-query'
import { getMyPosts } from '../../apis/postApi'
import { useAuth } from '../../context/AuthContext'
import Icon from '../../assets/Icon'
import PostContentContainer from '../../components/MyPostPage/PostContentContainer'
import { useLocation } from 'react-router-dom'

const MyPosts = () => {

    const { user } = useAuth()

    const { isLoading, error, data } = useQuery({
        queryFn: () => getMyPosts(user?.id),
        queryKey: ['get_my_posts', user?.id]
    })

    const location = useLocation()

    const [postView, setPostView] = useState(0) // 0: empty state, 1: new post, 2: editing post not related to the component PostsView
    const [selectedPost, setSelectedPost] = useState(
        {
            id: null,
            title: '',
            thumbnail: null,
            excerpt: '',
            mainContent: ``,
            url: '',
            tags: [],
            metaDesc: '',
            author: user,
            category: {
                id: null,
                category_name: ''
            },
            date: '',
            is_published: false
        }
    )
    
    /* 
        params
        post: the post itself (contains the data)
        isNew: checks if it is a new one, or if it has already been created

    */
    const handlePostSelect = (post, isNew) => {

        if (isNew === true && post === null) {
            setSelectedPost({
                id: null,
                title: '',
                thumbnail: null,
                excerpt: '',
                mainContent: ``,
                url: '',
                tags: [],
                metaDesc: '',
                author: user,
                category: {
                    id: null,
                    category_name: ''
                },
                date: '',
                is_published: false
            })    
            setPostView(1)
        }
        else {
            setSelectedPost({...post})
            setPostView(2)
        }
    }

    // useEffect(() => {
    //     console.log(selectedPost)
    // }, [selectedPost])

    // used to remember state when coming back from preview
    useEffect(() => {
        const state = location.state;
        console.log(state)
        if (state?.from === 'preview') {
            if (state?.post?.id !== null) {
                setSelectedPost(state?.post)
                setPostView(2)
            }
            else {
                setSelectedPost(state?.post)
                setPostView(1)
            }
        }
    
    }, [location]);

    if (isLoading) {
        return (
            <div
                className='w-full h-screen flex items-center justify-center'
            >
                <Icon
                    type={'spinner'}
                    size='20'
                    className='text-text/80 animate-spin'
                />
            </div>
        )
    }
    else if (error) {
        return (
            <div
                className='aspect-video rounded items-center justify-center flex shadow shadow-text/50 flex-col gap-2 text-text/80 w-full h-screen'
            >
                <Icon
                    type={'sad'}
                    size='80'
                    className='text-text'
                />
                <h3
                    className='w-1/6 text-center'
                >
                    An error has occured, please try reloading the page
                </h3>
            </div>
        )
    }
    else {
        return (
            <DashboardLayout
                // className='w-full h-full p-5 grid grid-cols-16 grid-rows-16 gap-4'
            >
                
                {/* {
                    analytics.map((analytic) => (
                        <AnalyticsCard
                            key={analytic.name}
                            icon={analytic.icon}
                            name={analytic.name}
                            stat={analytic.stat}
                        />
                    ))
                } */}
                <PostsViewer
                    posts={data?.posts}
                    handlePostSelect={handlePostSelect}
                />

                <PostContentContainer
                    postView={postView}
                    selectedPost={selectedPost}
                />
    
            </DashboardLayout>   
        )
    }

}

export default MyPosts
