import React, { useEffect, useRef, useState } from 'react'
import Icon from '../../assets/Icon'
import { useAuth } from '../../context/AuthContext'
import UserStats from './UserStats'
import TextInput from '../inputs/TextInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '../../apis/authApi'

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

    const queryClient = useQueryClient()

    const updateUserMutation = useMutation({
        mutationFn: updateUser,
        mutationKey: ['update_user'],
        onSuccess: (updatedUserFromServer) => {

            queryClient.setQueryData(['get_user'], (oldData) => {
                return updatedUserFromServer
            })

            queryClient.invalidateQueries({ queryKey: ['get_user'] });
        },
        onError: (error) => {
            console.error('Update error:', error);
        }
    })

    const deleteUserMutation = useMutation({

    })

    const handleUpdateUser = () => {
        updateUserMutation.mutate(userData)
    }

    const [isEditActive, setIsEditActive] = useState(false)

    // image input handling

    const fileInputRef = useRef()

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

    const handleImage = (e) => {
        if (userData?.profileImg === null) {
            const file = e.target.files[0]; // ← Get the actual file
            if (file) {
                setUserData({
                    ...userData,
                    profileImg: file // ← Store the file object
                });
            }
        }
        else {
            setUserData({
                ...userData,
                profileImg: null 
            })
        }
    }

    const handleChangeValue = (e, type) => {
        setUserData({
            ...userData,
            [type]: e.target.value
        })
    }

    function checkImageTypeIsBlob(source) {
        // Check if it's a Blob
        if (source instanceof Blob) {
            // console.log('This is a Blob');
            return true;
        }
        
        // Check if it's a string (URL)
        if (typeof source === 'string') {
            // console.log('This is a string/URL');
            return false;
        }
        
        return 'unknown';
    }

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

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
                                user?.profileImg !== null
                                ?   <img 
                                        src={user?.profileImg} 
                                        alt="" 
                                        className='rounded-full size-24 w-33 shadow shadow-text/20'
                                    />
                                :   <Icon
                                        type={'user'}
                                        size='96'
                                        className='border-primary border-2 rounded-full p-3'
                                    /> 
                            }
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

                        <div
                            className='flex flex-row items-start w-full gap-2'
                        >

                            <h2
                                className='text-text font-medium pr-5.5'
                            >
                                Profile Image
                            </h2>

                            {
                                userData?.profileImg === null
                                ?   <div>
                                        <input 
                                            type="file" 
                                            ref={fileInputRef}
                                            onChange={(e) => handleImage(e)}
                                            className='hidden'
                                        />
                                        <button
                                            className='size-24 border-2 border-text/70 rounded border-dashed cursor-pointer relative text-text/60'
                                            onClick={() => triggerFileInput()}
                                            type='button'
                                        >
                                            <Icon
                                                type={'image'}
                                                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '
                                            />
                                            <Icon
                                                type='plus'
                                                className='absolute top-1/2 left-1/2 bg-darkGreen dark:bg-green text-background rounded-full bg-secondary'
                                                // style={{ color: 'white' }}
                                                size='20'
                                            />
                                        </button>
                                    </div>
                                :   <div
                                        className='relative'
                                    >
                                        {/* the image preview */}
                                        <img 
                                            src={
                                                checkImageTypeIsBlob(userData?.profileImg) || checkImageTypeIsBlob(userData?.profileImg) === 'unknown'  
                                                    ? URL.createObjectURL(userData?.profileImg)     
                                                    : userData?.profileImg
                                            } 
                                            alt="" 
                                            className={`size-24 ${userData?.profileImg !== null ? 'flex' : 'hidden aspect-square'} rounded shadow shadow-text/20`}
                                        />
                                    </div>
                            }

                            {/* remove btn */}
                            <div
                                className={`flex flex-col gap-2 w-fit h-fit ${isEditActive && userData.profileImg !== null ? 'flex' : 'hidden'}`}
                            >   
                                <button
                                    className='flex flex-row items-center gap-2 w-full h-fit bg-rose-200/50 text-rose-600 hover:bg-rose-500 hover:text-background p-2 rounded px-3 pl-2.5 text-sm duration-200'
                                    onClick={() => setUserData({ ...userData, profileImg: null })}
                                >
                                    <Icon
                                        type={'trash'}
                                        size='20'
                                    />
                                    <h2>
                                        Delete
                                    </h2>
                                </button>
                            </div>

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
                                    className='w-fit h-fit pr-2.5 p-2 rounded bg-rose-100/80 text-rose-500 hover:bg-rose-500 hover:text-background flex flex-row gap-2 items-center duration-200 text-sm'
                                    onClick={() => handleToggleEditing()}
                                >   
                                    <Icon
                                        type={'close'}
                                        size='18'
                                    />
                                    Close
                                </button>
                                <button
                                    className='w-fit h-fit pr-2.5 p-2 rounded bg-secondary/50 text-primary hover:bg-primary hover:text-background flex flex-row gap-2 items-center duration-200 text-sm'
                                    onClick={() => handleUpdateUser()}
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
                                        className='w-fit h-fit pr-2.5 p-2 rounded bg-rose-100/50 text-rose-600 hover:bg-rose-500 hover:text-background flex flex-row gap-2 items-center text-sm text-nowrap duration-200'
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
                                        className='w-fit h-fit pr-2.5 p-2 rounded bg-secondary/50 text-primary hover:bg-primary hover:text-background flex flex-row gap-2 items-center text-sm duration-200'
                                        onClick={() => handleToggleEditing()}
                                    >   
                                        <Icon
                                            type={'lock'}
                                            size='20'
                                        />
                                        ChangePassword
                                    </button>
                                    <button
                                        className='w-fit h-fit pr-2.5 p-2 rounded bg-secondary/50 text-primary hover:bg-primary hover:text-background flex flex-row gap-2 items-center text-sm duration-200'
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