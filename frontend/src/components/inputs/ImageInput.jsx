import React, { useEffect, useRef, useState } from 'react'

const ImageInput = ({ value, onChange, id, secondaryText, secondaryTextShow}) => {
    
    const fileInputRef = useRef(null)

    // state
    const [file, setFile] = useState(value)

    const handleFileChange = (e) => {
        const newFile = e.target.files[0]
        console.log(newFile)
        onChange(id, newFile, 'Image')
        setFile(newFile)
    }

    const handleDeleteFile = () => {
        onChange(id, null, 'Image')
        setFile(null)
    }

    const triggerFileInput = () => {
        fileInputRef.current.click()
    }

    return (
        <div
            className='flex flex-col w-full h-full gap-2'
        >
            <input 
                type="file" 
                className='appearance-none hidden' 
                onChange={handleFileChange}
                ref={fileInputRef}  
            />
            {
                file === null
                ?   <button
                        className='w-full h-full  flex items-center justify-center border-dashed border-2 dark:border-dark-primary border-primary bg-background rounded aspect-video dark:bg-background/5'
                        onClick={() => triggerFileInput()}
                    >
                        <div
                            className='flex flex-col gap-5 w-fit h-fit items-center relative'                
                        >
                            <svg className='text-text/40 dark:text-dark-text/40' xmlns="http://www.w3.org/2000/svg" width={80} height={80} fill={"currentColor"} viewBox="0 0 24 24"><path d="M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2m0-2v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V19h-14ZM19 5v5.59L16.71 8.3a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14Z"></path><path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3"></path></svg>
                            <svg className='absolute top-10 left-20 bg-primary text-dark-text p-2 rounded-full' xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill={"currentColor"} viewBox="0 0 24 24"><path d="M13 16V7.41l4.29 4.3 1.42-1.42L12 3.59l-6.71 6.7 1.42 1.42L11 7.41V16zm-9 2h16v2H4z"></path></svg>
                            <h3
                                className='text-lg font-medium text-text/40 dark:text-dark-text/40'
                            >
                                Upload an image
                            </h3>
                        </div>
                    </button>
                :   <div
                        className='flex w-full h-full aspect-video relative'
                    >
                        <button
                            className='absolute top-3 right-3 p-1.5 bg-dark-background/40 hover:bg-rose-500 duration-200 text-white rounded-full'
                            onClick={() => handleDeleteFile()}
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox="0 0 24 24"><path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path></svg>
                        </button>
                        <h2
                            className='z-10 absolute bottom-3 left-3 bg-dark-background/60 p-1 px-2 rounded-md w-fit h-fit text-white font-medium text-sm'
                        >
                            {file.name}
                        </h2>
                        <img 
                            className='w-full h-full rounded-md'
                            src={URL.createObjectURL(file)} 
                            alt="" 
                        />
                    </div>
            }
            <h2
                className={`${secondaryTextShow ? 'flex' : 'hidden'} text-sm text-text/60 dark:text-dark-text/60 pl-0.5`}
            >
                {secondaryText}
            </h2>
        </div>
        
    )
}

export default ImageInput