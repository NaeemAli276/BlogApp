import React, { useState } from 'react'
import TextInput from '../inputs/TextInput'
import DropDownBox from './DropDownBox'


const UrlBox = ({ titleStr, handleUrlChange }) => {
    
    const [url, setUrl] = useState('' || titleStr)

    function slugify(text) {
        const slugifed = text
            .toString()                     // Ensure input is a string
            .normalize('NFD')               // Separate base letters from their accents
            .replace(/[\u0300-\u036f]/g, '') // Remove the separated accent marks
            .toLowerCase()                  // Convert to lowercase
            .trim()                         // Remove whitespace from both ends
            .replace(/\s+/g, '-')           // Replace spaces with hyphens
            .replace(/[^\w-]+/g, '')        // Remove all non-word chars (except hyphens)
            .replace(/--+/g, '-')           // Replace multiple hyphens with a single one
            .replace(/^-+|-+$/g, '');       // Trim hyphens from the start and end
    
        handleUrlChange(slugifed, url)
        setUrl(slugifed)

    }
    

    return (
        <DropDownBox>
            <div
                className='bg-background p-2 rounded w-full h-full px-3 '
            >
                <TextInput
                    isRequired={true}
                    text={url}
                    readOnly={true}
                    // handleText={(e) => handleUrlChange()}
                    name={'URL'}
                    extraText={'This is will boost your article/blog in web searches'}
                    placeholder={'Enter a title first...'}
                >
                    <button
                        className='p-2 top-7.75 right-1 text-text/30 absolute cursor-pointer'
                        onClick={() => slugify(titleStr)}
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M17 5H6c-1.1 0-2 .9-2 2v5h2V7h11v3l5-4-5-4zm1 12H7v-3l-5 4 5 4v-3h11c1.1 0 2-.9 2-2v-5h-2z"></path></svg>
                    </button>
                </TextInput>
            </div>           
        </DropDownBox>
    )
}

export default UrlBox