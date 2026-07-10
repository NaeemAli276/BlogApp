import React, { useEffect, useState } from 'react'
import Icon from '../../assets/Icon'
import { useAuth } from '../../context/AuthContext'
import UserStats from './UserStats'
import TextInput from '../inputs/TextInput'

const UserDetails = ({
    isUserSettingsActive,
    setIsUserSettingsActive,
}) => {

    const { user } = useAuth()

    const [userData, setUserData] = useState({
        profileImg: user?.profileImg,
        username: user?.username,
        email: user?.email        
    })

    const [isEditActive, setIsEditActive] = useState(false)

    const handleToggleEditing = () => {
        
        if (isEditActive) {
            setIsEditActive(false)
            setUserData({
                profileImg: user?.profileImg,
                username: user?.username,
                email: user?.email
            })
        }
        else {
            setIsEditActive(true)
        }

    }

    const handleChangeValue = (e, type) => {
        setUserData({
            ...userData,
            [type]: e.target.value
        })
    }

    useEffect(() => {
        console.log(userData)
    }, [userData    ])

    return (
        <div
            className={`absolute left-0 top-0 bg-black/10 items-center justify-center w-full h-screen z-50 ${isUserSettingsActive ? 'flex' : 'hidden'} text-text`}
        >

            {/* actual container */}
            <div
                className='bg-background rounded h-130 w-110 shadow shadow-text/30 flex flex-col gap-8 p-4 py-3 relative'
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
                    className='flex flex-col gap-5 w-full h-full'
                >

                    {/* user image and details */}
                    <div
                        className='flex flex-row w-full h-fit gap-3'
                    >

                        {/* profile img */}
                        <div
                            className='w-fit h-fit flex relative'
                        >
                            {
                                user?.profileImg === null
                                ?   <img 
                                        src={user?.profileImg} 
                                        alt="" 
                                        className='rounded-full size-24'
                                    />
                                :   <Icon
                                        type={'user'}
                                        size='96'
                                        className='border-primary border-2 rounded-full p-3'
                                    /> 
                            }
                            <button
                                className={`${isEditActive ? 'flex' : 'hidden'} absolute bottom-0 right-0  bg-background text-primary rounded-full hover:bg-primary hover:text-background duration-200`}
                            >
                                <Icon
                                    type={'image'}
                                    size='28'
                                    className=' rounded-full p-1 bg-secondary/50 hover:bg-primary hover:text-background'
                                />
                            </button>
                        </div>

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
                            <UserStats/>
                        </div>

                    </div>

                    <span className='w-full h-px rounded-full bg-text/20'></span>

                    {/* input fields */}
                    <div
                        className='w-full h-fit flex flex-col gap-5 px-0.5'
                    >
                        
                        {/* username field */}
                        <div
                            className='flex flex-row items-start w-full h-fit'
                        >
                            <h2
                                className='text-text font-medium w-1/2'
                            >
                                Username
                            </h2>
                            <TextInput
                                text={userData?.username}
                                handleText={(e) => handleChangeValue(e, 'username')}
                                placeholder='Enter a username...'
                                readOnly={!isEditActive}
                            />
                        </div>

                        {/* email field */}
                        <div
                            className='flex flex-row items-start w-full h-fit'
                        >
                            <h2
                                className='text-text font-medium w-1/2'
                            >
                                Email
                            </h2>
                            <TextInput
                                text={userData?.email}
                                handleText={(e) => handleChangeValue(e, 'email')}
                                placeholder='Enter a email...'
                                readOnly={!isEditActive}
                            />
                        </div>
                    </div>

                </div>

                {/* edit or close and update btns */}
                <div
                    className='absolute bottom-0 left-0 p-2 bg-background w-full h-fit rounded-b flex items-center justify-end'
                >
                    {
                        isEditActive
                        ?   <div
                                className='flex flex-row items-center gap-2 w-fit h-fit text-sm'
                            >
                                <button
                                    className='w-fit h-fit pr-2.5 p-2 font-medium rounded bg-rose-100/80 text-rose-500 hover:bg-rose-500 hover:text-background flex flex-row gap-2 items-center duration-200 text-sm'
                                    onClick={() => handleToggleEditing()}
                                >   
                                    <Icon
                                        type={'close'}
                                        size='18'
                                    />
                                    Close
                                </button>
                                <button
                                    className='w-fit h-fit pr-2.5 p-2 font-medium rounded bg-secondary/50 text-primary hover:bg-primary hover:text-background flex flex-row gap-2 items-center duration-200 text-sm'
                                    onClick={() => {}}
                                >   
                                    <Icon
                                        type={'update'}
                                        size='18'
                                    />
                                    Update
                                </button>
                            </div>
                        :   <div
                                className='flex flex-row items-center justify-between w-full h-fit'
                            >
                                <div
                                    className='w-full h-fit'
                                >
                                    <button
                                        className='w-fit h-fit pr-2.5 p-2 font-medium rounded bg-rose-100/50 text-rose-600 hover:bg-rose-500 hover:text-background flex flex-row gap-2 items-center text-sm text-nowrap duration-200'
                                    >
                                        <Icon
                                            size='20'
                                            type={'lock'}
                                        />
                                        Delete user
                                    </button>
                                </div>
                                <div
                                    className='flex flex-row items-center gap-2 w-full h-fit'
                                >
                                    <button
                                        className='w-fit h-fit pr-2.5 p-2 font-medium rounded bg-secondary/50 text-primary hover:bg-primary hover:text-background flex flex-row gap-2 items-center text-sm duration-200'
                                        onClick={() => handleToggleEditing()}
                                    >   
                                        <Icon
                                            type={'lock'}
                                            size='20'
                                        />
                                        ChangePassword
                                    </button>
                                    <button
                                        className='w-fit h-fit pr-2.5 p-2 font-medium rounded bg-secondary/50 text-primary hover:bg-primary hover:text-background flex flex-row gap-2 items-center text-sm duration-200'
                                        onClick={() => handleToggleEditing()}
                                    >   
                                        <Icon
                                            type={'edit'}
                                            size='20'
                                        />
                                        Edit
                                    </button>
                                </div>
                            </div>
                    }
                </div>

            </div>

        </div>
    )
}

export default UserDetails