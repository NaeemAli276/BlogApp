import React from 'react'
import Icon from '../../assets/Icon'


const QueriedPostsContainer = ({
    isLoading = false ,
    error,
    data,
    searchQuery
}) => {
    

    if (searchQuery?.length <= 0) {
        return (
            <div
                className='flex items-center justify-center w-full min-h-80 bg-background shadow shadow-text/20 rounded flex-col gap-5'
            >
                <i
                    className='relative bg-secondary text-primary p-4 rounded-full'
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
            <div>

            </div>
        )
    }

}

export default QueriedPostsContainer