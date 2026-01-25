import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Separator from '../Separator'

const DashboardTopbar = () => {

    const location = useLocation()
    const navigation = useNavigate()

    const [paths, setPaths] = useState([])

    function splitBySlash(input) {
        // Convert input to string if it isn't already
        const str = String(input);

        console.log(str.split('/').filter(item => item !== ''))

        // Split by '/' and remove any empty strings from the result
        setPaths(str.split('/').filter(item => item !== ''))
    }

    useEffect(() => {
        splitBySlash(location.pathname)
    }, [])

    return (
        <div
            className='row-span-1 col-span-16 flex flex-col gap-1 w-full h-full bg-background dark:bg-dark-background/80 dark:text-dark-text p-2 rounded-md shadow-text/50 shadow px-3 items-center'
        >   
            <div
                className='flex flex-row w-full h-full items-center gap-1 px-2'
            >
                {
                    paths.map((path, index) => (
                        <div
                            className='flex flex-row gap-1 w-fit h-full items-center'
                            // onClick={() => navigation(path)}
                        >
                            <h1
                                className='w-fit flex-row flex text-base/tight font-medium'
                            >
                                {path}
                            </h1>
                            <span className={`${index + 1 < paths.length ? 'block' : 'hidden'} `}>/</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DashboardTopbar