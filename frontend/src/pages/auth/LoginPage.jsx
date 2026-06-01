import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TextInput from '../../components/inputs/TextInput'

const LoginPage = () => {

    const [formDetails, setFormDetails] = useState({
        email: '',
        password: '',
        remember_me: false
    })

    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        console.log(formDetails)
    }, [formDetails])

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
                        <svg className='p-1 border-2 border-background rounded' xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20.04 2.323c1.016-.355 1.992.621 1.637 1.637l-5.925 16.93c-.385 1.098-1.915 1.16-2.387.097l-2.859-6.432l4.024-4.025a.75.75 0 0 0-1.06-1.06l-4.025 4.024l-6.432-2.859c-1.063-.473-1-2.002.097-2.387z"></path>
                        </svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"  d="M20 12H4m0 0l6-6m-6 6l6 6"></path>
                        </svg>
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
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem eaque perspiciatis commodi deserunt blanditiis.
                    </h3>
                </div>

            </div>

            {/* form */}
            <div
                className='col-span-8 w-full h-full row-span-full p-8 px-20 flex flex-col items-center justify-center gap-8'
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
                            placeholder='Enter your email...'
                        >
                            <button
                                className={`right-1.5 absolute p-2 text-text/70 ${showPassword ? 'top-7' : 'top-8'}`}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {
                                    showPassword
                                    ?   <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width={24} 
                                            height={24} 
                                            viewBox="0 0 24 24"
                                        >
                                            <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                                                <path d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z"></path>
                                                <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"></path>
                                            </g>
                                        </svg>
                                    :   <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width={24} 
                                            height={24} 
                                            viewBox="0 0 24 24"
                                        >
                                            <path fill="currentColor" d="M2.69 6.705a.75.75 0 0 0-1.38.59zm12.897 6.624l-.274-.698zm-6.546.409a.75.75 0 1 0-1.257-.818zm-2.67 1.353a.75.75 0 1 0 1.258.818zM22.69 7.295a.75.75 0 0 0-1.378-.59zM19 11.13l-.513-.547zm.97 2.03a.75.75 0 1 0 1.06-1.06zm-8.72 3.34a.75.75 0 0 0 1.5 0zm5.121-.591a.75.75 0 1 0 1.258-.818zm-10.84-4.25A.75.75 0 0 0 4.47 10.6zm-2.561.44a.75.75 0 0 0 1.06 1.06zM12 13.25c-3.224 0-5.539-1.605-7.075-3.26a13.6 13.6 0 0 1-1.702-2.28a12 12 0 0 1-.507-.946l-.022-.049l-.004-.01l-.001-.001L2 7l-.69.296h.001l.001.003l.003.006l.04.088q.039.088.117.243c.103.206.256.496.462.841c.41.69 1.035 1.61 1.891 2.533C5.54 12.855 8.224 14.75 12 14.75zm3.313-.62c-.97.383-2.071.62-3.313.62v1.5c1.438 0 2.725-.276 3.862-.723zm-7.529.29l-1.413 2.17l1.258.818l1.412-2.171zM22 7l-.69-.296h.001v.002l-.007.013l-.028.062a12 12 0 0 1-.64 1.162a13.3 13.3 0 0 1-2.15 2.639l1.027 1.094a14.8 14.8 0 0 0 3.122-4.26l.039-.085l.01-.024l.004-.007v-.003h.001v-.001zm-3.513 3.582c-.86.806-1.913 1.552-3.174 2.049l.549 1.396c1.473-.58 2.685-1.444 3.651-2.351zm-.017 1.077l1.5 1.5l1.06-1.06l-1.5-1.5zM11.25 14v2.5h1.5V14zm3.709-.262l1.412 2.171l1.258-.818l-1.413-2.171zm-10.49-3.14l-1.5 1.5L4.03 13.16l1.5-1.5z"></path>
                                        </svg>
                                }
                            </button>
                        </TextInput>
                    </div>

                    {/* remember me and forgot */}
                    <div
                        className='flex flex-row items-center justify-between w-full h-fit'
                    >
                        <label 
                            htmlFor="rememberMe" 
                            className='flex flex-row items-center gap-2 text-text/70 peer text-sm'
                        >
                            <input
                                id='rememberMe'
                                type="checkbox"
                                className='appearance-none p-2 rounded border-2 border-primary bg-background peer-checked:bg-primary' 
                                checked={formDetails.remember_me}
                                onChange={() => setFormDetails({ ...formDetails, remember_me: !formDetails.remember_me })}
                            />

                            remember me
                        </label>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default LoginPage