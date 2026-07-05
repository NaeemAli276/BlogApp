import React, { useEffect, useState } from 'react'
import RichTextViewer from '../PostPage/RichTextViewer'
import AuthorBtn from '../btns/AuthorBtn'
import Icon from '../../assets/Icon'
import { useAuth } from '../../context/AuthContext'
import RichTextCommentInput from './RichTextCommentInput'


const Reply = ({
    reply,
    handleDeleteReply,
    handleUpdateReply,
}) => {

    const { user } = useAuth()

    const [content, setContent] = useState(reply?.content || '')

    const [isEditActive, setIsEditActive] = useState(false)
    const [isDropdownActive, setIsDropdownActive] = useState(false)
    const [isReportActive, setIsReportActive] = useState(false)    

    const handleReplyChange = (contentHTML) => {
        setContent(contentHTML)
    }

    const handleCloseEditing = () => {
        setIsEditActive(false)
        setContent(reply?.content)
    }

    const handleToggleUpdating = () => {
        setIsDropdownActive(false)
        setIsEditActive(true)
    }

    const handleUpdatingProcess = () => {
        handleUpdateReply(reply?.id, content)
        setIsEditActive(false)
        setContent(content)
    }

    const menuBtns = [
        {
            name: 'Delete',
            ftn: () => handleDeleteReply(reply?.id),
            icon:   <Icon type={'trash'} size='18'/>
        },
        {
            name: 'Edit',
            ftn: () => handleToggleUpdating(),
            icon:   <Icon type={'edit'} size='18'/>
        },
        {
            name: 'Report',
            ftn: () => setIsReportActive(true),
            icon:   <Icon type={'alert'} size='18'/>,
        }
    ]

    return (
        <div
            className='flex relative gap-2 w-full h-fit pl-6'
        >
            
            {/* corner/connection */}
            <Icon
                type={'corner'}
                className='rotate-270'
            />

            {/* main comment */}
            <div
                className='w-full h-fit bg-accent/20 shadow shadow-text/10 p-3 pb-3.5 rounded flex flex-col gap-2 justify-between relative'
            >

                <div
                    className='flex flex-col gap-2 w-full h-fit'
                >
                    {/* profileImg, name and email and menu */}
                    <div
                        className='flex flex-row items-start justify-between w-full h-fit relative'
                    >
                        <AuthorBtn
                            author={reply?.user}
                            textTheme='dark'
                        />
                        <Icon
                            type={'menu'}
                            size='28'
                            className='rotate-90 hover:bg-text/10 rounded-full duration-200'
                            onClick={() => setIsDropdownActive(!isDropdownActive)}
                        />

                        <div
                            className={`${isDropdownActive ? 'flex' : 'hidden'} flex-col w-52 h-fit bg-background shadow shadow-text/20 absolute top-8 right-0 z-90 rounded`}
                        >
                            {
                                reply?.user?.id === user?.id
                                ?   <>
                                        <button
                                            className='flex flex-row items-center gap-2 w-full h-fit p-2 py-2.5 text-sm hover:bg-secondary/50 hover:text-primary rounded-t duration-200 cursor-pointer'
                                            onClick={menuBtns[1].ftn}
                                        >
                                            {menuBtns[1].icon}
                                            {menuBtns[1].name}
                                        </button>
                                        <button
                                            className='flex flex-row items-center gap-2 w-full h-fit p-2 py-2.5 text-sm hover:bg-rose-100/70 hover:text-rose-600 rounded-b duration-200 cursor-pointer'
                                            onClick={menuBtns[0].ftn}
                                        >
                                            {menuBtns[0].icon}
                                            {menuBtns[0].name}
                                        </button>
                                    </>
                                :   <>
                                        <button
                                            className='flex flex-row items-center gap-2 w-full h-fit p-2 py-2.5 text-sm hover:bg-secondary/50 hover:text-primary rounded duration-200 cursor-pointer'
                                            onClick={menuBtns[2].ftn}
                                        >
                                            {menuBtns[2].icon}
                                            {menuBtns[2].name}
                                        </button>
                                    </>
                            }
                        </div>

                    </div>

                    {
                        isEditActive
                        ?   <RichTextCommentInput
                                content={content}
                                handleChangeContent={handleReplyChange}
                            />
                        :   <RichTextViewer
                                content={content}
                                className='px-1 text-text/70 text-sm'
                            />
                    }

                    {
                        isEditActive
                        &&  <div
                                className='absolute bottom-1 right-0 p-1 px-2 flex flex-row gap-2'
                            >
                                <button
                                    className='bg-rose-200/70 text-rose-600 p-1 rounded cursor-pointer hover:bg-rose-500 hover:text-background duration-200'
                                    onClick={() => handleCloseEditing()}
                                >
                                    <Icon
                                        type={'close'}
                                        size='20'
                                    />
                                </button>
                                <button
                                    className={`${content?.length <= 7 ? 'hidden' : 'flex'} bg-emerald-200/70 text-emerald-600 p-1 rounded cursor-pointer hover:bg-emerald-500 hover:text-background duration-200`}
                                    onClick={() => handleUpdatingProcess()}
                                >
                                    <Icon
                                        type={'check'}
                                        size='20'
                                    />
                                </button>   
                            </div>
                    }

                </div>

            </div>

        </div>
    )
}

export default Reply