import React from 'react'
import DropDownBox from './DropDownBox'
import ImageInput from '../inputs/ImageInput'

const FeaturedImageBlock = ({ image, handleThumbnail }) => {
    return (
        <DropDownBox
            isRequired={true}
            name={'Thumbnail'}
        >
            <ImageInput
                image={image}
                handleImage={handleThumbnail}
                extraText={'This is the main image that will be used to display your blog/article'}
            />
        </DropDownBox>
    )
}

export default FeaturedImageBlock