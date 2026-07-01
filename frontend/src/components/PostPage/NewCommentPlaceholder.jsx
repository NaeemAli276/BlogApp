import React, { useEffect, useState } from 'react'
import AuthorBtn from '../btns/AuthorBtn'
import Icon from '../../assets/Icon'
import { useAuth } from '../../context/AuthContext'
import RichTextCommentInput from './RichTextCommentInput'

const NewCommentPlaceholder = ({
    handleCreateComment,
    setIsNewCommentActive,
    children,
    content,
    handleCommentChange,
}) => {

    const { user } = useAuth()


    const handleCloseNewComment = () => {
        setIsNewCommentActive(false)
        setContent('')
    }

    // useEffect(() => {
    //     console.log(content)
    // }, [content])

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
                        handleChangeContent={handleCommentChange}
                    />

                    <div
                        className='absolute bottom-1 right-0 p-1 px-2 flex flex-row gap-2'
                    >
                        <button
                            className='bg-rose-200/70 text-rose-600 p-1 rounded cursor-pointer hover:bg-rose-500 hover:text-background duration-200'
                            onClick={() => handleCloseNewComment()}
                        >
                            <Icon
                                type={'close'}
                                size='20'
                            />
                        </button>
                        <button
                            className={`${content?.length <= 7 ? 'hidden' : 'flex'} bg-emerald-200/70 text-emerald-600 p-1 rounded cursor-pointer hover:bg-emerald-500 hover:text-background duration-200`}
                            onClick={() => handleCreateComment()}
                        >
                            <Icon
                                type={'check'}
                                size='20'
                            />
                        </button>
                    </div>

                </div>                

            </div>
        </div>
    )
}

export default NewCommentPlaceholder