import React, { useState } from 'react'
import TagBtn from '../../components/btns/TagBtn'
import Icon from '../../assets/Icon'
import TextInput from '../../components/inputs/TextInput'
import { useQuery } from '@tanstack/react-query'
import { getSearchedTags } from '../../apis/TagApi'
import { useDebounce } from "@uidotdev/usehooks";


const TagsContainer = ({
    tags = [],
    handleTagChange = {}
}) => {

    const [isDropdownActive, setIsDropdownActive] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearch = useDebounce(searchQuery, 1000)

    const { isLoading, error, data } = useQuery({
        queryKey: ['get_searchedTags', searchQuery],
        queryFn: () => getSearchedTags(searchQuery),
        enabled: debouncedSearch.length > 0
    })

    return (
        <div
            className='flex flex-col gap-2 w-full h-fit relative'
        >

            {/* selected tags box */}
            <div
                className='flex flex-col gap-1 w-full h-full relative'
                // onClick={() => setIsDropdownActive(!isDropdownActive)}
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

                    {
                        tags?.length <= 0
                        ?   <h2
                                className='p-px text-text/70'
                            >
                                No tags selected
                            </h2>
                        :   tags?.map((tag) => (
                                <TagBtn
                                    name={tag}
                                    key={tag}
                                    handleTagChange={() => handleTagChange(tag)}
                                />
                            ))
                    }
                    <button
                        className='bg-background rounded top-8 right-0.5 absolute p-1.5 px-2 z-10 cursor-pointer'
                        onClick={() => setIsDropdownActive(!isDropdownActive)}
                        type='button'
                    >
                        <Icon
                            size='24'
                            type={'chevron'}
                            className={`text-primary ${isDropdownActive ? 'rotate-180' : 'rotate-0'} cursor-pointer`}
                        />
                    </button>
                </div>
            </div>

            {/* tags dropdown */}
            <div
                className={`${isDropdownActive ? 'flex' : 'hidden'} flex-col gap-0 min-h-56 min-w-80 max-w-80 bg-background absolute top-20 rounded right-0 shadow z-60 shadow-text/70`}
            >

                <div
                    className='p-3 pb-2 w-full h-fit flex flex-row items-start gap-2'
                >
                    <TextInput
                        className='placeholder:text-text/50 outline-none w-full p-2 border-2 border-primary rounded text-text text-sm'
                        placeholder='Search tags...'
                        handleText={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* <button
                        className='p-2 rounded bg-secondary text-primary border-2 border-secondary hover:bg-primary hover:border-primary hover:text-background duration-200'
                        type='button'
                        onClick={() => {}}
                    >
                        <Icon
                            type={'search'}
                        />
                    </button> */}
                </div>

                <span className='w-full h-px bg-primary rounded-full'></span>

                {/* loading state */}
                {
                    isLoading &&
                    <div
                        className='w-full h-40 flex items-center justify-center'
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
                        className='w-full h-40 flex items-center justify-center flex-col gap-2'
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
                        className='flex flex-col w-full h-full gap-1 p-3'
                    >
                        <h2
                            className='text-text text-sm'
                        >
                            Available tags:
                        </h2>
                        <div
                            className='flex flex-wrap w-full h-full gap-2'
                        >
                            {
                                data.map((tag) => (
                                    <TagBtn
                                        isAlreadySelected={tags?.includes(tag)}
                                        key={tag}
                                        name={tag}
                                        handleTagChange={() => handleTagChange(tag)}
                                    />
                                ))
                            }
                        </div>
                        
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
    )
}

export default TagsContainer