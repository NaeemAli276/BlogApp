import React from 'react'
import defaultUserImg from '../../assets/user.png'
import { truncateText } from '../../utils/textUtils'

const AuthorBtn = ({
    author = {
        username: '',
        email: '',
        profileImg: ''
    },
    hideEmail = false,
    disabled = false,
    textTheme = 'light'
}) => {
    return (
        <button
            className='w-fit h-fit flex flex-row gap-2 items-start cursor-pointer'
            disabled={disabled}            
        >
            <div
                className='w-fit h-full pt-px'
            >
                <img    
                    src={author?.profileImg === null ? defaultUserImg : author?.profileImg} 
                    alt="author" 
                    className={`aspect-square min-h-8 max-h-8 min-w-8 max-w-8 rounded-full ${author?.profileImg === null ? 'shadow shadow-text/59 bg-white p-1 ' : ''}`}
                />
            </div>
            <div
                className='flex flex-col w-full h-full text-start items-start'
            >
                <h2
                    className={`${textTheme === 'light' ? 'text-background' : 'text-text'} text-sm/tight`}
                >
                    {truncateText(author?.username,21)}
                </h2>
                <h3
                    className={`${textTheme === 'light' ? 'text-background/80' : 'text-text/80'}  text-xs/tight ${hideEmail ? 'hidden' : 'block'}`}
                >
                    {author?.email}
                </h3>
            </div>
        </button>
    )
}

export default AuthorBtn