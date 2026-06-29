import React, { useEffect, useState } from 'react'
import RichTextViewer from '../PostPage/RichTextViewer'
import AuthorBtn from '../btns/AuthorBtn'
import Icon from '../../assets/Icon'


const Comment = ({
    comment
}) => {

    const [isDropdownActive, setIsDropdownActive] = useState(true)
    const [isEditActive, setIsEditActive] = useState(false)
    const [newContent, setNewContent] = useState('')

    const menuBtns = [
        {
            name: 'Delete',
            ftn: () => handleDeleteComment(comment?.id),
            icon:   <Icon type={'trash'} size='18'/>
        },
        {
            name: 'edit',
            ftn: () => setIsEditActive(true),
            icon:   <Icon type={'edit'} size='18'/>
        }
    ]

    const handleDeleteComment = (id) => {

    }

    const handleUpdateComment = (id, newContent) => {

    }

    return (
        <div
            className='w-full h-fit bg-accent/20 shadow shadow-text/10 p-3 pb-3.5 rounded flex flex-col gap-2 min-h-40 justify-between'
        >

            <div
                className='flex flex-col gap-2 w-full h-fit'
            >
                {/* profileImg, name and email and menu */}
                <div
                    className='flex flex-row items-start justify-between w-full h-fit relative'
                >
                    <AuthorBtn
                        author={comment?.user}
                        textTheme='dark'
                    />
                    <Icon
                        type={'menu'}
                        size='28'
                        className='rotate-90 hover:bg-text/10 rounded-full duration-200'
                        onClick={() => setIsDropdownActive(!isDropdownActive)}
                    />

                    <div
                        className={`${isDropdownActive ? 'flex' : 'hidden'} flex-col w-52 h-fit bg-background shadow shadow-text/20 absolute top-8 right-0 z-50 rounded`}
                    >
                        {
                            menuBtns.map((btn, index) => (
                                <button
                                    className={`
                                        ${index === menuBtns.length - 1 && 'rounded-b'} 
                                        ${index === 0 && 'rounded-t'} 
                                        ${btn?.name === 'Delete' ? 'hover:bg-rose-100 hover:text-rose-600' : 'hover:bg-secondary/50 hover:text-primary '}
                                        flex items-center justify-start gap-2 p-3 py-2.5 duration-200 text-sm
                                    `}
                                >
                                    {btn.icon}
                                    {btn.name}
                                </button>
                            ))
                        }
                    </div>

                </div>

                <RichTextViewer
                    content={comment?.content}
                    className='px-1 text-text/70 text-sm'
                />

            </div>

            {
                isEditActive
                ?   <div
                        className='flex items-end justify-end w-full h-fit'
                    >   

                    </div>
                :   <div>

                    </div>
            }

        </div>
    )
}

export default Comment