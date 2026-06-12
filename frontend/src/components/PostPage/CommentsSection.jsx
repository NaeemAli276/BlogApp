import React, { useState } from 'react'
import Comment from './Comment'
import Toolbar from '../btns/Toolbar'
import RichTextInput from '../inputs/RichTextInput'

const CommentsSection = ({
    comments = []
}) => {

    // const [comments, setComments] = useState([
    //     {
    //         username: 'John Doe',
    //         profileImg: null,
    //         email: 'johnDoe@example.com',
    //         content: 'Lorem ipsum dolor sit <b>amet consectetur adipisicing elit.</b> Eveniet magnam hic, facere amet, id qui sunt aspernatur architecto eum pariatur quam tenetur aut molestias quis quasi quibusdam. Fugit, est fugiat.',
    //         time: ''

    //     },
    //     {
    //         username: 'Jane Doe',
    //         profileImg: null,
    //         email: 'JaneDoe@example.com',
    //         content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet magnam hic, facere amet, id qui sunt aspernatur architecto eum pariatur quam tenetur aut molestias quis quasi quibusdam. Fugit, est fugiat.',
    //         time: ''

    //     },
    //     {
    //         username: 'Bob Smith',
    //         profileImg: null,
    //         email: 'BobSmith@example.com',
    //         content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet magnam hic, facere amet, id qui sunt aspernatur architecto eum pariatur quam tenetur aut molestias quis quasi quibusdam. Fugit, est fugiat.',
    //         time: ''

    //     },
    //     {
    //         username: 'Generic Username',
    //         profileImg: null,
    //         email: 'genericUsername@example.com',
    //         content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet magnam hic, facere amet, id qui sunt aspernatur architecto eum pariatur quam tenetur aut molestias quis quasi quibusdam. Fugit, est fugiat.',
    //         time: ''

    //     },
    // ])
    const [comment, setComment] = useState(``) // the users new comment

    return (
        <div
            className='w-full h-full rounded text-text p-4 flex flex-col gap-4 relative bg-background shadow shadow-text/20 '
        >

            {/* reply */}
            <div
                className='w-full h-fit bg-background relative rounded pb-3 overflow-y-hidden'
            >
                <RichTextInput
                    hiddenComm={['headings', 'align', 'code', 'lists']}
                    className='w-full h-full outline-none p-2 text-clip flex-1 min-h-32 max-h-64 overflow-y-scroll scrollbar-hide'
                    wordLimit={1024}
                    content={comment}
                    handleChangeContent={(e) => setComment(e.target.value)}
                />
                {/* submit btn */}
                <button
                    className={`
                        ${comment !== '' ? 'flex' : 'hidden'} 
                        p-1 bg-secondary/50 text-primary 
                        duration-200
                        hover:bg-primary hover:text-background rounded-xs
                        absolute bottom-5.5 right-3.5 z-50 cursor-pointer
                    `}
                >   
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16">
                        <path fill="currentColor" d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"></path>
                    </svg>
                </button>
            </div>

            <span className='w-full h-px bg-primary/70'></span>

            <h2
                className='font-medium text-lg'
            >
                Comments
            </h2>

            <div
                className='flex flex-col gap-3 w-full h-full max-h-84 overflow-y-scroll p-0.5 scrollbar-hide'
            >
                {

                    comments.length <= 0 
                    ?   <div
                            className='flex flex-col gap-5 items-center justify-center w-full h-80 bg-text/10 rounded'
                        >   
                            <svg className='text-text/70'  xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M4 19h3v2c0 .36.19.69.51.87a1 1 0 0 0 1-.01L13.27 19h6.72c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2M4 5h16v12h-7c-.18 0-.36.05-.51.14L9 19.23V18c0-.55-.45-1-1-1H4z"></path></svg>
                            <div
                                className='flex flex-col gap-0 items-center justify-center w-fit h-fit text-center'
                            >   
                                <h2
                                    className='text-xl font-medium'
                                >
                                    No comments
                                </h2>
                                <h3
                                    className='text-text/70 text-sm w-3/4'
                                >   
                                    There are no comments for this post, be the first one to comment
                                </h3>
                            </div>
                        </div>  
                    :   comments.map((comment) => (
                            <Comment
                                key={comment?.user?.id}
                                comment={comment}
                            />
                        ))
                }
            </div>

        </div>
    )
}

export default CommentsSection