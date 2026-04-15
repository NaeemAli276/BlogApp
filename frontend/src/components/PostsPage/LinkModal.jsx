import React, { useState } from 'react'
import TextInput from '../inputs/TextInput'
import { useCurrentEditor } from '@tiptap/react';


const LinkModal = ({ isLinkModalOn, setIsLinkModalOn }) => {

    const { editor } = useCurrentEditor()

    const [isUrlValid, setIsUrlValid] = useState(false)
    const [url, setUrl] = useState('')
    
    // checks if the URL is valid
    const validateURL = (string) => {
        try {
            console.log(string.substring(0,5))
            // Check if protocol is http or https (optional)
            if (string.substring(0,5) == 'https') {
                console.log(true)
                setIsUrlValid(true)
            }
            else {
                console.log(false)
                setIsUrlValid(false)
            }

        }
        catch (err) {
            setIsUrlValid(false);
        }
    }

    // just handles the URL change
    const handleUrlChange = (e) => {

        const urlString = e.target.value

        setUrl(urlString)

        validateURL(urlString)

    }

    return (        
        <div
            className={`${isLinkModalOn ? 'flex' : 'hidden'} w-fit absolute right-3 top-12 shadow shadow-text/50 rounded flex flex-col-reverse gap-0 z-50`}
        >
            <div
                className='w-full flex flex-row items-center justify-end gap-1 p-2 pt-0 px-3'
            >
                <button
                    className='p-1 rounded bg-rose-500 hover:bg-rose-500/90 hover:text-background/90 text-background cursor-pointer'
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path></svg>
                </button>
                <button
                    className={`${isUrlValid ? 'flex' : 'hidden'} p-1 rounded bg-emerald-600 hover:bg-emerald-600/90 hover:text-background/90 text-background duration-200 cursor-pointer`}
                    onClick={() => handleAddingLink()}
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path></svg>
                </button>
            </div>
            <TextInput
                text={url}
                handleText={(e) => handleUrlChange(e)}
                name={'Link'}
                placeholder={'Enter a link...'}
                type='url'
            />
        </div>
    )
}

export default LinkModal