import React, { useState } from 'react'
import DropDownBox from './DropDownBox'
import TagsContainer from './TagsContainer'
import CategoryContainer from './CategoryContainer'

const LabelBox = ({
    category = '',
    tags = [],
    handleTagChange,
    handleCategoryChange
}) => {

    const [isTagsDropdownActive, setIsTagsDropdownActive] = useState(false)
    const [isCategoryDropdownActive, setIsCategoryDropdownActive] = useState(false)

    const handleChangeDropDown = (currentActive, state) => {

        if ('tags' === currentActive && state === true) {
            setIsTagsDropdownActive(true)
            setIsCategoryDropdownActive(false)
        }
        else if ('category' === currentActive && state === true) {
            setIsTagsDropdownActive(false)
            setIsCategoryDropdownActive(true)
        }
        else if ('tags' === currentActive && state === false) {
            setIsTagsDropdownActive(false)
        }
        else if ('category' === currentActive && state === false) {
            setIsCategoryDropdownActive(false)
        }

    }

    return (
        <DropDownBox>

            <div
                className='flex flex-col gap-4 w-full h-full p-3 rounded bg-background'
            >
                <TagsContainer
                    handleTagChange={handleTagChange}
                    tags={tags}
                    isTagsDropdownActive={isTagsDropdownActive}
                    handleChangeDropDown={handleChangeDropDown}
                />

                <CategoryContainer
                    category={category}
                    handleCategoryChange={handleCategoryChange}
                    isCategoryDropdownActive={isCategoryDropdownActive}
                    handleChangeDropDown={handleChangeDropDown}
                />

            </div>

        </DropDownBox>
    )

}

export default LabelBox