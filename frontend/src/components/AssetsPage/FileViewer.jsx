import React, { useState } from 'react'
import ImageCard from './ImageCard'

const FileViewer = ({ files = [] }) => {
    
    const [activeFilter, setActiveFilter] = useState('Latest')
    const [isDropdownActive, setIsDropdownActive] = useState(false)

    const filterBtns = [
        {
            name: 'Latest',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M19.07 4.93c-.45-.45-.95-.86-1.48-1.22-.54-.36-1.11-.67-1.7-.92-.6-.25-1.24-.45-1.88-.58-1.31-.27-2.71-.27-4.03 0-.64.13-1.27.33-1.88.58-.59.25-1.16.56-1.7.92-.53.36-1.03.77-1.48 1.22s-.86.95-1.22 1.48c-.36.54-.67 1.11-.92 1.7-.25.6-.45 1.24-.58 1.88-.13.66-.2 1.33-.2 2.01s.07 1.36.2 2.01c.13.64.33 1.27.58 1.88.25.59.56 1.16.92 1.7.36.53.77 1.03 1.22 1.48s.95.86 1.48 1.22c.54.36 1.11.67 1.7.92.6.25 1.24.45 1.88.58.66.13 1.33.2 2.01.2s1.36-.07 2.01-.2c.64-.13 1.27-.33 1.88-.58.59-.25 1.16-.56 1.7-.92.53-.36 1.03-.77 1.48-1.22s.86-.95 1.22-1.48c.36-.54.67-1.11.92-1.7.25-.6.45-1.24.58-1.88.13-.66.2-1.33.2-2.01h-2a7.85 7.85 0 0 1-.63 3.11c-.2.47-.45.93-.74 1.36-.29.42-.62.82-.98 1.18s-.76.69-1.18.98c-.43.29-.89.54-1.36.74-.48.2-.99.36-1.5.47-1.05.21-2.18.21-3.22 0a8 8 0 0 1-1.5-.47c-.47-.2-.93-.45-1.36-.74-.42-.29-.82-.62-1.18-.98s-.69-.76-.98-1.18c-.29-.43-.54-.89-.74-1.36-.2-.48-.36-.99-.47-1.5A8 8 0 0 1 3.98 12a7.85 7.85 0 0 1 .63-3.11c.2-.47.45-.93.74-1.36.29-.42.62-.82.98-1.18s.76-.69 1.18-.98c.43-.29.89-.54 1.36-.74.48-.2.99-.36 1.5-.47 1.05-.21 2.18-.21 3.22 0 .51.11 1.02.26 1.5.47.47.2.93.45 1.36.74.42.29.82.62 1.18.98.17.17.32.34.48.52L15.98 9h6V3l-2.45 2.45c-.15-.18-.31-.36-.48-.52Z"></path><path d="M11 7v6h6v-2h-4V7z"></path></svg>
        },
        {
            name: 'Oldest',
            icon:< svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M21.21 8.11c-.25-.59-.56-1.16-.92-1.7-.36-.53-.77-1.03-1.22-1.48s-.95-.86-1.48-1.22c-.54-.36-1.11-.67-1.7-.92-.6-.26-1.24-.45-1.88-.58-1.31-.27-2.72-.27-4.03 0-.64.13-1.27.33-1.88.58-.59.25-1.16.56-1.7.92-.53.36-1.03.77-1.48 1.22-.17.17-.32.35-.48.52L1.99 3v6h6L5.86 6.87c.15-.18.31-.36.48-.52.36-.36.76-.69 1.18-.98.43-.29.89-.54 1.36-.74.48-.2.99-.36 1.5-.47 1.05-.21 2.18-.21 3.23 0 .51.11 1.02.26 1.5.47.47.2.93.45 1.36.74.42.29.82.62 1.18.98s.69.76.98 1.18c.29.43.54.89.74 1.36.2.48.36.99.47 1.5.11.53.16 1.07.16 1.61a7.85 7.85 0 0 1-.63 3.11c-.2.47-.45.93-.74 1.36-.29.42-.62.82-.98 1.18s-.76.69-1.18.98c-.43.29-.89.54-1.36.74-.48.2-.99.36-1.5.47-1.05.21-2.18.21-3.23 0a8 8 0 0 1-1.5-.47c-.47-.2-.93-.45-1.36-.74-.42-.29-.82-.62-1.18-.98s-.69-.76-.98-1.18c-.29-.43-.54-.89-.74-1.36-.2-.48-.36-.99-.47-1.5A8 8 0 0 1 3.99 12h-2c0 .68.07 1.35.2 2.01.13.64.33 1.27.58 1.88.25.59.56 1.16.92 1.7.36.53.77 1.03 1.22 1.48s.95.86 1.48 1.22c.54.36 1.11.67 1.7.92.6.26 1.24.45 1.88.58.66.13 1.33.2 2.01.2s1.36-.07 2.01-.2c.64-.13 1.27-.33 1.88-.58.59-.25 1.16-.56 1.7-.92.53-.36 1.03-.77 1.48-1.22s.86-.95 1.22-1.48c.36-.54.67-1.11.92-1.7.26-.6.45-1.24.58-1.88.13-.66.2-1.34.2-2.01s-.07-1.35-.2-2.01c-.13-.64-.33-1.27-.58-1.88Z"></path><path d="M11 7v6h6v-2h-4V7z"></path></svg>
        },
        {
            name: 'Alphabetical',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M8 2H6v14H2l5 6 5-6H8zm13 11h-7v2h5.44l-5.08 4.23c-.23.19-.36.47-.36.77v1c0 .55.45 1 1 1h7v-2h-5.44l5.08-4.23c.23-.19.36-.47.36-.77v-1c0-.55-.45-1-1-1M18.28 2h-.56c-.86 0-1.62.55-1.9 1.37L13.28 11h2.11l.67-2h3.89l.67 2h2.11l-2.54-7.63A2 2 0 0 0 18.29 2Zm-1.56 5 1-3h.56l1 3z"></path></svg>,
        },
        {
            name: 'Reverse Alphabetical',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M2 8h4v14h2V8h4L7 2zm12 12v1c0 .55.45 1 1 1h7v-2h-5.44l5.08-4.23c.23-.19.36-.47.36-.77v-1c0-.55-.45-1-1-1h-7v2h5.44l-5.08 4.23c-.23.19-.36.47-.36.77m4.28-18h-.56c-.86 0-1.62.55-1.9 1.37L13.28 11h2.11l.67-2h3.89l.67 2h2.11l-2.54-7.63A2 2 0 0 0 18.29 2Zm-1.56 5 1-3h.56l1 3z"></path></svg>
        }
    ]

    
    return (
        <div
            className='flex flex-col gap-2 w-full h-full col-span-12 row-span-full '
        >

            {/* filters */}
            <div
                className='flex flex-row items-end justify-between gap-2 w-full h-fit'
            >
                <h2
                    className='text-text text-lg font-medium'
                >
                    My assets
                </h2>
                <div
                    className='flex flex-row items-center gap-2 w-fit h-fit relative'
                >
                    {/* filter btn */}
                    <button
                        className='flex flex-row items-center gap-1 w-fit h-fit p-1.5 duration-200 px-3 bg-primary hover:bg-accent hover:text-primary text-background rounded'
                        onClick={() => setIsDropdownActive(!isDropdownActive)}
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M20 2H4c-.55 0-1 .45-1 1v2c0 .24.09.48.25.66L10 13.38V21c0 .4.24.77.62.92a.995.995 0 0 0 1.09-.21l2-2A1 1 0 0 0 14 19v-5.62l6.75-7.72c.16-.18.25-.42.25-.66V3c0-.55-.45-1-1-1"></path></svg>
                        Filter 
                    </button>
                    <div
                        className={`absolute right-0 top-11 w-52 h-36 ${isDropdownActive ? 'flex' : 'hidden'} flex-col z-10 bg-background rounded shadow shadow-text/50`}
                    >   
                        {
                            filterBtns.map((btn, index) => (
                                <button
                                    key={btn.name}
                                    className={`
                                        ${activeFilter === btn.name ? 'bg-primary text-background' : 'text-text/70 hover:bg-secondary/50 hover:text-primary'} 
                                        ${index === filterBtns.length && 'rounded-b'} 
                                        ${index === 0 && 'rounded-t'} p-2 px-3 flex flex-row items-center gap-2 text-start text-sm duration-200 cursor-pointer`}
                                        onClick={() => setActiveFilter(btn.name)}
                                >
                                    {btn.icon}
                                    <h2>
                                        {btn.name}
                                    </h2>
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>

            <span className='w-full min-h-0.5 bg-text/20 rounded'></span>

            {/* image files */}
            <div
                className='w-full h-full flex'
            >
                {
                    files.length <= 0
                    ?   <div // empty state ui
                            className='w-full h-full flex items-center justify-center gap-4 col-span-full flex-col'
                        >
                            <svg className='p-3 rounded-full bg-text/10 text-text/70' xmlns="http://www.w3.org/2000/svg" width={80} height={80} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M20 4h-8.59L10 2.59C9.63 2.22 9.11 2 8.59 2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M4 18v-7h16v7z"></path></svg>
                            <div
                                className='flex flex-col gap-0 w-fit h-fit text-center'
                            >
                                <h2
                                    className='text-lg text-primary font-medium'
                                >
                                    No files
                                </h2>
                                <h3
                                    className='w-52 text-text/70'
                                >
                                    Upload files, to start using them in your post
                                </h3>
                            </div>
                        </div>
                    :   <div
                            className='grid grid-cols-3 w-full max-h-95/100 gap-2 overflow-y-scroll scrollbar-hide p-1 pb-10'
                        >
                            {
                                files.map((file) => {

                                    const imageUrl = URL.createObjectURL(file)

                                    return (
                                        <ImageCard
                                            key={file.name}
                                            imageUrl={imageUrl}
                                            name={file.name}
                                            type={file.type}
                                        />
                                    )

                                })
                            }
                        </div>  
                }
            </div>

            <div
                className='w-full h-fit p-2'
            >

            </div>

        </div>
    )
}

export default FileViewer