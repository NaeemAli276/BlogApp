import React, { useState } from 'react'
import NewItemWrapperBtn from '../../buttons/NewItemWrapperBtn'

const NewItemWrapper = ({ name, children, itemType, moveUpFtn, moveDownFtn, deleteFtn }) => {
    
    const [expand, setExpand] = useState(false)

    const optionBtns = [
        {
            name: 'trash',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox="0 0 24 24"><path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>,
            ftn: deleteFtn
        },
        {
            name: 'up',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox="0 0 24 24"><path d="M13 18v-6h4l-5-6-5 6h4v6z"></path></svg>,
            ftn: moveUpFtn
        },
        {
            name: 'down',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox="0 0 24 24" transform={"rotate(180)"}><path d="M13 18v-6h4l-5-6-5 6h4v6z"></path></svg>,
            ftn: moveDownFtn        
        },
    ]

    return (
        <div
            className='w-full h-fit bg-text/10 p-3 rounded-md'
        >
            <div
                className='flex flex-row items-center justify-between'
            >
                <button
                    className='font-medium flex gap-1 items-center text-primary'
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox="0 0 24 24"><path d="m12 15.41 5.71-5.7-1.42-1.42-4.29 4.3-4.29-4.3-1.42 1.42z"></path></svg>
                    {name}
                </button>
                <div
                    className='flex flex-row items-center w-fit h-fit border-text/5 border rounded'
                >
                    {
                        optionBtns.map((btn, index) => (
                            <NewItemWrapperBtn
                                icon={btn.icon}
                                index={index}
                                maxlength={optionBtns.length}
                                ftn={btn.ftn}
                            />
                        ))
                    }
                </div>

            </div>
            {children}
        </div>
    )
}

export default NewItemWrapper

