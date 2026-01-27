import React, { useRef } from 'react'

const ImageInput = ({ name, value, onChange, id}) => {
    
    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        onChange(id, file, 'Image')
    }

    const triggerFileInput = () => {
        fileInputRef.current.click()
    }

    return (
        <div
            className={`w-full h-full relative flex flex-col gap-2 items-center justify-center border-2 border-dashed aspect-video border-dark-background/20 dark:border-background/20 rounded ${value !== null ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => triggerFileInput()}
            disabled={value !== null}
        >
            <input 
                type="file" 
                className='appearance-none hidden' 
                onChange={handleFileChange}
                ref={fileInputRef}  
            />
            <div
                className='flex flex-col gap-5 w-fit h-fit items-center relative'                
            >
                <svg className='text-text/40 dark:text-dark-text/40' xmlns="http://www.w3.org/2000/svg" width={80} height={80} fill={"currentColor"} viewBox="0 0 24 24"><path d="M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2m0-2v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V19h-14ZM19 5v5.59L16.71 8.3a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14Z"></path><path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3"></path></svg>
                <svg className='absolute top-10 left-20 bg-accent text-dark-text p-2 rounded-full' xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill={"currentColor"} viewBox="0 0 24 24"><path d="M13 16V7.41l4.29 4.3 1.42-1.42L12 3.59l-6.71 6.7 1.42 1.42L11 7.41V16zm-9 2h16v2H4z"></path></svg>
                <h3
                    className='text-lg font-medium text-text/40 dark:text-dark-text/40'
                >
                    Upload an image
                </h3>
            </div>
        </div>
    )
}

export default ImageInput