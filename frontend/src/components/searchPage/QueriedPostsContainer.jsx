import React from 'react'
import Icon from '../../assets/Icon'
import VerticalPostCard from '../cards/VerticalPostCard'

const QueriedPostsContainer = ({
    isLoading = false ,
    error,
    posts = [],
    debouncedQuery
}) => {
    

    if (debouncedQuery?.length <= 0) {
        return (
            <div
                className='flex items-center justify-center w-full min-h-80 bg-background shadow shadow-text/20 rounded flex-col gap-5'
            >
                <i
                    className='relative bg-secondary/50 text-primary p-4 rounded-full'
                >
                    <Icon
                        type={'cardView'}
                        size='75'
                    />
                    <i
                        className='absolute bottom-5 right-4 bg-primary text-secondary rounded-full p-1'
                    >
                        <Icon
                            type={'close'}
                            size='24'
                        />
                    </i>
                </i>

                <h2
                    className='text-text/70 text-sm w-52 text-center'
                >
                    Start typing the in the search field to find posts
                </h2>

            </div>
        )
    }
    if (isLoading) {
        return (
            <div
                className='w-full min-h-3/4 flex items-center justify-center'
            >
                <Icon
                    type={'spinner'}
                />    
            </div>
        )
    }
    if (error) {
        return (
            <div
                className='flex items-center justify-center w-full min-h-80 bg-background shadow shadow-text/20 rounded flex-col gap-5'
            >
                <i
                    className='relative bg-secondary/50 text-primary p-4 rounded-full'
                >
                    <Icon
                        type={'sad'}
                        size='75'
                    />
                </i>

                <h2
                    className='text-text/70 text-sm w-60 text-center'
                >
                    An error has occured, try typing something else.
                </h2>

            </div>
        )
    }
    else {
        return (
            <div
                className='w-full min-h-80 h-full overflow-y-scroll grid-cols-12 grid-rows-12 grid gap-2 overflow-x-hidden p-1'
            >
                {
                    posts?.map((post) => (
                        <VerticalPostCard
                            post={post}
                        />
                    ))
                }
            </div>
        )
    }

}

export default QueriedPostsContainer