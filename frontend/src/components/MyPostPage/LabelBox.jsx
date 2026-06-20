import React from 'react'
import DropDownBox from './DropDownBox'
import TagsContainer from './TagsContainer'


const LabelBox = ({
    category = '',
    tags = [],
    handleTagChange
}) => {

    return (
        <DropDownBox>

            <div
                className='flex flex-col gap-4 w-full h-full p-3 rounded bg-background'
            >
                <TagsContainer
                    handleTagChange={handleTagChange}
                />
            </div>

        </DropDownBox>
    )

}

export default LabelBox