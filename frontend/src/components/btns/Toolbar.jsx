import React from 'react'

const Toolbar = ({ editor }) => {

    const styleCommands = [
        {
            btnTitle: 'Bold (Ctrl + B)',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M13 4.5H7c-.83 0-1.5.67-1.5 1.5v12c0 .83.67 1.5 1.5 1.5h6.5c2.48 0 4.5-2.02 4.5-4.5 0-1.3-.56-2.46-1.44-3.28.58-.76.94-1.69.94-2.72 0-2.48-2.02-4.5-4.5-4.5m0 3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H8.5v-3zm.5 9h-5v-3h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5"></path></svg>,
            function: () => editor.chain().focus().toggleBold().run(),
            name: 'bold'
        },
        {
            btnTitle: 'Italic (Ctrl + I)',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M19 4H9v2h3.67L9.25 18H5v2h10v-2h-3.67l3.42-12H19z"></path></svg>,
            function: () => editor.chain().focus().toggleItalic().run(),
            name: 'italic'
        },
        {
            btnTitle: 'Underline (Ctrl + U)',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M5 18h14v2H5zM6 4v6c0 3.31 2.69 6 6 6s6-2.69 6-6V4h-2v6c0 2.21-1.79 4-4 4s-4-1.79-4-4V4z"></path></svg>,
            function: () => editor.chain().focus().toggleUnderline().run(),
            name: 'underline'
        },
        
    ]
    const headingCommands = [
        {
            btnTitle: 'H1 (Ctrl + Alt + 1)',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M14 4.25a.75.75 0 0 0-1.248-.56l-2.25 2a.75.75 0 0 0 .996 1.12l1.002-.89v5.83a.75.75 0 0 0 1.5 0zm-11.5 0a.75.75 0 0 0-1.5 0v7.496a.75.75 0 0 0 1.5 0V8.75h4v2.996a.75.75 0 0 0 1.5 0V4.25a.75.75 0 0 0-1.5 0v3h-4z" clipRule="evenodd"></path></svg>,
            function: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            level: 1
        },
        {
            btnTitle: 'H2 (Ctrl + Alt + 2)',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M2.5 4.25a.75.75 0 0 0-1.5 0v7.496a.75.75 0 0 0 1.5 0V8.75h4v2.996a.75.75 0 0 0 1.5 0V4.25a.75.75 0 0 0-1.5 0v3h-4zm8.403 1.783A1.364 1.364 0 0 1 12.226 5h.226a1.071 1.071 0 0 1 .672 1.906l-3.61 2.906a1.51 1.51 0 0 0 .947 2.688h3.789a.75.75 0 0 0 0-1.5h-3.793l-.003-.003l-.003-.004v-.004a.01.01 0 0 1 .004-.008l3.61-2.907A2.571 2.571 0 0 0 12.452 3.5h-.226c-1.314 0-2.46.894-2.778 2.17l-.038.148a.75.75 0 1 0 1.456.364z" clipRule="evenodd"></path></svg>,
            function: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            level: 2
        },
        {
            btnTitle: 'H3 (Ctrl + Alt + 3)',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M2.5 4.25a.75.75 0 0 0-1.5 0v7.496a.75.75 0 0 0 1.5 0V8.75h4v2.996a.75.75 0 0 0 1.5 0V4.25a.75.75 0 0 0-1.5 0v3h-4zm8.114 1.496c.202-.504.69-.834 1.232-.834h.28a.94.94 0 0 1 .929.796l.027.18a1.15 1.15 0 0 1-.911 1.303l-.8.16a.662.662 0 0 0 .129 1.31h1.21a.89.89 0 0 1 .882 1.017a1.67 1.67 0 0 1-1.414 1.414l-.103.015a1.81 1.81 0 0 1-1.828-.9l-.018-.033a.662.662 0 0 0-1.152.652l.018.032a3.13 3.13 0 0 0 3.167 1.559l.103-.015a2.99 2.99 0 0 0 2.537-2.537a2.21 2.21 0 0 0-1.058-2.216a2.47 2.47 0 0 0 .547-1.963l-.028-.179a2.26 2.26 0 0 0-2.237-1.919h-.28a2.65 2.65 0 0 0-2.46 1.666a.662.662 0 1 0 1.228.492" clipRule="evenodd"></path></svg>,
            function: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            level: 3
        },
    ]
    const listCommands = [
        {
            btnTitle: 'Bullet point list (Ctrl + shift + 8)',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M8 11h13v2H8zm0-5h13v2H8zm0 10h13v2H8zM3 5.5h3v3H3zm0 5h3v3H3zm0 5h3v3H3z"></path></svg>,
            function: () => editor.commands.toggleBulletList(),
            level: 1
        },
        {
            btnTitle: 'Ordered list (Ctrl + shift + 7)',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M4 13h5v4h2V7H9v4H4V7H2v10h2zm9-4h7v2h-5c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h7v-2h-7v-2h5c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-7z"></path></svg>,
            function: () => editor.commands.toggleOrderedList(),
            level: 2
        },
    ]
    

    if (!editor) return null
    else {

        return (
            <div
                className='flex flex-row items-center gap-0 w-full h-fit rounded-t border-2 border-primary divide-primary divide-x-2'
            >
                
                {/* style commands */}
                <div
                    className='flex flex-row items-center gap-0 w-fit h-fit '
                >
                    {
                        styleCommands.map((comm, index) => (
                            <div
                                className='p-1 px-1.25'
                            >
                                <button
                                    className={`border-primary p-1 duration-200 ${editor.isActive(comm.name) ? 'bg-secondary/70 text-primary' : 'text-text'} rounded`}
                                    onClick={comm.function}
                                    title={comm.btnTitle}
                                >
                                    {comm.icon}
                                </button>
                            </div>
                        ))
                    }
                </div>

                {/* heading commands */}
                <div
                    className='flex flex-row items-center gap-0 w-fit h-fit '
                >
                    {
                        headingCommands.map((comm, index) => (
                            <div
                                className='p-1 px-1.25'
                            >
                                <button
                                    className={`border-primary p-1 duration-200 ${editor.isActive('heading', {level: comm.level}) ? 'bg-secondary/70 text-primary' : 'text-text'} rounded`}
                                    onClick={comm.function}
                                    title={comm.btnTitle}
                                >
                                    {comm.icon}
                                </button>
                            </div>
                        ))
                    }
                </div>

                {/* list commands */}
                <div
                    className='flex flex-row items-center gap-0 w-fit h-fit '
                >
                    {
                        listCommands.map((comm, index) => (
                            <div
                                className='p-1 px-1.25'
                            >
                                <button
                                    className={`border-primary p-1 duration-200 ${editor.isActive('heading', {level: comm.level}) ? 'bg-secondary/70 text-primary' : 'text-text'} rounded`}
                                    onClick={comm.function}
                                    title={comm.btnTitle}
                                >
                                    {comm.icon}
                                </button>
                            </div>
                        ))
                    }
                </div>

            </div>
        )

    }

}

export default Toolbar