import React, { useState } from 'react'
import RichTextViewer from '../PostPage/RichTextViewer'

const Comment = ({
    comment
}) => {

    const [isDropdownActive, setIsDropdownActive] = useState(false)
    const [isEditActive, setIsEditActive] = useState(false)
    const [newContent, setNewContent] = useState('')

    const menuBtns = [
        {
            name: 'Delete',
            ftn: () => handleDeleteComment(comment?.id),
            icon:   <svg 
                        xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                        <path fill="currentColor" fillRule="evenodd" d="M5.117 7.752a.75.75 0 0 1 .798.698l.46 6.9c.09 1.347.154 2.285.294 2.99c.137.685.327 1.047.6 1.303c.274.256.648.422 1.34.512c.714.093 1.654.095 3.004.095h.774c1.35 0 2.29-.002 3.004-.095c.692-.09 1.066-.256 1.34-.512c.273-.256.463-.618.6-1.302c.14-.706.204-1.644.294-2.992l.46-6.899a.75.75 0 1 1 1.497.1l-.464 6.952c-.085 1.282-.154 2.319-.316 3.132c-.169.845-.455 1.551-1.047 2.104s-1.315.793-2.17.904c-.822.108-1.86.108-3.145.108h-.88c-1.285 0-2.323 0-3.145-.108c-.855-.111-1.579-.35-2.17-.904c-.592-.553-.878-1.26-1.047-2.104c-.162-.814-.23-1.85-.316-3.132L4.418 8.55a.75.75 0 0 1 .699-.798m5.238-5.502h-.046c-.216 0-.405 0-.583.028a2.25 2.25 0 0 0-1.64 1.183c-.084.16-.143.339-.211.544l-.015.044l-.097.29l-.029.086A1.25 1.25 0 0 1 6.5 5.25h-3a.75.75 0 1 0 0 1.5h17.001a.75.75 0 0 0 0-1.5H17.41a1.25 1.25 0 0 1-1.173-.91l-.097-.291l-.014-.044c-.069-.205-.128-.384-.211-.544a2.25 2.25 0 0 0-1.641-1.183a4 4 0 0 0-.583-.028zm-1.21 2.685q-.06.164-.137.315h5.984a3 3 0 0 1-.136-.314l-.04-.114l-.099-.3a3 3 0 0 0-.133-.368a.75.75 0 0 0-.547-.395a3 3 0 0 0-.392-.009h-3.29c-.288 0-.348.002-.392.01a.75.75 0 0 0-.547.394c-.02.04-.042.095-.133.369l-.1.3z" clipRule="evenodd"></path>
                    </svg>
        },
        {
            name: 'edit',
            ftn: () => setIsEditActive(true),
            icon:    <svg 
                        xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56"></path>
                            <path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.36 1.36 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.36 1.36 0 0 1-.953.395H8.197a1.36 1.36 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086"></path>
                        </g>
                    </svg>
        }
    ]

    const handleDeleteComment = (id) => {

    }

    const handleUpdateComment = (id, newContent) => {

    }

    return (
        <div
            className='w-full h-fit bg-background rounded flex flex-col gap-2'
        >

            {/* profileImg, name and email */}
            <div
                className='w-full h-fit flex flex-row gap-2 items-center justify-between'
            >
                <div
                    className='flex flex-row items-start gap-2 w-fit h-full'
                >
                    {
                        comment?.profileImg === null
                        ?   <i
                                className='p-1 rounded-full border-2 border-primary w-fit h-fit'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                                        <circle cx={12} cy={6} r={4}></circle>
                                        <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"></path>
                                    </g>
                                </svg>
                            </i>
                        :   <img 
                                src={comment?.profileImg} 
                                alt="" 
                            />
                    }
                    <div
                        className='w-full h-fit flex flex-col gap-0'
                    >
                        <h3
                            className='text-sm/tight font-medium'
                        >
                            {comment?.username}
                        </h3>
                        <h4
                            className='text-xs text-text/70'
                        >
                            {comment?.email}
                        </h4>
                    </div>
                </div>
                <div
                    className='flex w-full items-center justify-end h-fit relative'
                >
                    <button
                        className='duration-200 rounded-full hover:bg-text/10 rotate-90'
                        onClick={() => setIsDropdownActive(!isDropdownActive)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12h.01M8 12h.01M16 12h.01"></path>
                        </svg>
                    </button>

                    {/* menu */}
                    <div
                        className={`${isDropdownActive ? 'flex' : 'hidden'} w-3/4 h-fit bg-background shadow shadow-text/30 rounded z-50 right-0 top-9 absolute flex-col`}
                    >
                        {
                            menuBtns.map((btn, index) => (
                                <button
                                    className={`
                                            ${index === menuBtns.length -1 && 'rounded-b'} 
                                            ${index === 0 && 'rounded-t'}
                                            ${btn.name === 'Delete' ? 'hover:text-rose-700 hover:bg-rose-200' : 'hover:bg-secondary/50 hover:text-primary'}
                                            w-full h-fit p-3 text-text/70 cursor-pointer text-sm flex items-center gap-2 duration-200
                                        `}
                                >
                                    <i>
                                        {btn.icon}
                                    </i>
                                    <span>
                                        {btn.name}
                                    </span>
                                </button>
                            ))
                        }
                    </div>

                </div>
            </div>

            <RichTextViewer
                content={comment.content}
                className='px-1 text-text/70'
            />

        </div>
    )
}

export default Comment