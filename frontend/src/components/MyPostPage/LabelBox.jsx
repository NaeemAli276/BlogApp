import React from 'react'
import DropDownBox from './DropDownBox'
import TagsContainer from './TagsContainer'
import CategoryContainer from './CategoryContainer'

const LabelBox = ({
    category = '',
    tags = [],
    handleTagChange,
    handleCategoryChange
}) => {

    return (
        <DropDownBox>

            <div
                className='flex flex-col gap-4 w-full h-full p-3 rounded bg-background'
            >
                <TagsContainer
                    handleTagChange={handleTagChange}
                    tags={tags}
                />

                <CategoryContainer
                    category={category}
                    handleCategoryChange={handleCategoryChange}
                />

            </div>

        </DropDownBox>
    )

}

export default LabelBox