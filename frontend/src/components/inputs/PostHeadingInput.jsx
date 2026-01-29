import React, { useEffect, useState } from 'react'
import TextInput from './TextInput'


const PostHeadingInput = (onChange, id, content, headingType) => {

    // toggles
    const [toggleHeadings, setToggleHeadings] = useState(false)
    

    const [heading, setHeading] = useState({
        content: '',
        headingType: 'H1'
    })

    const handleChangeContent = (e) => { 
        setHeading({...heading, content: e.target.value})
        onChange(id, heading, 'Heading')
    }

    const headingTypes = ['H1', 'H2', 'H3']

    useEffect(() => {
        if (content !== null && headingType !== null) {
            setHeading({
                content: content,
                headingType: headingType
            })
        } 
    }, [])

    return (
        <div
            className='flex flex-row items-center gap-2 w-full h-fit'
        >
            <TextInput
                name={'Heading'}
                value={heading.content}
                onChange={handleChangeContent}
                type={'text'}
                isRequired={false}
                placeholderText={'Enter a heading...'}
                showName={true}
                secondaryText={'The title of another part of your post'}
                secondaryTextShow={true}
            />
            <div
                className='w-1/4 h-full p-2 relative bg-background rounded border-2 border-primary dark:border-dark-primary pl-3'
                onClick={() => setToggleHeadings(!toggleHeadings)}
            >
                <div
                    className='flex flex-row items-center w-full justify-between'
                >
                    <h2>
                        {heading.headingType}
                    </h2>
                    <i
                        className={`${toggleHeadings ? 'rotate-180' : 'rotate-0'} text-primary dark:text-dark-primary`}
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m12 15.41 5.71-5.7-1.42-1.42-4.29 4.3-4.29-4.3-1.42 1.42z"></path></svg>
                    </i>
                </div>
                
                <div
                    className={`${toggleHeadings ? 'flex' : 'hidden'} flex-col w-full h-fit bg-background absolute left-0 top-12 z-50 rounded shadow shadow-dark-background/50`}
                >
                    {
                        headingTypes.map((type, index) => (
                            <button
                                className={`w-full h-fit ${index === 0 && 'rounded-t'} ${index + 1 === headingTypes.length && 'rounded-b'} p-2 text-start px-3 hover:bg-dark-background/10 duration-200`}
                            >
                                {type} 
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PostHeadingInput