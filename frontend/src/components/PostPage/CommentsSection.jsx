import React, { useState } from 'react'
import Comment from './Comment'
import Toolbar from '../btns/Toolbar'
import RichTextInput from '../inputs/RichTextInput'

const CommentsSection = () => {

    const [comments, setComments] = useState([
        {
            username: 'John Doe',
            profileImg: null,
            email: 'johnDoe@example.com',
            content: 'Lorem ipsum dolor sit <b>amet consectetur adipisicing elit.</b> Eveniet magnam hic, facere amet, id qui sunt aspernatur architecto eum pariatur quam tenetur aut molestias quis quasi quibusdam. Fugit, est fugiat.',
            time: ''

        },
        {
            username: 'Jane Doe',
            profileImg: null,
            email: 'JaneDoe@example.com',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet magnam hic, facere amet, id qui sunt aspernatur architecto eum pariatur quam tenetur aut molestias quis quasi quibusdam. Fugit, est fugiat.',
            time: ''

        },
        {
            username: 'Bob Smith',
            profileImg: null,
            email: 'BobSmith@example.com',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet magnam hic, facere amet, id qui sunt aspernatur architecto eum pariatur quam tenetur aut molestias quis quasi quibusdam. Fugit, est fugiat.',
            time: ''

        },
        {
            username: 'Generic Username',
            profileImg: null,
            email: 'genericUsername@example.com',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet magnam hic, facere amet, id qui sunt aspernatur architecto eum pariatur quam tenetur aut molestias quis quasi quibusdam. Fugit, est fugiat.',
            time: ''

        },
    ])

    return (
        <div
            className='w-full h-full pt-3 rounded text-text px-4 flex flex-col gap-4 relative bg-background shadow shadow-text/20'
        >

            <h2
                className='font-medium text-lg'
            >
                Comments
            </h2>

            <div
                className='flex flex-col gap-10 w-full h-full max-h-72 overflow-y-scroll p-0.5 scrollbar-hide'
            >
                {
                    comments.map((comment) => (
                        <Comment
                            key={comment.username}
                            comment={comment}
                        />
                    ))
                }
            </div>

            <span className='w-full h-0.5 bg-primary'></span>

            {/* reply */}
            <div
                className='w-full h-fit bg-background relative rounded pb-3 px-1 overflow-y-hidden'
            >
                <RichTextInput
                    hiddenComm={['headings', 'align', 'code', 'lists']}
                    className='w-full h-full outline-none p-2 text-clip flex-1 min-h-32'
                    wordLimit={1024}
                />
            </div>

        </div>
    )
}

export default CommentsSection