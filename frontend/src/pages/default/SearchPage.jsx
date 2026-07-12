import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import TextInput from '../../components/inputs/TextInput'
import { useDebounce } from '@uidotdev/usehooks'
import Icon from '../../assets/Icon'
import QueriedPostsContainer from '../../components/searchPage/QueriedPostsContainer'

const SearchPage = () => {
    
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedQuery = useDebounce(searchQuery, 2000)

    return (
        <Layout
            className='flex items-center justify-center flex-col gap-8 w-full h-full pt-56 px-40'
        >
            
            <h2
                className='text-text/90 text-3xl font-semibold w-full text-start'
            >
                Search
            </h2>

            <TextInput
                text={searchQuery}
                handleText={(e) => setSearchQuery(e.target.value)}
                placeholder='Search for a post...'
                className='placeholder:text-text/50 outline-none w-full p-2 border-2 border-primary rounded text-text pl-9 pr-10' 

            >
                <i
                    className='text-text'
                >
                    <Icon
                        type={'search'}
                        className='absolute top-2.25 left-2'
                    />
                </i>
                <button
                    className={`${searchQuery?.length <= 0 ? 'hidden' : 'flex'} text-text absolute top-2.25 right-2`} 
                    onClick={() => setSearchQuery('')}
                >
                    <Icon
                        type={'close'}
                    />
                </button>
            </TextInput>

            <QueriedPostsContainer
                searchQuery={searchQuery}

            />

        </Layout>
    )
}

export default SearchPage