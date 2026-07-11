import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getUserStats } from '../../apis/postApi'
import { useAuth } from '../../context/AuthContext'
import Icon from '../../assets/Icon'
import { formatCompactNumber } from '../../utils/textUtils'

const UserStats = () => {

    const { user } = useAuth()

    const { isLoading, error, data: stats = {} } = useQuery({
        queryFn: () => getUserStats(user?.id),
        queryKey: ['get_my_stats', user?.id],
        refetchInterval: 20000
    })

    if (isLoading) {
        return(
            <div
                className='p-1 w-full h-fit items-center justify-center flex text-text bg-text/10 rounded shadow shadow-text/20'
            >
                <Icon
                    type={'spinner'}
                    size='20'
                    className='animate-spin'
                />
            </div>
        )
    }
    else if (error) {
        return (
            <div
                className='flex flex-row gap-1 items-center w-full h-fit bg-rose-100/70 p-1 rounded text-rose-500' 
            >
                <Icon
                    type={'close'}
                    size='20'
                />
                <h2
                    className='text-sm'
                >
                    An error occured.
                </h2>
            </div>
        )
    }
    else {
        return (
            <div
                className='w-full h-fit p-1 flex flex-row items-center gap-2'
            >

                <div
                    className='flex flex-row items-center gap-1 text-text/70'
                >
                    <Icon   
                        type={'eye'}
                        size='20'
                    />
                    <h2
                        className='text-sm'
                    >
                        {formatCompactNumber(stats?.total_view_count)}
                    </h2>
                </div>
                <div
                    className='flex flex-row items-center gap-1 text-text/70'
                >
                    <Icon   
                        type={'like'}
                        size='18'
                    />
                    <h2
                        className='text-sm'
                    >
                        {formatCompactNumber(stats?.total_like_count)}
                    </h2>
                </div>
                <div
                    className='flex flex-row items-end gap-1 text-text/70'
                >
                    <Icon   
                        type={'like'}
                        size='18'
                        className='rotate-180'
                    />
                    <h2
                        className='text-sm'
                    >
                        {formatCompactNumber(stats?.total_dislike_count)}
                    </h2>
                </div>

            </div>
        )
    }
}

export default UserStats