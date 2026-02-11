import React, { useState } from 'react'
import DashboardLayout from '../components/layout/dashboard/DashboardLayout'
import UserPostsContainer from '../components/layout/PostPage/UserPostsContainer'
import PostStatisticCard from '../components/card/PostStatisticCard'

const MyPostsPage = () => {

    const [postStats] = useState([
        {
            icon:<svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-10c1.64 0 3 1.36 3 3s-1.36 3-3 3-3-1.36-3-3 1.36-3 3-3"></path></svg>,
            name: 'Total Views',
            value: 12000,
            // extraInfo: 5
        },
        {
            icon:<svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M4 21h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2M14 7h4v2h-4zm0 4h4v2h-4zM6 7h6v6H6zm0 8h12v2H6z"></path></svg>,
            name: 'Total posts',
            value: 56,
            // extraInfo: 12
        },
        {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 2C6.49 2 2 6.49 2 12c0 2.12.68 4.19 1.93 5.9l-1.75 2.53c-.21.31-.24.7-.06 1.03.17.33.51.54.89.54h9c5.51 0 10-4.49 10-10S17.51 2 12 2M6 9h3v2H6zm7 6H6v-2h7zm5 0h-3v-2h3zm0-4h-7V9h7z"></path></svg>,
            name: 'Comments',
            value: 5345,
            // extraInfo: 5
        },
        {
            icon:<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="currentColor" viewBox="0 0 24 24" >
                    <path d="M11.29 20.69c.2.2.45.29.71.29s.51-.1.71-.29l7.5-7.5c2.35-2.35 2.35-6.05 0-8.41-2.29-2.29-5.84-2.35-8.21-.2-2.36-2.15-5.91-2.09-8.21.2-2.35 2.36-2.35 6.06 0 8.41z"></path>
                    </svg>,
            name: 'Reactions',
            value: 830,
            // extraInfo: 12
        }
    ])

    return (
        <DashboardLayout>
            
            {/* user posts */}
            <UserPostsContainer/>

            {/* statistics cards */}
            <div
                className='grid grid-rows-4 w-full gap-2 h-full col-span-12 row-span-14 row-start-3 pl-5'
            >
                {
                    postStats.map((stat) => (
                        <PostStatisticCard
                            name={stat.name}
                            value={stat.value}
                            icon={stat.icon}
                        />
                    ))
                }
            </div>  

        </DashboardLayout>
    )
}

export default MyPostsPage