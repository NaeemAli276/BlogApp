import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../../apis/categoryApi'
import CategoryContainer from '../../components/ExplorePage/CategoryContainer'

const ExplorePage = () => {

    const { isLoading, error, data: categories = [] } = useQuery({
        queryKey: ['get_categories'],
        queryFn: getCategories
    })

    return (
        <Layout
            className='py-24 flex flex-col w-full h-full p-20 overflow-y-hidden gap-4'
        >
            
            {
                categories?.map((cat) => (
                    <CategoryContainer
                        category={cat.category_name}
                    />
                ))
            }

        </Layout>
    )
}

export default ExplorePage