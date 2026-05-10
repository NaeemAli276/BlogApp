import React from 'react'
import SemiCircleProgress from '../AssetsPage/SemiCircleProgress'

const AssetsDetails = () => {

    

    return (
        <div
            className='bg-background rounded shadow shadow-text/50 col-span-4 row-span-full col-start-13 flex flex-col gap-4 w-full h-full p-3'
        >
            
            {/* total storage */}
            <div
                className='flex flex-col gap-4 w-full h-fit'
            >
                <h2
                    className='text-text/70'
                >
                    Storage:
                </h2>
                <SemiCircleProgress
                    currentAmount={1.5}
                    totalAmount={5}
                    strokeWidth={8}
                    color='#1d4ed8'
                />
            </div>

            {/* recent files */}
            <div
                className='flex flex-col gap-2 w-full h-full'
            >

            </div>

        </div>
    )
}

export default AssetsDetails