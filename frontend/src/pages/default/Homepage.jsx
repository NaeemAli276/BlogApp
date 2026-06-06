import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import SectionContainer from '../../components/Layout/SectionContainer'
import PostCard from '../../components/PostPage/PostCard'
import HeroPostCard from '../../components/cards/HeroPostCard'
import SmallPostCard from '../../components/cards/SmallPostCard'

const Homepage = () => {
    
    const [posts, setPosts] = useState([
        {
            id: 0,
            title: "This is a title about making this app, this is testing the title",
            thumbnail: "https://picsum.photos/seed/90/960/544",
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
    
    return (
        <Layout>

            {/* hero section */}
            <SectionContainer>
                
                {/* main post */}
                <div
                    className='col-span-8 row-span-full w-full h-full'
                >
                    <HeroPostCard
                        post={posts[0]}
                        ftn={() => {}}
                    />
                </div>

                {/* popular posts */}
                <div
                    className='w-full h-full col-span-4 row-span-full flex flex-col gap-4'
                >

                    <h2
                        className='text-text font-medium text-xl/tight'
                    >
                        Popular posts
                    </h2>

                    <div
                        className='flex flex-col gap-2 w-full h-full overflow-y-scroll scrollbar-hide p-1'
                    >
                        {
                            posts.map((post) => (
                                <SmallPostCard
                                    key={post.id}
                                    post={post}
                                />
                            ))
                        }
                    </div>
                </div>

            </SectionContainer>
        
        </Layout>
    )
}

export default Homepage