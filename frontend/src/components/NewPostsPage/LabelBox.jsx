import React from 'react'
import DropDownBox from '../../components/NewPostsPage/DropDownBox'
import TagsContainer from '../MyPostPage/TagsContainer'


const LabelBox = ({
    category = '',
    tags = []
}) => {

    return (
        <DropDownBox>

            <div
                className='flex flex-col gap-4 w-full h-full p-3 rounded bg-background'
            >
                <TagsContainer/>
            </div>

        </DropDownBox>
    )

}

export default LabelBox