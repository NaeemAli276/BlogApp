import React, { useState } from 'react'
import AuthorBtn from '../btns/AuthorBtn'
import Icon from '../../assets/Icon'
import { useAuth } from '../../context/AuthContext'
import RichTextCommentInput from './RichTextCommentInput'

const NewCommentPlaceholder = ({
    handleCreateComment,
    setIsNewCommentActive,
    children,
    content,
    handleChangeContent,
}) => {

    const { user } = useAuth()


    const handleCloseNewComment = () => {
        setIsNewCommentActive(false)
        setContent('')
    }

    return (
        <div
            className='w-full bg-accent/20 shadow shadow-text/10 p-3 pb-2 rounded flex flex-col gap-2 justify-between relative'
        >
            <div
                className='flex flex-col gap-2 w-full h-fit'
            >
                {/* profileImg, name and email and menu */}
                <div
                    className='flex flex-col gap-2.5 items-start justify-between w-full h-full'
                >
                    <AuthorBtn
                        author={user}
                        textTheme='dark'
                    />
                    
                    <RichTextCommentInput
                        content={content}
                        handleChangeContent={(e) => setContent(e.target.value)}
                    />

                    <div
                        className='absolute bottom-0 right-0 p-1'
                    >
                        <button>
                            
                        </button>
                    </div>

                </div>                

            </div>
        </div>
    )
}

export default NewCommentPlaceholder