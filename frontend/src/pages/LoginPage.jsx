import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../Context/AuthContext'

import TextInput from '../components/inputs/TextInput'
import PasswordInput from '../components/inputs/PasswordInput'

const LoginPage = () => {

    // context
    const { login } = useAuth() 

    // tanstack
    const { isPending, error,  data } = useQuery({
        queryKey: ['loginData'],
        queryFn: login,
        refetchOnWindowFocus: false
    })

    const [formDetails, setFormDetails] = useState({
        email: '',
        password: '',
        rememberMe: ''
    })

    return (
        <div
            className='grid grid-cols-2 w-full h-screen bg-secondary dark:bg-dark-background font-poppins p-5'
        >
            
            {/* first part */}
            <div
                className='bg-primary w-full h-full rounded-md text-dark-text p-10 py-8 flex flex-col justify-between shadow shadow-text/50'
            >
                
                {/* top part*/}
                <div
                    className='flex flex-row items-center justify-between w-full h-fit'
                >

                    <div
                        className='flex flex-row w-fit h-fit gap-3 items-center'
                    >
                        <i
                            className='p-1 border rounded'
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill={"currentColor"} viewBox="0 0 24 24"><path d="M4 21h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2M14 7h4v2h-4zm0 4h4v2h-4zM6 7h6v6H6zm0 8h12v2H6z"></path></svg>
                        </i>
                        <h1
                            className='text-2xl font-semibold'
                        >
                            Explore
                        </h1>
                    </div>

                    <Link
                        className='w-fit h-fit flex flex-row items-center gap-3 text-sm'
                        to={'/'}
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m6 12 6 5v-4h6v-2h-6V7z"></path></svg>
                        Go back to posts
                    </Link>

                </div>

                {/* bottom part */}
                <div
                    className='flex flex-col gap-2 w-full h-fit'
                >
                    <h1
                        className='text-2xl font-semibold'
                    >
                        Welcome!
                    </h1>
                    <p
                        className='text-dark-text/90'
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores fuga eligendi dolore.
                    </p>
                </div>

            </div>

            {/* second part */}
            <div
                className='w-full h-full p-20'
            >

                {/* top part */}
                <div
                    className='flex flex-col gap-2 w-full h-fit'
                >
                    <h1
                        className='text-4xl font-bold'
                    >
                        Login
                    </h1>
                    <p
                        className='w-104 text-text/70'
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eveniet rem adipisci.
                    </p>
                </div>

                {/* inputs */}
                <div
                    className='flex flex-col gap-4 w-full h-fit py-20'
                >
                    {/* email */}
                    <TextInput
                        name={'Email'}
                        type={'email'}
                        placeholderText={'Enter your email...'}
                        onChange={(e) => setFormDetails({...formDetails, email: e.target.value})}
                        value={formDetails.email}
                        secondaryText={error?.email}
                        isRequired={false}
                        secondaryTextShow={error === null ? false : true}
                    />

                    <PasswordInput
                        name={'Password'}
                        placeholder={'Enter your password...'}
                        onChange={(e) => setFormDetails({...formDetails, password: e.target.value})}
                        value={formDetails.password}
                        secondaryText={error?.password}
                        isRequired={false}
                        secondaryTextShow={error === null ? false : true}
                    />

                </div>

            </div>

        </div>
    )
}

export default LoginPage