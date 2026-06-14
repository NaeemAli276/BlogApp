import React from 'react'
import { Link } from 'react-router-dom'

const SidebarBtn = ({
    icon, 
    name, 
    ftn, 
    isSelected, 
    className = `rounded flex flex-row items-center gap-4 p-1 w-fit h-fit font-medium hover:bg-accent cursor-pointer duration-200 ${isSelected ? 'bg-secondary/50 text-primary' : 'bg-background text-text/70'}`
}) => {
    return (
        <Link
            className={className}
            to={ftn}
        >
            {icon}
            {name}
        </Link>
    )
}

export default SidebarBtn