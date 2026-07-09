import React from 'react'
import Icon from '../../assets/Icon'
import { useAuth } from '../../context/AuthContext'

const UserDetails = ({
    isUserSettingsActive,
    setIsUserSettingsActive,
}) => {

    const { user } = useAuth()

    const 

    return (
        <div
            className={`absolute left-0 top-0 bg-black/10 items-center justify-center w-full h-screen z-50 ${isUserSettingsActive ? 'flex' : 'hidden'} text-text`}
        >

            {/* actual container */}
            <div
                className='bg-background rounded h-130 w-110 shadow shadow-text/30 flex flex-col gap-8 p-4 py-3'
            >

                {/* title and close btn */}
                <div
                    className='flex flex-row items-center justify-between w-full h-fit'
                >
                    <h2
                        className='text-xl font-medium'
                    >
                        My profile
                    </h2>
                    <button
                        className='p-1 rounded-full bg-rose-200/50 text-rose-700 cursor-pointer hover:bg-rose-500 hover:text-background duration-200'
                        onClick={() => setIsUserSettingsActive(false)}
                    >
                        <Icon
                            type={'close'}
                            size='14'
                        />
                    </button>
                </div>

                {/* details */}
                <div
                    className='flex flex-col gap-2 w-full h-full'
                >

                    {/* user image and details */}
                    <div
                        className='flex flex-row w-full h-fit gap-3'
                    >

                        {/* profile img */}
                        <img 
                            src={user?.profileImg} 
                            alt="" 
                            className='rounded-full size-24'
                        />

                        <div
                            className='flex flex-col gap-4 w-full h-full'
                        >
                            <div
                                className='flex flex-col w-fit h-fit'
                            >
                                <h2
                                    className='text-lg/tight text-text font-semibold'
                                >
                                    {user?.username}
                                </h2>
                                <h2
                                    className='text-base/tight text-text/70'
                                >
                                    {user?.email}
                                </h2>
                            </div>
                            <div
                                className='w-full h-full flex items-center justify-between'
                            >
                                <span
                                    className='text-text/70'
                                >
                                    <Icon
                                        type={'eye'}
                                        size='20'
                                    />

                                </span>
                            </div>
                        </div>

                    </div>


                </div>

            </div>

        </div>
    )
}

export default UserDetails