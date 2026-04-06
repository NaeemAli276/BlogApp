import React from 'react'
import { Link } from 'react-router-dom'

const SidebarBtn = ({icon, name, ftn, isSelected}) => {
    return (
        <Link
            className={`rounded flex flex-row items-center gap-4 px-3 p-2 w-full h-fit font-medium hover:bg-accent duration-200 ${isSelected ? 'bg-secondary text-text' : 'bg-primary'}`}
            to={ftn}
        >
            {icon}
            {name}
        </Link>
    )
}

export default SidebarBtn