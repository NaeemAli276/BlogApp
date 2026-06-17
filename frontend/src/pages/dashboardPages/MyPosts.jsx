import React, { useEffect, useMemo, useState } from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import PostsViewer from '../../components/MyPostPage/PostsViewer'
import AnalyticsCard from '../../components/cards/AnalyticsCard'
import PostCreator from '../../components/MyPostPage/PostCreator'
import { useQuery } from '@tanstack/react-query'
import { getMyPosts } from '../../apis/postApi'
import { useAuth } from '../../context/AuthContext'
import Icon from '../../assets/Icon'

const MyPosts = () => {

    const { user } = useAuth()

    const { isLoading, error, data } = useQuery({
        queryFn: () => getMyPosts(user?.id),
        queryKey: ['get_my_posts', user?.id]
    })

    const [posts, setPosts] = useState(data?.posts)

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
        category: '',
        date: ''
    }
    // {
    //         id: 0,
    //         title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    //         thumbnail: 'https://picsum.photos/seed/2/960/544',
    //         excerpt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut, porro sit esse dolorum quaerat doloremque vel aut? Voluptatibus quam quasi deserunt.',
    //         mainContent: `<p>hi this is a post</p>`,
    //         url: 'Lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit.',
    //         tags: [],
    //         metaDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nulla beatae voluptates odit necessitatibus officiis soluta architecto vitae dolorem. Amet sit excepturi commodi itaque natus consectetur dignissimos. Veritatis, quaerat vero!',
    //         category: 'Tech',
    //         date: '22/01/26'
    //     },
    )

    // const analytics = useMemo(() => [
    //     {
    //         name: 'Views',
    //         icon: <Icon type={'eye'} className='text-primary' size='base' />,
    //         stat: data?.stats?.total_view_count || 0
    //     },
    //     {
    //         name: 'Likes',
    //         icon: <Icon type={'like'} className='text-primary' size='base' />,
    //         stat: data?.stats?.total_like_count || 0
    //     },
    //     {
    //         name: 'Dislikes',
    //         icon: <Icon type={'like'} className='text-primary rotate-180' size='base' />,
    //         stat: data?.stats?.total_dislike_count || 0
    //     },
    //     {
    //         name: 'Shares',
    //         icon: <Icon type={'share'} className='text-primary' size='base' />,
    //         stat: data?.stats?.total_share_count || 0
    //     },
    // ], [data?.stats])
    
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
                tags: ['javascript', 'programming'],
                metaDesc: '',
                category: '',
                date: ''
            })    
            setPostView(1)
        }
        else {
            setPostView(2)
            setSelectedPost({...post})
        }
    }

    if (isLoading) {
        return (
            <div
                className='w-full h-screen flex items-center justify-center'
            >
                <Icon
                    type={'spinner'}
                    size='md'
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
                    size='xl'
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

                <PostCreator
                    postView={postView}
                    selectedPost={selectedPost}
                />

            </DashboardLayout>   
        )
    }

}

export default MyPosts