import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import PostsViewer from '../../components/MyPostPage/PostsViewer'
import AnalyticsCard from '../../components/cards/AnalyticsCard'
import PostCreator from '../../components/MyPostPage/PostCreator'


const MyPosts = () => {

    const [posts, setPosts] = useState([
        {
            id: 0,
            title: "This is a title about making this app, this is testing the title",
            thumbnail: "https://picsum.photos/seed/2/960/544",
            excerpt: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut, porro sit esse dolorum quaerat<p>",
            mainContent: "<h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut.</h2><p></p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut, porro sit esse dolorum quaerat doloremque vel aut? Voluptatibus quam quasi deserunt.</p><p></p><img src=\"https://fastly.picsum.photos/id/573/960/544.jpg?hmac=ofppTMc_sLbA_7etXmTBDKoPgfyDrFeq1GYykJfuAys\" alt=\"https://fastly.picsum.photos/id/573/960/544.jpg?hmac=ofppTMc_sLbA_7etXmTBDKoPgfyDrFeq1GYykJfuAys\"><p></p><blockquote class=\"pl-4 max-w-none \"><p>this is a blockquote</p></blockquote><p></p><ol><li><p>this is a point</p></li><li><p>this is another point</p></li></ol><p></p><ul><li><p>this is an ordered point</p></li><li><p>this is another ordered point</p></li></ul><p></p><pre><code>Blockquote.configure({\n  HTMLAttributes: {\n    class: 'pl-4 max-w-none bg-background/0'\n  }\n}),</code></pre><p></p><p></p><p></p><p></p>",
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
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path></svg>
        },
        {
            name: 'Likes',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M20 8h-5.61l1.12-3.37c.2-.61.1-1.28-.27-1.8-.38-.52-.98-.83-1.62-.83h-1.61c-.3 0-.58.13-.77.36L6.54 8H4.01c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13.31a2 2 0 0 0 1.87-1.3l2.76-7.35c.04-.11.06-.23.06-.35v-2c0-1.1-.9-2-2-2ZM6 19H4v-9h2zm14-7.18L17.31 19H8V9.36L12.47 4h1.15l-1.56 4.68a1.01 1.01 0 0 0 .95 1.32h7v1.82Z"></path></svg>
        },
        {
            name: 'Dislikes',
            icon: <svg className='rotate-180' xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M20 8h-5.61l1.12-3.37c.2-.61.1-1.28-.27-1.8-.38-.52-.98-.83-1.62-.83h-1.61c-.3 0-.58.13-.77.36L6.54 8H4.01c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13.31a2 2 0 0 0 1.87-1.3l2.76-7.35c.04-.11.06-.23.06-.35v-2c0-1.1-.9-2-2-2ZM6 19H4v-9h2zm14-7.18L17.31 19H8V9.36L12.47 4h1.15l-1.56 4.68a1.01 1.01 0 0 0 .95 1.32h7v1.82Z"></path></svg>
        },
        {
            name: 'Shares',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M5.5 15.5c1.07 0 2.02-.5 2.67-1.26l6.87 3.87c-.01.13-.04.26-.04.39 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5c-1.07 0-2.02.5-2.67 1.26l-6.87-3.87c.01-.13.04-.26.04-.39s-.02-.26-.04-.39l6.87-3.87C16.47 8.5 17.42 9 18.5 9 20.43 9 22 7.43 22 5.5S20.43 2 18.5 2 15 3.57 15 5.5c0 .13.02.26.04.39L8.17 9.76A3.48 3.48 0 0 0 5.5 8.5C3.57 8.5 2 10.07 2 12s1.57 3.5 3.5 3.5m13 1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5m0-13c.83 0 1.5.67 1.5 1.5S19.33 7 18.5 7 17 6.33 17 5.5 17.67 4 18.5 4m-13 6.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S4 12.83 4 12s.67-1.5 1.5-1.5"></path></svg>
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