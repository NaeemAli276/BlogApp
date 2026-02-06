import React from 'react'

const ViewPostCard = ({ postDetials, showView = true, toggleView  }) => {

    return (
        <div
            className={`${showView ? 'flex' : 'hidden'} absolute w-full h-screen top-0 left-0 flex justify-end bg-dark-background/50 z-50`}
        >
            <div
                className='w-2/5 h-full bg-background dark:bg-dark-background shadow-md shadow-dark-background border-r-2 p-5  z-50 flex flex-col gap-10'
            >
                
                {/* close button */}
                <div
                    className='flex w-full h-fit'
                >
                    <button
                        className='p-1 rounded-full bg-secondary hover:bg-rose-500 hover:text-dark-text duration-200 '
                        onClick={toggleView}
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path></svg>
                    </button>
                </div>

                {/* main content */}
                <div
                    className='flex flex-col gap-4'
                >
                    <h1
                        className='text-3xl font-semibold '
                    >
                        {postDetials?.title}
                    </h1>

                </div>

            </div>
        </div>

    )
}

export default ViewPostCard 