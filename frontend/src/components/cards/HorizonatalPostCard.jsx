import React from 'react'
import { truncateText } from '../../utils/textUtils'
import AuthorBtn from '../btns/AuthorBtn'
import defaultUserImg from '../../assets/user.png'

const HorizonatalPostCard = ({
    post
}) => {
    return (
        <div
            className='flex flex-row items-start justify-between gap-4 bg-background shadow shadow-text/50 p-3 rounded'
        >
            
            {/* details */}
            <div
                className='flex flex-col gap-2 items-start justify-between w-full h-full'
            >

                {/* category and title */}
                <div
                    className='flex flex-col gap-0 w-full h-fit'
                >

                    <h5
                        className='text-xs/tight text-text/70'
                    >
                        {post?.category}
                    </h5>

                    <h3
                        className='text-wrap text-sm text-text'
                    >
                        {
                            truncateText(post?.title, 90)
                        }
                    </h3>

                </div>

                {/* date and author */}
                <div
                    className='flex flex-row items-end justify-between w-full h-fit'
                >

                    <div
                        className='flex flex-row items-start gap-2 w-fit h-fit'
                    >
                        <img 
                            src={defaultUserImg} 
                            alt="" 
                            className='size-5 '
                        />
                    </div>

                    <h3
                        className='text-xs text-text/70'
                    >
                        Date: {post?.date}
                    </h3>

                </div>

            </div>

            {/* thumbnail */}
            <img 
                src={post?.thumbnail} 
                alt="" 
                className='aspect-square rounded object-center size-30'
            />

        </div>
    )
}

export default HorizonatalPostCard