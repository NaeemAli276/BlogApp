import React from 'react'
import DropDownBox from './DropDownBox'
import ToggleSwitch from '../btns/ToggleSwitch'

const IsPublishedBox = ({
    handleChangePublish,
    is_published = false
}) => {
    return (
        <DropDownBox
            name='Publish'
        >
            <div
                className='p-2 w-full h-fit px-3 bg-background rounded flex flex-row items-center justify-between'
            >
                <h2>
                    Publish post
                </h2>
                <ToggleSwitch
                    enabled={is_published}
                    onChange={handleChangePublish}
                />
            </div>
        </DropDownBox>
    )
}

export default IsPublishedBox