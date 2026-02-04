import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'


const ViewPage = () => {
    
    const location = useLocation()
    const postData = location.state

    useEffect(() => {
        console.log(postData)
    }, [postData])

    return (
        <div

        >

        </div>
    )
}

export default ViewPage