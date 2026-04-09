import React from 'react'
import DropDownBox from './DropDownBox'
import TextInput from '../inputs/TextInput'

const TitleBox = ({ title, setTitle }) => {
    return (
        <DropDownBox
            name='Title'
            isRequired={true}
        >
            <TextInput
                name={'Title'}
                text={title}
                handleText={setTitle}
                isRequired={true}
                extraText={'This will be used to identify the blog/article by users'}
            />
        </DropDownBox>
    )
}

export default TitleBox