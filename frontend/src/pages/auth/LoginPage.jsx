import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextInput from '../../components/inputs/TextInput'
import SubmitBtn from '../../components/btns/SubmitBtn'
import { useAuth } from '../../context/AuthContext'
import { useMutation } from '@tanstack/react-query'
import Icon from '../../assets/Icon'

const LoginPage = () => {

    const { login } = useAuth()

    const navigate = useNavigate()

    const [formDetails, setFormDetails] = useState({
        email: '',
        password: '',
        remember_me: false
    })
    const [error, setError] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const handleLoginSubmit = async (e) => {

        e.preventDefault()

        setError('')
        const response = await mutation.mutateAsync(formDetails)

        if (response === true) {
            navigate('/')
        }
        else {
            setError(response)
        }

    }

    // responsible for handling user info
    const mutation = useMutation({
        mutationFn: login,
    })

    return (
        <div
            className='w-full max-h-screen h-screen grid grid-cols-16 grid-rows-16 p-5 font-poppins bg-background gap-5'
        >
            
            {/* info container */}
            <div
                className='col-span-8 w-full h-full row-span-full bg-linear-150 from-primary to-secondary rounded flex flex-col items-start justify-between p-8 shadow shadow-text/50'
            >
                
                {/* link to homePage and icon/name */}
                <div
                    className='flex flex-row gap-2 w-full h-fit items-start justify-between'
                >
                    <div
                        className='flex flex-row items-center gap-3 w-fit h-fit text-background'
                    >
                        <Icon
                            type={'logo'}
                            size='36'
                            className='p-1 rounded border border-white'
                        />
                        <h2
                            className='text-xl text-background font-semibold'
                        >
                            Swipe
                        </h2>
                    </div>
                    <Link
                        className='text-background/80 flex flex-row items-center gap-1 w-fit h-fit text-sm'
                        to={'/'}
                    >
                        <Icon
                            type={'arrow'}
                            className='rotate-180'
                            size='20'
                        />
                        Back to posts
                    </Link>

                </div>

                {/* title and desc */}
                <div
                    className='flex flex-col gap-0 w-9/10 h-fit'
                >
                    <h2
                        className='text-xl text-background font-medium'
                    >
                        Welcome Back!
                    </h2>
                    <h3
                        className='text-background/70'
                    >
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui dem eaque perspiciatis commodi deserunt blanditiis.
                    </h3>
                </div>

            </div>

            {/* form */}
            <form
                className='col-span-8 w-full h-full row-span-full p-8 px-20 flex flex-col items-center justify-center gap-14'
                onSubmit={handleLoginSubmit}
            >

                {/* title */}
                <div
                    className='flex flex-col gap-1 w-full h-fit'
                >
                    <h2
                        className='text-3xl/tight font-semibold text-text'
                    >
                        Login
                    </h2>
                    <h3
                        className='text-text/70 text-base/tight'
                    >
                        Please enter your details to log into your account.
                    </h3>
                </div>

                {/* fields and remember me/forgot password */}
                <div
                    className='flex flex-col gap-3 w-full h-fit'
                >

                    {/* fields  */}
                    <div
                        className='flex flex-col gap-2 w-full h-fit'
                    >
                        <TextInput
                            text={formDetails.email}
                            name={'Email address'}
                            handleText={(e) => setFormDetails({ ...formDetails, email:e.target.value })}
                            isRequired={true}
                            type={'email'}
                            placeholder='Enter your email...'
                        />
                        <TextInput
                            text={formDetails.password}
                            name={'Password'}
                            handleText={(e) => setFormDetails({ ...formDetails, password:e.target.value })}
                            isRequired={true}
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter your password...'
                        >
                            <button
                                className={`right-1 absolute p-2 text-text/70 top-7.25`}
                                onClick={() => setShowPassword(!showPassword)}
                                type='button'
                            >
                                <Icon
                                    type={showPassword ? 'eye' : 'eyeClosed'}
                                />
                            </button>
                        </TextInput>
                    </div>

                    {/* remember me and forgot */}
                    <div
                        className='flex flex-row items-center justify-between w-full h-fit'
                    >
                        {/* remember me btn */}
                        <label 
                            htmlFor="rememberMe" 
                            className='flex flex-row items-center gap-2 text-text/70 peer text-sm relative'
                        >
                            <input
                                id='rememberMe'
                                type="checkbox"
                                className={`appearance-none p-2 rounded border-2 border-primary ${formDetails.remember_me ? 'bg-primary' : 'bg-background'}`} 
                                checked={formDetails.remember_me}
                                onChange={() => setFormDetails({ ...formDetails, remember_me: !formDetails.remember_me })}
                            />
                            <svg className={`${formDetails.remember_me ? 'flex' : 'hidden'} absolute top-px left-px text-background`} xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
                                <path fill="currentColor" d="m9.55 15.88l8.802-8.801q.146-.146.344-.156t.363.156t.166.357t-.165.356l-8.944 8.95q-.243.243-.566.243t-.566-.243l-4.05-4.05q-.146-.146-.152-.347t.158-.366t.357-.165t.357.165z"></path>
                            </svg>
                            remember me
                        </label>

                        {/* link to forgot password page */}
                        <Link
                            className='text-text/80 flex flex-row items-center gap-1 w-fit h-fit text-sm'
                            to={'/forgot_password'}
                        >
                            Forgot password?
                        </Link>
                    </div>

                </div>

                {/* login and register btn */}
                <div
                    className='flex flex-col gap-2 w-full h-fit'
                >   

                    {/* error message */}
                    <h3
                        className={`${error === '' ? 'hidden' : 'block'} w-full h-fit text-rose-400 text-sm text-center`}
                    >
                        {error}
                    </h3>

                    <SubmitBtn
                        text={mutation.isPending ? `Loading` : 'Sign In'}
                    />
                    <Link
                        className='text-text/70 text-sm text-center hover:text-primary'
                        to={'/Register'}
                    >
                        Don't have an account? Register now 
                    </Link>
                </div>

            </form>

        </div>
    )
}

export default LoginPage