import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import PostsViewer from '../../components/MyPostPage/PostsViewer'
import AnalyticsCard from '../../components/cards/AnalyticsCard'
import PostCreator from '../../components/MyPostPage/PostCreator'
import { useQuery } from '@tanstack/react-query'
import { getSpecifiedPosts } from '../../apis/postApi'
import { useAuth } from '../../context/AuthContext'
import Icon from '../../assets/Icon'

const MyPosts = () => {

    const { user } = useAuth()

    const [posts, setPosts] = useState([
        {
            id: 0,
            title: "This is a title about making this app, this is testing the title",
            thumbnail: "https://picsum.photos/seed/2/960/544",
            excerpt: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut, porro sit esse dolorum quaerat<p>",
            mainContent: "<h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut.</h2><p></p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut, porro sit esse dolorum quaerat doloremque vel aut? Voluptatibus quam quasi deserunt.</p><p></p><img src=\"https://fastly.picsum.photos/id/573/960/544.jpg?hmac=ofppTMc_sLbA_7etXmTBDKoPgfyDrFeq1GYykJfuAys\" alt=\"https://fastly.picsum.photos/id/573/960/544.jpg?hmac=ofppTMc_sLbA_7etXmTBDKoPgfyDrFeq1GYykJfuAys\"><p></p><blockquote class=\"pl-4   max-w-none \"><p>this is a blockquote</p></blockquote><p></p><ol><li><p>this is a point</p></li><li><p>this is another point</p></li></ol><p></p><ul><li><p>this is an ordered point</p></li><li><p>this is another ordered point</p></li></ul><p></p><pre><code>Blockquote.configure({\n  HTMLAttributes: {\n    class: 'pl-4 max-w-none bg-background/0'\n  }\n}),</code></pre><p></p><p></p><p></p><p></p>",
            "url": "Lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit.",
            tags: [
                "javascript",
                "programming"
            ],
            metaDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nulla beatae voluptates odit necessitatibus officiis soluta architecto vitae dolorem. Amet sit excepturi commodi itaque natus consectetur dignissimos. Veritatis, quaerat vero!",
            category: "Tech",
            date: "22/01/26",
            likes: 20000,
            shares: 10000,
            views: 10400,
            author: {
                profileImg: null,
                username: 'John Doe',
                email: 'johnDoe@example.com'
            }
        },
        {
            id: 1,
            title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit1, amet consectetur adipisicing elit.',
            thumbnail: 'https://picsum.photos/seed/3/960/544',
            excerpt: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut, porro sit esse dolorum quaerat<p>',
            mainContent: `<p>2hi this is a post</p>`,
            url: 'Lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elite.',
            tags: [],
            metaDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nulla beatae voluptates odit necessitatibus officiis soluta architecto vitae dolorem. Amet sit excepturi commodi itaque natus consectetur dignissimos. Veritatis, quaerat vero!',
            category: 'Nature',
            date: '22/01/26',
            likes: 20000,
            shares: 10000,
            views: 10400,
            author: {
                profileImg: null,
                username: 'Jane Doe',
                email: 'janeDoe@example.com'
            }
        },
        {
            id: 2,
            title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit2, amet consectetur adipisicing elit.',
            thumbnail: 'https://picsum.photos/seed/4/960/544',
            excerpt: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut, porro sit esse dolorum quaerat<p>',
            mainContent: `<p>3hi this is a post</p>`,
            url: 'Lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elite.',
            tags: [],
            metaDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nulla beatae voluptates odit necessitatibus officiis soluta architecto vitae dolorem. Amet sit excepturi commodi itaque natus consectetur dignissimos. Veritatis, quaerat vero!',
            category: 'Food',
            date: '22/01/26',
            likes: 20000,
            shares: 10000,
            views: 10400,
            author: {
                profileImg: null,
                username: 'Bob Smith',
                email: 'BobSmith@example.com'
            }
        },
    ])
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

    const [analytics, setAnalytics] = useState([
        {
            name: 'Views',
            icon:   <Icon
                        type={'eye'}
                        className='text-primary'
                        size='base'
                    />
        },
        {
            name: 'Likes',
            icon:   <Icon
                        type={'like'}
                        className='text-primary'
                        size='base'
                    />
        },
        {
            name: 'Dislikes',
            icon:   <Icon
                        type={'like'}
                        className='text-primary rotate-180'
                        size='base'
                    />
        },
        {
            name: 'Shares',
            icon:   <Icon
                        type={'share'}
                        className='text-primary'
                        size='base'
                    />
        },
    ])
    
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

    const { isLoading, error, data } = useQuery({
        queryFn: () => getSpecifiedPosts(user?.id),
        queryKey: ['get_my_posts', user?.id]
    })

    return (
        <DashboardLayout>
            
            {
                analytics.map((analytic) => (
                    <AnalyticsCard
                        key={analytic.name}
                        icon={analytic.icon}
                        name={analytic.name}
                    />
                ))
            }
            <PostsViewer
                posts={posts}
                handlePostSelect={handlePostSelect}
            />

            <PostCreator
                postView={postView}
                selectedPost={selectedPost}
            />

        </DashboardLayout>   
    )
}

export default MyPosts