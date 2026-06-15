import React, { useEffect, useState } from 'react'
import { formatDate, truncateText } from '../../utils/textUtils'
import { useNavigate } from 'react-router-dom'
import AuthorBtn from '../btns/AuthorBtn'
import { useQuery } from '@tanstack/react-query'
import { getMostPopularPost } from '../../apis/postApi'
import Icon from '../../assets/Icon'

const HeroPostCard = ({

}) => {

    const { isLoading, error, data } = useQuery({
        queryFn: getMostPopularPost,
        queryKey: ['most_popular_post']
    })

    const navigate = useNavigate()

    

    if (isLoading) {
        return (
            <div
                className='shadow shadow-text/50  aspect-video rounded bg-black/20 items-center justify-center flex'
            >
                <Icon
                    type={'spinner'}
                    className='animate-spin text-text'
                />
            </div>
        )
    }
    if (error) {
        return (
            <div
                className='aspect-video rounded bg-black/20 items-center justify-center flex shadow shadow-text/50 flex-col gap-2 text-text/80 '
            >
                <Icon
                    type={'sad'}
                    size='xl'
                    className='text-text'
                />
                <h3
                    className='w-1/3 text-center'
                >
                    An error has occured, please try reloading the page
                </h3>
            </div>
        )
    }
    else {
        return (
            <div
                className='aspect-video relative shadow shadow-text/50 rounded cursor-pointer'
                onClick={() => navigate(`/posts/${data?.id}`)}
            >

                {/* author */}
                <div
                    className='absolute top-0 left-0 py-4 p-5 w-full h-fit'
                >
                    
                    <AuthorBtn
                        author={data?.author}
                    />

                </div>

                {/* overlay */}
                <div 
                    className='w-full h-3/10 bg-black/50 rounded-b z-10 absolute bottom-0 left-0 flex flex-col gap-2 p-5 py-4 text-background'
                >
                    
                    <span
                        className='bg-secondary w-fit text-primary px-2 p-0.5 rounded-full flex-row flex gap-1 items-center text-sm font-medium'
                    >
                        <Icon
                            type={'circle'}
                            className='size-2.5'
                            size='xs'
                            pack='filled'
                        />
                        {data?.category}
                    </span>

                    {/* title */}
                    <div
                        className='flex flex-col justify-between w-full h-full'
                    >
                        <h2
                            className='text-xl font-semibold'
                        >
                            {truncateText(data?.title, 140)}
                        </h2>
                        <h4
                            className='text-background/80 text-sm flex gap-1.5 items-center'
                        >
                            <Icon
                                type={'calendar'}
                                size={'sm'}
                            />
                            {formatDate(data?.date)}
                        </h4>
                    </div>

                </div>

                {/* main image */}
                <div
                    className='w-full h-full'
                >
                    <img 
                        className='w-full h-full rounded' 
                        src={data?.thumbnail} 
                        alt="thumbnail" 
                    />
                </div>

            </div>
        )
    }

}

export default HeroPostCard