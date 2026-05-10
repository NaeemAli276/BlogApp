import React, { useState } from 'react'
import userImg from '../../assets/user.png'
import Switch from '../btns/Switch'

const PostHandlerContainer = ({  }) => {

    const [selectedCategory, setSelectedCategory] = useState('None')
    const [categories, setCategories] = useState([
        'Finance',
        'Coding',
        'Tech',
        'Healthcare',
        'Political',
        'Food',
        'Gaming',
        'Nature'
    ])
    const [isCategoryDropdownActive, setIsCategoryDropdownActive] = useState(false)

    const handleCategorySelect = (cat) => {
        setSelectedCategory(cat)
        setIsCategoryDropdownActive(false)
    }

    return (
        <div
            className='p-2 rounded w-full h-full ml-3 row-span-16 col-span-5 flex flex-col gap-4'
        >

            {/* author */}
            <div
                className='flex flex-col w-full h-fit gap-1'
            >
                <h3
                    className='text-sm text-text'
                >
                    Author
                </h3>
                <div
                    className='flex flex-row items-center justify-start gap-3 rounded bg-background shadow shadow-text/20 p-2'
                >
                    <img
                        className='w-8 h-8 bg-slate-200 p-1 rounded'
                        src={userImg} 
                        alt="" 
                    />
                    <h4
                        className='text-text'
                    >
                        John Doe
                    </h4>
                </div>
            </div>

            {/* post date */}
            <div
                className='flex flex-col gap-2 w-full h-fit'
            >

                <h1
                    className='text-sm text-text'
                >
                    Post Date
                </h1>

                <div
                    className='flex flex-row items-center gap-2 w-full h-fit'
                >
                    {/* date */}
                    <h2
                        className='flex flex-row items-center justify-start gap-3 rounded bg-background shadow shadow-text/20 p-2 text-sm text-text/70 w-full'
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M7 11h10v2H7zm0 4h7v2H7z"></path><path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M5 20V8h14V6v14z"></path></svg>
                        {new Date().toLocaleDateString()}
                    </h2>

                    {/* date */}
                    <h2
                        className='flex flex-row items-center justify-start gap-3 rounded bg-background shadow shadow-text/20 p-2 text-sm text-text/70 w-full'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 2C6.58 2 2 6.58 2 12s4.58 10 10 10 10-4.58 10-10S17.42 2 12 2m0 18c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8-3.66 8-8 8"></path><path d="M13 7h-2v6h6v-2h-4z"></path></svg>
                        {new Date().toLocaleTimeString().substring(0,5)}
                    </h2>
                </div>

            </div>
            
            {/* category */}
            <div
                className='flex flex-col gap-2 w-full h-fit'
            >

                <h1
                    className='text-sm text-text'
                >
                    Category
                </h1>

                <div
                    className='flex flex-col gap-2 w-full h-fit relative'
                >

                    <button
                        className='flex flex-row items-center justify-between gap-3 rounded bg-background shadow shadow-text/20 p-2 text-sm text-text/70 w-full font-medium'
                        onClick={() => setIsCategoryDropdownActive(!isCategoryDropdownActive)}
                    >
                        {selectedCategory}
                        <svg className={`${isCategoryDropdownActive ? 'rotate-180' : 'rotate-0'} duration-200`} xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M17.35 8H6.65c-.64 0-.99.76-.56 1.24l5.35 6.11c.3.34.83.34 1.13 0l5.35-6.11C18.34 8.76 18 8 17.36 8Z"></path></svg>
                    </button>

                    <div
                        className={`${isCategoryDropdownActive ? 'flex' : 'hidden'} flex flex-col w-full h-40 bg-background shadow shadow-text/20 rounded overflow-y-scroll text-sm text-text scrollbar-hide`}
                    >
                        {
                            categories.map((cat, index) => (
                                <button
                                    className={`w-full h-fit p-2 ${index + 1 === categories.length && 'rounded-b'} ${index + 1 === 1 && 'rounded-t'} text-start hover:bg-primary hover:text-background duration-200 font-medium text-text`}
                                    onClick={() => handleCategorySelect(cat)}
                                >
                                    {cat}
                                </button>
                            ))
                        }
                    </div>

                </div>

            </div>

            {/* publish button */}
            <div
                className='w-full h-fit flex flex-row items-center justify-between mt-10 bg-background p-2 rounded  shadow shadow-text/20'
            >
                <h2
                    className='text-text/70 font-medium text-sm'
                >
                    Publish
                </h2>
                <Switch/>
            </div>

            {/* view and create btn */}
            <div
                className='flex w-full h-full items-end justify-end'
            >
                <div
                    className='flex flex-row items-center gap-2 justify-end'
                >
                    <button
                        className='w-fit h-fit px-3 text-sm bg-text/10 rounded p-2 flex-row flex gap-1 text-text hover:bg-primary hover:text-background duration-200 font-medium'
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path></svg>
                        View
                    </button>
                    <button
                        className='w-fit h-fit px-3 text-sm bg-primary rounded p-2 flex-row flex gap-1 text-background hover:bg-secondary hover:text-text duration-200 font-medium'
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path></svg>
                        Create
                    </button>
                </div>                
            </div>

        </div>
    )
}

export default PostHandlerContainer