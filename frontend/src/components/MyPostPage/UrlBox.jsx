import React, { useState } from 'react'
import TextInput from '../inputs/TextInput'
import DropDownBox from './DropDownBox'
import Icon from '../../assets/Icon'

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
        <DropDownBox
            name='URL'
            isRequired={true}
        >
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
                        className='p-2 top-7.75 right-1 text-text/30 absolute bg-background cursor-pointer'
                        onClick={() => slugify(titleStr)}
                        type='button'
                    >
                        <Icon
                            type={'repeat'}
                            size='20'
                        />
                    </button>
                </TextInput>
            </div>           
        </DropDownBox>
    )
}

export default UrlBox