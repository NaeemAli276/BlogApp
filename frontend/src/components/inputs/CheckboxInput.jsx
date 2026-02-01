import React, { useState } from 'react'

const CheckboxInput = ({ value, onClick, name }) => {

    const [isChecked, setIsChecked] = useState(false)

    const handleChange = () => {
        onClick()
        setIsChecked(!isChecked)
    }

    return (
        <div
            className='flex flex-row gap-2 w-fit h-fit items-center relative'
        >
            <input 
                id='checkbox'
                name='checkbox'
                type="checkbox"
                className={`w-fit bg-background dark:bg-dark-background h-fit p-2 rounded appearance-none border-2 dark:border-dark-primary border-primary ${isChecked ? 'bg-primary dark:bg-dark-primary' : ''}`}
                onChange={handleChange}
                checked={value}
            />
            <svg htmlFor='checkbox' className={`absolute left-1.25 ${isChecked ? 'block text-white ' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill={"currentColor"} viewBox="0 0 24 24"><path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path></svg>
            <label 
                htmlFor='checkbox'
                id="checkbox"
                className='text-sm font-medium text-text/70 dark:text-dark-text/80 pb-0.5'
            >
                {name}
            </label>
        </div>
    )
}

export default CheckboxInput