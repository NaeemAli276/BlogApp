import React, { useState, useRef, useEffect } from 'react'

const ImageInput = ({ handleImage, image, extraText }) => {
    
    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        handleImage(file)
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleRemoveImage = () => {
        handleImage(image)
    }

    return (
        <div
            className='flex flex-col w-full h-full bg-background rounded relative p-4 gap-2'
        >

            <div
                className='flex relative aspect-video h-72 bg-background border-text/50 border-dashed border-2 rounded w-full '
            >
                {
                    image === null
                    ?   <>
                            {/* the actual image uploaded */}
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className='hidden'
                            />

                            {/* triggers the input */}
                            <button
                                className={`${image !== null ? 'hidden' : 'flex'} w-full h-full relative cursor-pointer`}
                                onClick={triggerFileInput}
                            >
                                <svg className='text-text absolute top-1/2 left-1/2 -translate-1/2' xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill={"currentColor"} viewBox="0 0 24 24"><path d="m12 12-1-1-2 3h10l-4-6z"></path><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M8 16V4h12v12z"></path><path d="M4 8H2v12c0 1.1.9 2 2 2h12v-2H4z"></path></svg>
                                <svg className='absolute top-1/2 right-1/2 bg-darkGreen dark:bg-green text-background p-1 rounded-full bg-accent' xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill={"currentColor"} viewBox="0 0 24 24"><path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path></svg>
                            </button>
                        </>
                    :   
                        <>
                            <div
                                className={`${image !== null ? 'flex' : 'hidden'} absolute bottom-3 left-3 w-fit h-fit p-1.5 px-2 bg-background/40 rounded z-10`}
                            >
                                {/* name of the file */}
                                <h3
                                    className='text-sm text-background '
                                >
                                    {image?.name}
                                </h3>
                            </div>

                            {/* the image preview */}
                            <img 
                                src={URL.createObjectURL(image)} 
                                alt="" 
                                className={`w-full h-full ${image !== null ? 'flex' : 'hidden'}`}
                            />
                            <button
                                className='absolute top-3 right-3 bg-text text-background hover:bg-rose-500 duration-200 p-1 rounded-full'
                                onClick={() => handleRemoveImage()}
                            >
                                <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path></svg>
                            </button>
                        </>
                }
            </div>

            <h3
                className='text-text/70 text-sm'
            >
                {extraText}
            </h3>

        </div>
    )
}

export default ImageInput