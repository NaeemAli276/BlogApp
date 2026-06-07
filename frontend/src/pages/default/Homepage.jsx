import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import SectionContainer from '../../components/Layout/SectionContainer'
import PostCard from '../../components/PostPage/PostCard'
import HeroPostCard from '../../components/cards/HeroPostCard'
import SmallPostCard from '../../components/cards/SmallPostCard'
import PopularPostsContainer from '../../components/HomePage/PopularPostsContainer'
import RecentPostsContainer from '../../components/HomePage/RecentPostsContainer'

const Homepage = () => {
        
    return (
        <Layout>

            {/* hero section */}
            <SectionContainer>
                
                {/* main post */}
                <div
                    className='col-span-8 row-span-full w-full h-full'
                >
                    <HeroPostCard/>
                </div>

                {/* popular posts */}
                <PopularPostsContainer/>

            </SectionContainer>

            {/* most recent section */}
            <SectionContainer
                className='grid grid-cols-12 grid-rows-12 w-full h-[150vh] max-h-[150vh] gap-4'
            >

                <div
                    className='w-full h-full flex items-end justify-end col-span-full row-span-1'
                >
                    <span className='w-full h-px bg-text/50 rounded'></span>
                </div>

                <div
                    className='w-full h-full flex items-end justify-start col-span-full row-span-1'
                >
                    <h2
                        className='text-text font-medium text-xl'
                    >
                        Most Recent
                    </h2>
                </div>

                <RecentPostsContainer/>

            </SectionContainer>

        </Layout>
    )
}

export default Homepage