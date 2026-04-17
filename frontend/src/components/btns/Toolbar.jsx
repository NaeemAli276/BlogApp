import React, { useState, useEffect } from 'react';
import { useCurrentEditor, } from '@tiptap/react';
import LinkModal from '../PostsPage/LinkModal';

const Toolbar = () => {
    const { editor } = useCurrentEditor();
    const [, forceUpdate] = useState({}); // Used to trigger re-renders
    const [isLinkModalOn, setIsLinkModalOn] = useState(false)
    

    const styleCommands = [
        {
            btnTitle: 'Bold (Ctrl + B)',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M13 4.5H7c-.83 0-1.5.67-1.5 1.5v12c0 .83.67 1.5 1.5 1.5h6.5c2.48 0 4.5-2.02 4.5-4.5 0-1.3-.56-2.46-1.44-3.28.58-.76.94-1.69.94-2.72 0-2.48-2.02-4.5-4.5-4.5m0 3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H8.5v-3zm.5 9h-5v-3h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5"></path></svg>,
            command: () => editor.chain().focus().toggleBold().run(),
            isActive: () => editor.isActive('bold'),
        },
        {
            btnTitle: 'Italic (Ctrl + I)',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M19 4H9v2h3.67L9.25 18H5v2h10v-2h-3.67l3.42-12H19z"></path></svg>,
            command: () => editor.chain().focus().toggleItalic().run(),
            isActive: () => editor.isActive('italic'),
        },
        {
            btnTitle: 'Underline (Ctrl + U)',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M5 18h14v2H5zM6 4v6c0 3.31 2.69 6 6 6s6-2.69 6-6V4h-2v6c0 2.21-1.79 4-4 4s-4-1.79-4-4V4z"></path></svg>,
            command: () => editor.chain().focus().toggleUnderline().run(),
            isActive: () => editor.isActive('underline'),
        },
        {
            btnTitle: 'Blockquote',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M5.99 13.93c.42 0 .83-.07 1.22-.17-.09.3-.17.61-.32.88-.11.31-.29.58-.47.84-.15.29-.41.49-.6.74-.2.24-.47.4-.69.6-.21.21-.49.32-.71.46-.23.13-.43.28-.65.35-.21.09-.39.16-.54.22-.3.12-.47.2-.47.2l.48 1.94s.22-.05.6-.14c.19-.05.42-.1.69-.17.27-.05.56-.19.88-.31.32-.14.69-.24 1.03-.47.34-.22.74-.4 1.09-.69.34-.3.75-.56 1.05-.94.33-.36.66-.73.91-1.16.29-.41.49-.86.7-1.3.19-.44.34-.9.47-1.34.24-.88.34-1.72.38-2.44.03-.72.01-1.32-.03-1.75-.02-.2-.04-.4-.06-.54l-.03-.17c-.2-2.56-2.31-4.58-4.93-4.58-2.74 0-4.96 2.22-4.96 4.96s2.22 4.96 4.96 4.96Zm11.97 0c.42 0 .83-.07 1.22-.17-.09.3-.17.61-.32.88-.11.31-.29.58-.47.84-.15.29-.41.49-.6.74-.2.24-.47.4-.69.6-.21.21-.49.32-.71.46-.23.13-.43.28-.65.35-.21.09-.39.16-.54.22-.3.12-.47.2-.47.2l.48 1.94s.22-.05.6-.14c.19-.05.42-.1.69-.17.27-.05.56-.19.88-.31.32-.14.69-.24 1.03-.47.34-.22.74-.4 1.09-.69.34-.3.75-.56 1.05-.94.33-.36.66-.73.91-1.16.29-.41.49-.86.7-1.3.19-.44.34-.9.47-1.34.24-.88.34-1.72.38-2.44.03-.72.01-1.32-.03-1.75-.02-.2-.04-.4-.06-.54l-.03-.17c-.2-2.56-2.31-4.58-4.93-4.58-2.74 0-4.96 2.22-4.96 4.96s2.22 4.96 4.96 4.96Z"></path></svg>,
            command: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: () => editor.isActive('blockquote'),
        },
        
    ];
    const headingCommands = [
        {
            btnTitle: 'H1 (Ctrl + Alt + 1)',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M14 4.25a.75.75 0 0 0-1.248-.56l-2.25 2a.75.75 0 0 0 .996 1.12l1.002-.89v5.83a.75.75 0 0 0 1.5 0zm-11.5 0a.75.75 0 0 0-1.5 0v7.496a.75.75 0 0 0 1.5 0V8.75h4v2.996a.75.75 0 0 0 1.5 0V4.25a.75.75 0 0 0-1.5 0v3h-4z" clipRule="evenodd"></path></svg>,
            command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: () => editor.isActive('heading', { level: 1 }),
        },
        {
            btnTitle: 'H2 (Ctrl + Alt + 2)',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M2.5 4.25a.75.75 0 0 0-1.5 0v7.496a.75.75 0 0 0 1.5 0V8.75h4v2.996a.75.75 0 0 0 1.5 0V4.25a.75.75 0 0 0-1.5 0v3h-4zm8.403 1.783A1.364 1.364 0 0 1 12.226 5h.226a1.071 1.071 0 0 1 .672 1.906l-3.61 2.906a1.51 1.51 0 0 0 .947 2.688h3.789a.75.75 0 0 0 0-1.5h-3.793l-.003-.003l-.003-.004v-.004a.01.01 0 0 1 .004-.008l3.61-2.907A2.571 2.571 0 0 0 12.452 3.5h-.226c-1.314 0-2.46.894-2.778 2.17l-.038.148a.75.75 0 1 0 1.456.364z" clipRule="evenodd"></path></svg>,
            command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: () => editor.isActive('heading', { level: 2 }),
        },
        {
            btnTitle: 'H3 (Ctrl + Alt + 3)',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M2.5 4.25a.75.75 0 0 0-1.5 0v7.496a.75.75 0 0 0 1.5 0V8.75h4v2.996a.75.75 0 0 0 1.5 0V4.25a.75.75 0 0 0-1.5 0v3h-4zm8.114 1.496c.202-.504.69-.834 1.232-.834h.28a.94.94 0 0 1 .929.796l.027.18a1.15 1.15 0 0 1-.911 1.303l-.8.16a.662.662 0 0 0 .129 1.31h1.21a.89.89 0 0 1 .882 1.017a1.67 1.67 0 0 1-1.414 1.414l-.103.015a1.81 1.81 0 0 1-1.828-.9l-.018-.033a.662.662 0 0 0-1.152.652l.018.032a3.13 3.13 0 0 0 3.167 1.559l.103-.015a2.99 2.99 0 0 0 2.537-2.537a2.21 2.21 0 0 0-1.058-2.216a2.47 2.47 0 0 0 .547-1.963l-.028-.179a2.26 2.26 0 0 0-2.237-1.919h-.28a2.65 2.65 0 0 0-2.46 1.666a.662.662 0 1 0 1.228.492" clipRule="evenodd"></path></svg>,
            command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: () => editor.isActive('heading', { level: 3 }),
        },
    ];
    const listCommands = [
        {
            btnTitle: 'Bullet point list (Ctrl + shift + 8)',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M8 11h13v2H8zm0-5h13v2H8zm0 10h13v2H8zM3 5.5h3v3H3zm0 5h3v3H3zm0 5h3v3H3z"></path></svg>,
            command: () => editor.chain().focus().toggleBulletList().run(),
            isActive: () => editor.isActive('bulletList'),
        },
        {
            btnTitle: 'Ordered list (Ctrl + shift + 7)',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M3 16h2v.5H3v1h2v.5H3v1h3v-4H3zM4 6h1v3h1V5H4zm-1 5h2v.5H3V14h3v-1H4v-.5h2V10H3zm5 0h13v2H8zm0-5h13v2H8zm0 10h13v2H8z"></path></svg>,
            command: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: () => editor.isActive('orderedList'),
        },
    ];
    const alignCommands = [
        {
            btnTitle: 'Align text left (Ctrl + shift + l)',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M3 7h12v2H3zm0-4h18v2H3zm0 8h18v2H3zm0 4h12v2H3zm0 4h18v2H3z"></path></svg>,
            command: () => editor.chain().focus().setTextAlign('left').run(),
            isActive: () => editor.isActive({ textAlign: 'left' }),
        },
        {
            btnTitle: 'Align text center (Ctrl + shift + E)',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M6 7h12v2H6zM3 3h18v2H3zm0 8h18v2H3zm3 4h12v2H6zm-3 4h18v2H3z"></path></svg>,
            command: () => editor.chain().focus().setTextAlign('center').run(),
            isActive: () => editor.isActive({ textAlign: 'center' }),
        },
        {
            btnTitle: 'Align text right (Ctrl + shift + R)',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M9 7h12v2H9zM3 3h18v2H3zm0 8h18v2H3zm6 4h12v2H9zm-6 4h18v2H3z"></path></svg>,
            command: () => editor.chain().focus().setTextAlign('right').run(),
            isActive: () => editor.isActive({ textAlign: 'right' }),
        },
    ]
    const codeCommands = [
        {
            btnTitle: 'Code block (Ctrl + Alt + C)',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M9.71 16.29 5.41 12l4.3-4.29-1.42-1.42L2.59 12l5.7 5.71zm6 1.42 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path></svg>,
            command: () => editor.chain().focus().toggleCodeBlock().run(),
            isActive: () => editor.isActive('codeBlock'),
        },
    ]
    const miscCommands = [
        // {
        //     btnTitle: 'Link',
        //     icon: <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M9.88 18.36a3 3 0 0 1-4.24 0 3 3 0 0 1 0-4.24l2.83-2.83-1.41-1.41-2.83 2.83a5.003 5.003 0 0 0 0 7.07c.98.97 2.25 1.46 3.54 1.46s2.56-.49 3.54-1.46l2.83-2.83-1.41-1.41-2.83 2.83Zm2.83-14.14L9.88 7.05l1.41 1.41 2.83-2.83a3 3 0 0 1 4.24 0 3 3 0 0 1 0 4.24l-2.83 2.83 1.41 1.41 2.83-2.83a5.003 5.003 0 0 0 0-7.07 5.003 5.003 0 0 0-7.07 0Z"></path><path d="m16.95 8.46-.71-.7-.7-.71-4.25 4.24-4.24 4.25.71.7.7.71 4.25-4.24z"></path></svg>,
        //     command: () => setIsLinkModalOn(true),
        //     isActive: isLinkModalOn === true,
        // },
        {
            btnTitle: 'Trash',
            icon: <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>,
            command: () => editor.commands.clearContent(),
            isActive: null,
        },
    ]

    useEffect(() => {
        if (!editor) return;
            
            // Force a re-render whenever the editor state changes
            const handleUpdate = () => {
                forceUpdate({});
            };
            
            // Subscribe to all relevant editor events
            editor.on('update', handleUpdate);
            editor.on('selectionUpdate', handleUpdate);
            editor.on('transaction', handleUpdate);
            
            return () => {
                editor.off('update', handleUpdate);
                editor.off('selectionUpdate', handleUpdate);
                editor.off('transaction', handleUpdate);
        };
    }, [editor]);

    // Early return if editor is not available
    if (!editor) {
        return null;
    }

    return (
        <div className='flex flex-row items-center gap-0 w-full h-fit rounded-xs border-2 border-primary/70 divide-primary/70 divide-x overflow-y-scroll scrollbar-hide sticky top-0 left-0 z-10 bg-background '>

            {/* style commands */}
            <div className='flex flex-row items-center gap-0 w-fit h-full px-0.5'>
                {styleCommands.map((comm) => (
                    <div className='p-1 px-1.25' key={comm.btnTitle}>
                        <button
                            className={`border-primary/70 hover:bg-text/10 p-1 duration-200 ${comm.isActive() ? 'bg-secondary/70 text-primary' : 'text-text'} rounded-xs`}
                            onClick={comm.command}
                            title={comm.btnTitle}
                        >
                            {comm.icon}
                        </button>
                    </div>
                ))}
            </div>

            {/* heading commands */}
            <div className='flex flex-row items-center gap-0 w-fit h-full px-0.5'>
                {headingCommands.map((comm) => (
                    <div className='p-1 px-1.25' key={comm.btnTitle}>
                        <button
                            className={`border-primary/70 hover:bg-text/10 p-1 duration-200 ${comm.isActive() ? 'bg-secondary/70 text-primary' : 'text-text'} rounded-xs`}
                            onClick={comm.command}
                            title={comm.btnTitle}
                        >
                            {comm.icon}
                        </button>
                    </div>
                ))}
            </div>

                

            {/* list commands */}
            <div className='flex flex-row items-center gap-0 w-fit h-full px-0.5'>
                {listCommands.map((comm) => (
                    <div className='p-1 px-1.25' key={comm.btnTitle}>
                        <button
                            className={`border-primary/70 hover:bg-text/10 p-1 duration-200 ${comm.isActive() ? 'bg-secondary/70 text-primary' : 'text-text'} rounded-xs`}
                            onClick={comm.command}
                            title={comm.btnTitle}
                        >
                            {comm.icon}
                        </button>
                    </div>
                ))}
            </div>

            {/* align commands */}
            <div className='flex flex-row items-center gap-0 w-fit h-full px-0.5'>
                {alignCommands.map((comm) => (
                    <div className='p-1 px-1.25' key={comm.btnTitle}>
                        <button
                            className={`border-primary/70 hover:bg-text/10 p-1 duration-200 ${comm.isActive() ? 'bg-secondary/70 text-primary' : 'text-text'} rounded-xs`}
                            onClick={comm.command}
                            title={comm.btnTitle}
                        >
                            {comm.icon}
                        </button>
                    </div>
                ))}
            </div>

            {/* code commands */}
            <div className='flex flex-row items-center gap-0 w-fit h-full px-0.5'>
                {codeCommands.map((comm) => (
                    <div className='p-1 px-1.25' key={comm.btnTitle}>
                        <button
                            className={`border-primary/70 hover:bg-text/10 p-1 duration-200 ${comm.isActive() ? 'bg-secondary/70 text-primary' : 'text-text'} rounded-xs`}
                            onClick={comm.command}
                            title={comm.btnTitle}
                        >
                            {comm.icon}
                        </button>
                    </div>
                ))}
            </div>

            <div className='flex flex-row items-center gap-0 w-fit h-full px-0.5'>
                {
                    miscCommands.map((comm) => (
                        <div className='p-1 px-1.25' key={comm.btnTitle}>
                            <button
                                className={`border-primary/70 hover:bg-text/10 p-1 duration-200 ${comm.isActive ? 'bg-secondary/70 text-primary' : 'text-text'} rounded-xs`}
                                onClick={comm.command}
                                title={comm.btnTitle}
                            >
                                {comm.icon}
                            </button>
                        </div>
                    ))
                }
            </div>
            
            <LinkModal  
                isLinkModalOn={isLinkModalOn}
                setIsLinkModalOn={setIsLinkModalOn}
            />

        </div>
    );
};

export default Toolbar;