import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { useQuery } from '@tanstack/react-query'
import { getPostsFromCategory } from '../../apis/postApi'

const SimilarPostsContainer = ({
    category
}) => {

    // const [posts, setPosts] = useState([
    //     {
    //         id: 0,
    //         title: "This is a title about making this app, this is testing the title",
    //         thumbnail: "https://picsum.photos/seed/6/960/544",
    //         excerpt: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut, porro sit esse dolorum quaerat<p>",
    //         mainContent: "<h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut.</h2><p></p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut, porro sit esse dolorum quaerat doloremque vel aut? Voluptatibus quam quasi deserunt.</p><p></p><img src=\"https://fastly.picsum.photos/id/573/960/544.jpg?hmac=ofppTMc_sLbA_7etXmTBDKoPgfyDrFeq1GYykJfuAys\" alt=\"https://fastly.picsum.photos/id/573/960/544.jpg?hmac=ofppTMc_sLbA_7etXmTBDKoPgfyDrFeq1GYykJfuAys\"><p></p><blockquote class=\"pl-4 max-w-none \"><p>this is a blockquote</p></blockquote><p></p><ol><li><p>this is a point</p></li><li><p>this is another point</p></li></ol><p></p><ul><li><p>this is an ordered point</p></li><li><p>this is another ordered point</p></li></ul><p></p><pre><code>Blockquote.configure({\n  HTMLAttributes: {\n    class: 'pl-4 max-w-none bg-background/0'\n  }\n}),</code></pre><p></p><p></p><p></p><p></p>",
    //         "url": "Lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit.",
    //         tags: [
    //             "javascript",
    //             "programming"
    //         ],
    //         metaDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nulla beatae voluptates odit necessitatibus officiis soluta architecto vitae dolorem. Amet sit excepturi commodi itaque natus consectetur dignissimos. Veritatis, quaerat vero!",
    //         category: "Tech",
    //         date: "22/01/26",
    //         likes: 20000,
    //         shares: 10000,
    //         views: 10400,
    //         profile: {
    //             profileImg: null,
    //             username: 'John Doe',
    //             email: 'johnDoe@example.com'
    //         }
    //     },
    //     {
    //         id: 1,
    //         title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit1, amet consectetur adipisicing elit.',
    //         thumbnail: 'https://picsum.photos/seed/7/960/544',
    //         excerpt: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut, porro sit esse dolorum quaerat<p>',
    //         mainContent: `<p>2hi this is a post</p>`,
    //         url: 'Lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elite.',
    //         tags: [],
    //         metaDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nulla beatae voluptates odit necessitatibus officiis soluta architecto vitae dolorem. Amet sit excepturi commodi itaque natus consectetur dignissimos. Veritatis, quaerat vero!',
    //         category: 'Nature',
    //         date: '22/01/26',
    //         likes: 20000,
    //         shares: 10000,
    //         views: 10400,
    //         profile: {
    //             profileImg: null,
    //             username: 'Jane Doe',
    //             email: 'janeDoe@example.com'
    //         }
    //     },
    //     {
    //         id: 2,
    //         title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit2, amet consectetur adipisicing elit.',
    //         thumbnail: 'https://picsum.photos/seed/8/960/544',
    //         excerpt: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi dolores nostrum natus unde atque consectetur nobis ut, porro sit esse dolorum quaerat<p>',
    //         mainContent: `<p>3hi this is a post</p>`,
    //         url: 'Lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elite.',
    //         tags: [],
    //         metaDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nulla beatae voluptates odit necessitatibus officiis soluta architecto vitae dolorem. Amet sit excepturi commodi itaque natus consectetur dignissimos. Veritatis, quaerat vero!',
    //         category: 'Food',
    //         date: '22/01/26',
    //         likes: 20000,
    //         shares: 10000,
    //         views: 10400,
    //         profile: {
    //             profileImg: null,
    //             username: 'Bob Smith',
    //             email: 'BobSmith@example.com'
    //         }
    //     },
    // ])

    
    const { isLoading, error, data } = useQuery({
        queryFn: () => getPostsFromCategory(category),
        queryKey: ['posts_from_category', category]
    })

    useEffect(() => (
        console.log(data)
    ), [data])

    if (isLoading) {
        return (
            <div
                className='w-full h-80 bg-text/5 flex flex-col gap-3 px-1 rounded items-center justify-center shadow shadow-text/30'
            >
                <svg className=' animate-spin text-text' xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0-16a2 2 0 1 0 0 4 2 2 0 1 0 0-4M7.76 19.07c-.78.78-2.05.78-2.83 0s-.78-2.05 0-2.83 2.05-.78 2.83 0 .78 2.05 0 2.83M19.07 7.76c-.78.78-2.05.78-2.83 0s-.78-2.05 0-2.83 2.05-.78 2.83 0 .78 2.05 0 2.83M4 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m16 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2M4.93 7.76c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0 .78 2.05 0 2.83-2.05.78-2.83 0m11.31 11.31c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0 .78 2.05 0 2.83-2.05.78-2.83 0"></path></svg>
            </div>
        )
    }
    else if (error) {
        return (
            <div
                className='aspect-video rounded bg-text/5  items-center justify-center flex shadow shadow-text/30 flex-col gap-2 text-text/80 '
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 256 256">
                    <path fill="currentColor" d="M128 26a102 102 0 1 0 102 102A102.12 102.12 0 0 0 128 26m0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90M82 108a10 10 0 1 1 10 10a10 10 0 0 1-10-10m92 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10m-.81 65a6 6 0 0 1-10.38 6c-7.84-13.54-20.2-21-34.81-21s-27 7.46-34.81 21a6 6 0 0 1-5.2 3a5.9 5.9 0 0 1-3-.81a6 6 0 0 1-2.18-8.19c9.92-17.16 26.39-27 45.19-27s35.27 9.84 45.19 27"></path>
                </svg>
                <h3
                    className='w-3/5 text-center'
                >
                    An error has occured, please try reloading the page
                </h3>
            </div>
        )
    }
    else {
        return (
            <div
                className='w-full h-fit flex flex-col gap-3 px-1'
            >

                <h3
                    className='font-medium text-text text-xl '
                >
                    Related posts
                </h3>

                <div
                    className='flex flex-col gap-2 w-full h-full'
                >
                    {
                        data?.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                            />
                        ))
                    }
                </div>

            </div>
        )
    }
}

export default SimilarPostsContainer