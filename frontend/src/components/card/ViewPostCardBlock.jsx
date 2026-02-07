import React from 'react'

const ViewPostCardBlock = ({ block }) => {
    
    if (block?.type === 'Title') {
        return (
            <h1
                className='font-semibold text-3xl text-dark-background dark:text-dark-text'
            >
                {
                    block?.content === ''
                    ? 'Type in a title'
                    : block?.content
                }
            </h1>
        )
    }
    else if (block?.type === 'Thumbnail' || block?.type === 'Image') {
        if (block?.path_url !== null) {
            return (
                <img 
                    className='w-full h-fit aspect-video rounded-md' 
                    src={URL.createObjectURL(block?.file)} 
                    alt="" 
                />
            )
        }
        else {
            return (
                <div
                    className='w-full h-fit items-center justify-center aspect-video rounded-md bg-secondary flex flex-col gap-2 dark:bg-dark-secondary'
                >
                    <svg className='text-text dark:text-dark-accent' xmlns="http://www.w3.org/2000/svg" width={80} height={80} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2m0-2v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V19h-14ZM19 5v5.59L16.71 8.3a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14Z"></path><path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3"></path></svg>
                    <h3
                        className='text-text dark:text-dark-accent font-medium'
                    >
                        No image has been selected
                    </h3>
                </div>
            )
        }
    }
    else if (block?.type === 'Paragraph') {
        return (
            <p
                className='text-dark-background/70 dark:text-dark-text/80'
            >
                {block?.content}
            </p>
        )
    }
    else if (block?.type === 'Heading') {
        
        if (block?.headingType === 'H1') {
            return (
                <h1
                    className='font-semibold text-3xl text-dark-background dark:text-dark-text'
                >
                    {block.content}
                </h1>
            )
        }
        else if (block?.headingType === 'H2') {
            return (
                <h2
                    className='font-semibold text-2xl text-dark-background dark:text-dark-text'
                >
                    {block.content}
                </h2>
            )
        }
        else if (block?.headingType === 'H3') {
            return (
                <h3
                    className='font-semibold text-xl text-dark-background dark:text-dark-text'
                >
                    {block.content}
                </h3>
            )
        }

    }
    else if (block?.type === 'Hyperlink') {
        
        return (
            <a 
                href={block?.link}
                className='text-accent dark:text-dark-accent'
            >
                {block?.text}
            </a>
        )

    }

}

export default ViewPostCardBlock