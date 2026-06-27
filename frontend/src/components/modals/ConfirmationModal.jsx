import React from 'react'

const ConfirmationModal = ({
    process = 'Delete Post',
    info = 'Are you sure you want to delete this post? This is an irreversible action!',
    cancelFtn,
    ftn,
    isActive = false
}) => {
    return (
        <div
            className={`${isActive ? 'flex' : 'hidden'} top-0 left-0 z-60 w-full h-screen bg-black/20 flex items-center justify-center absolute`}
        >
            
            {/* modal */}
            <div
                className='w-92 h-48 bg-background rounded shadow shadow-text/50 flex flex-col justify-between'
            >

                {/* details */}
                <div
                    className='w-full h-fit flex flex-col gap-1 p-3 px-4'
                >
                    {/* process */}
                    <h2
                        className='text-xl font-medium'
                    >
                        {process}
                    </h2>
                    <p
                        className='text-text/70 w-4/5 text-sm'
                    >
                        {info}
                    </p>
                </div>

                {/* btns */}
                <div
                    className='w-full h-fit p-2 bg-black/4 flex items-center justify-end gap-2'
                >

                    <button
                        className='p-2 px-3 rounded text-sm hover:bg-background cursor-pointer duration-200 hover:text-text hover:shadow hover:shadow-text/20'
                        onClick={cancelFtn}
                    >
                        Cancel
                    </button>   

                    <button
                        className='p-2 px-3 rounded text-sm hover:bg-rose-600 cursor-pointer duration-200 hover:text-background bg-rose-500 shadow shadow-text/20 text-background'
                        onClick={ftn}
                    >
                        Confirm
                    </button>   

                </div>

            </div>

        </div>
    )
}

export default ConfirmationModal