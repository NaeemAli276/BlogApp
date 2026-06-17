import React, { useEffect, useState } from 'react'

const AnalyticsCard = ({ 
    icon,
    name,
    stat
}) => {

    const [data, setData] = useState(0)
    const lastWeekData = '40k'


    useEffect(() => {
        setData(stat)
    }, [stat])

    return (
        <div
            className='w-full h-full col-span-4 row-span-3 bg-background rounded shadow shadow-text/20 p-3 px-3.5 relative rounded-l-none border-l-3 border-primary flex flex-col justify-between row-start-1'
        >
            {/* name and icon */}
            <div
                className='flex flex-row items-start justify-between'
            >
                <h2
                    className='text-text/80'
                >
                    {name}
                </h2>
                <i
                    className='p-2 bg-secondary/50 rounded text-primary'
                >
                    {icon}
                </i>
            </div>

            {/* data */}
            <div
                className='flex flex-col w-full h-fit'
            >
                <h3
                    className='text-text text-2xl font-medium'
                >
                    {data}
                </h3>
                {/* <h4
                    className='text-sm text-text/70'
                >
                    Last week: <span className='text-primary'>{lastWeekData}</span>
                </h4> */}
            </div>

        </div>
    )
}

export default AnalyticsCard