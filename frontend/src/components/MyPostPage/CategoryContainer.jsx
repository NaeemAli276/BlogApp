import React, { useState } from 'react'
import Icon from '../../assets/Icon'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../../apis/categoryApi'

const CategoryContainer = ({ 
    category = '',
    handleCategoryChange
}) => {

    const [isDropdownActive, setIsDropdownActive] = useState(false)

    const { isLoading, error, data } = useQuery({
        queryKey: ['get_categories'],
        queryFn: getCategories
    })

    const handleCategory = (category) => {
        setIsDropdownActive(false)
        handleCategoryChange(category)
    }

    return (
        
        <div
            className='flex flex-col gap-2 w-full h-fit relative'
        >
            
            {/* selected tags box */}
            <div
                className='flex flex-col gap-1 w-full h-full relative'
                onClick={() => setIsDropdownActive(!isDropdownActive)}
            >

                <h2
                    className=''
                >
                    Selected Tags:
                </h2>

                {/* selected tags */}
                <div
                    className='flex flex-row w-full h-fit p-2 rounded border-2 border-primary gap-2 pr-4 overflow-y-scroll scrollbar-hide z-20'
                >

                    <h2
                        className={`${category?.length <= 0 ? 'text-text/70' : 'text-text'}`}
                    >
                        {
                            category?.length <= 0
                            ?   'None' 
                            :   category
                        }
                    </h2>

                    <button
                        className='bg-background rounded top-8 right-0.5 absolute p-1.5 px-2 z-10 cursor-pointer'
                        // onClick={() => setIsDropdownActive(!isDropdownActive)}
                        type='button'
                    >
                        <Icon
                            size='24'
                            type={'chevron'}
                            className={`text-primary ${isDropdownActive ? 'rotate-180' : 'rotate-0'} cursor-pointer`}
                        />
                    </button>
                </div>

                {/* dropdown */}
                <div
                    className={`${isDropdownActive ? 'flex' : 'hidden'} flex-col gap-0 min-h-56 min-w-80 max-w-80 bg-background absolute top-20 rounded right-0 shadow z-60 shadow-text/70`}
                >
                    {/* loading state */}
                    {
                        isLoading &&
                        <div
                            className='w-full h-52 flex items-center justify-center'
                        >
                            <Icon
                                type={'spinner'}
                                className='text-text animate-spin'
                            />
                        </div>
                    }

                    {/* error state */}
                    {
                        error &&
                        <div
                            className='w-full h-52 flex items-center justify-center flex-col gap-2'
                        >
                            <Icon
                                size='36'
                                type={'sad'}
                                className='text-text'
                            />
                            <h2
                                className='text-text/70 text-sm w-3/5 text-center'
                            >
                                An error has occured, try searching again
                            </h2>
                        </div>
                    }

                    {/* actual state */}
                    {
                        data?.length > 0 &&
                        <div
                            className='flex flex-col w-full overflow-y-scroll max-h-56 scrollbar-hide'
                        >
                            {
                                data?.map((cat, index) => (
                                    <button
                                        className={`px-3 p-2 hover:bg-secondary hover:text-primary text-text text-start 
                                            ${index === 0 && 'rounded-t'}
                                            ${index === data?.length - 1 && 'rounded-b'}
                                        `}
                                        onClick={() => handleCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))
                            }                            
                        </div>
                    }

                    {/* empty state */}
                    {
                        data?.length <= 0 &&
                        <div
                            className='flex flex-col w-full h-40 gap-1 items-center justify-center'
                        >
                            <Icon
                                type={'sad'}
                                size='xl'
                            />
                            <h2
                                className='text-text/70 w-3/4 text-center'
                            >
                                No tags found, try searching something else
                            </h2>
                        </div>
                    }

                </div>

            </div>

        </div>
    )
}

export default CategoryContainer