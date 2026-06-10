import React from 'react'
import { truncateText } from '../../utils/textUtils'

const ImageCard = ({ imageUrl, name, type, size }) => {
    return (
        <div
            className='relative bg-background shadow shadow-text/50 rounded aspect-video '
        >
            {
                imageUrl !== null
                ?   
                    <>
                        <img 
                            src={imageUrl} 
                            className='rounded size-full'
                            alt="" 
                        />
                        <div
                            className={`absolute p-2 bottom-0 left-0 z-10 w-full h-14 rounded-b bg-text/70 border-t border-background/50`}
                        >
                            <div
                                className='flex flex-row w-full h-fit items-center justify-between'
                            >
                                <h2
                                    className='text-sm text-background'
                                >
                                    {truncateText(name,20)}
                                </h2>
                                <button
                                    className='text-background hover:bg-text/10 rounded-full duration-200 cursor-pointer'
                                >
                                    <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 10a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0-12a2 2 0 1 0 0 4 2 2 0 1 0 0-4"></path></svg>
                                </button>
                            </div>
                            <h3
                                className='text-xs text-background/80'
                            >
                                {type}
                            </h3>
                        </div>
                    </>
                :   
                    <>
                        <div
                            className='w-full h-full rounded bg-text/10 items-start justify-center pt-10 flex'
                        >
                            <svg className='text-text/30' xmlns="http://www.w3.org/2000/svg" width={64} height={64} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2m0-2v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V19h-14ZM19 5v5.59L16.71 8.3a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14Z"></path><path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3"></path></svg>
                        </div>
                        <div
                            className={`absolute p-2 bottom-0 left-0 z-10 w-full h-14 rounded-b bg-text/10 border-t border-text/50`}
                        >
                            <div
                                className='flex flex-row w-full h-fit items-center justify-between'
                            >
                                <h2
                                    className='text-sm text-text'
                                >
                                    {truncateText(name,20)}
                                </h2>
                                <button
                                    className='text-text hover:bg-text/10 rounded-full duration-200 cursor-pointer'
                                >
                                    <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 10a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0-12a2 2 0 1 0 0 4 2 2 0 1 0 0-4"></path></svg>
                                </button>
                            </div>
                            <h3
                                className='text-xs text-text/80'
                            >
                                {type}
                            </h3>
                        </div>
                    </>
                    
            }
            
        </div>
    )
}

export default ImageCard