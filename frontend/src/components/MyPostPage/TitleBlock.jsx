import React from 'react'
import DropDownBox from './DropDownBox'
import TextInput from '../inputs/TextInput'

const TitleBlock = ({ title, setTitle }) => {
    return (
        <DropDownBox
            name='Title'
            isRequired={true}
        >
            <div
                className='p-2 w-full h-fit bg-background rounded px-3'
            >
                <TextInput
                    name={'Title'}
                    text={title}
                    handleText={setTitle}
                    isRequired={true}
                    extraText={'This will be used to identify the blog/article by users'}
                />
            </div>
        </DropDownBox>
    )
}

export default TitleBlock