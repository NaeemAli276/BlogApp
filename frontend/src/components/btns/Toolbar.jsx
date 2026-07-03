import React, { useState, useEffect } from 'react';
import { useCurrentEditor, } from '@tiptap/react';
import { isAllowedUri } from '@tiptap/extension-link';
import Icon from '../../assets/Icon';

const Toolbar = ({ hiddenComm = [] }) => {

    const { editor } = useCurrentEditor();
    const [, forceUpdate] = useState({}); // Used to trigger re-renders
    const [isLinkModalOn, setIsLinkModalOn] = useState(false)

    const styleCommands = [
        {
            btnTitle: 'Bold (Ctrl + B)',
            icon: <Icon type={'bold'} size='20'/>,
            command: () => editor.chain().focus().toggleBold().run(),
            isActive: () => editor.isActive('bold'),
        },
        {
            btnTitle: 'Italic (Ctrl + I)',
            icon: <Icon type={'italic'} size='20'/>,
            command: () => editor.chain().focus().toggleItalic().run(),
            isActive: () => editor.isActive('italic'),
        },
        {
            btnTitle: 'Underline (Ctrl + U)',
            icon: <Icon type={'underline'} size='20'/>,
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
            icon: <Icon type={'h1'} size='20'/>,
            command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: () => editor.isActive('heading', { level: 1 }),
        },
        {
            btnTitle: 'H2 (Ctrl + Alt + 2)',
            icon: <Icon type={'h2'} size='20'/>,
            command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: () => editor.isActive('heading', { level: 2 }),
        },
        {
            btnTitle: 'H3 (Ctrl + Alt + 3)',
            icon: <Icon type={'h3'} size='20'/>,
            command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: () => editor.isActive('heading', { level: 3 }),
        },
    ];
    const listCommands = [
        {
            btnTitle: 'Bullet point list (Ctrl + shift + 8)',
            icon: <Icon type={'list'} size='20'/>,
            command: () => editor.chain().focus().toggleBulletList().run(),
            isActive: () => editor.isActive('bulletList'),
        },
        {
            btnTitle: 'Ordered list (Ctrl + shift + 7)',
            icon: <Icon type={'numbered_list'} size='20'/>,
            command: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: () => editor.isActive('orderedList'),
        },
    ];
    const alignCommands = [
        {
            btnTitle: 'Align text left (Ctrl + shift + l)',
            icon: <Icon type={'align_left'} size='20'/>,
            command: () => editor.chain().focus().setTextAlign('left').run(),
            isActive: () => editor.isActive({ textAlign: 'left' }), 
        },
        {
            btnTitle: 'Align text center (Ctrl + shift + E)',
            icon: <Icon type={'align_center'} size='20'/>,
            command: () => editor.chain().focus().setTextAlign('center').run(),
            isActive: () => editor.isActive({ textAlign: 'center' }),
        },
        {
            btnTitle: 'Align text right (Ctrl + shift + R)',
            icon: <Icon type={'align_right'} size='20'/>,
            command: () => editor.chain().focus().setTextAlign('right').run(),
            isActive: () => editor.isActive({ textAlign: 'right' }),
        },
    ]
    const codeCommands = [
        {
            btnTitle: 'Code block (Ctrl + Alt + C)',
            icon: <Icon type={'code'} size='20'/>,
            command: () => editor.chain().focus().toggleCodeBlock().run(),
            isActive: () => editor.isActive('codeBlock'),
        },
    ]
    const miscCommands = [
        {
            btnTitle: 'Trash',
            icon: <Icon type={'trash'} size='20'/>,
            command: () => editor.commands.clearContent(),
            isActive: null,
        },
    ]

    // just makes sure the buttons actually go to an active or inactive state
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

    // useEffect(() => {
    //     setCurrentAllowedCommands(allowedCommands)
    // }, [allowedCommands])

    // Early return if editor is not available
    if (!editor) {
        return null;
    }

    return (
        <div 
            className='flex flex-row items-center gap-0 w-full h-fit rounded sticky top-0 left-0 z-50 scrollbar-hide overflow-x-scroll overflow-y-hidden min-h-10'
        >

            {/* style commands */}
            <div 
                className={`flex flex-row items-center gap-0 w-fit h-full px-0.5 ${hiddenComm.includes('style') ? 'hidden' : 'flex'}`}
            >
                {styleCommands.map((comm) => (
                    <div className='p-1 px-1.25' key={comm.btnTitle}>
                        <button
                            className={`border-primary/70 hover:bg-text/10 p-1 duration-200 ${comm.isActive() ? 'bg-secondary/70 text-primary' : 'text-text'} rounded-xs cursor-pointer`}
                            onClick={comm.command}
                            title={comm.btnTitle}
                            type='button'
                            disabled={comm.isAllowed}
                        >
                            {comm.icon}
                        </button>
                    </div>
                ))}
            </div>

            {/* heading commands */}
            <div 
                className={`flex flex-row items-center gap-0 w-fit h-full px-0.5 ${hiddenComm.includes('headings') ? 'hidden' : 'flex'}`}
            >
                {headingCommands.map((comm) => (
                    <div className='p-1 px-1.25' key={comm.btnTitle}>
                        <button
                            className={`border-primary/70 hover:bg-text/10 p-1 duration-200 ${comm.isActive() ? 'bg-secondary/70 text-primary' : 'text-text'} rounded-xs cursor-pointer`}
                            onClick={comm.command}
                            title={comm.btnTitle}
                            type='button'
                            disabled={comm.isAllowed}
                        >
                            {comm.icon}
                        </button>
                    </div>
                ))}
            </div>

            {/* list commands */}
            <div 
                className={`flex flex-row items-center gap-0 w-fit h-full px-0.5 ${hiddenComm.includes('lists') ? 'hidden' : 'flex'}`}
            >
                {listCommands.map((comm) => (
                    <div className='p-1 px-1.25' key={comm.btnTitle}>
                        <button
                            className={`border-primary/70 hover:bg-text/10 p-1 duration-200 ${comm.isActive() ? 'bg-secondary/70 text-primary' : 'text-text'} rounded-xs cursor-pointer`}
                            onClick={comm.command}
                            title={comm.btnTitle}
                            type='button'
                            disabled={comm.isAllowed}
                        >
                            {comm.icon}
                        </button>
                    </div>
                ))}
            </div>

            {/* align commands */}
            <div 
                className={`flex flex-row items-center gap-0 w-fit h-full px-0.5 ${hiddenComm.includes('align') ? 'hidden' : 'flex'}`}
            >                
                {alignCommands.map((comm) => (
                    <div className='p-1 px-1.25' key={comm.btnTitle}>
                        <button
                            className={`border-primary/70 hover:bg-text/10 p-1 duration-200 ${comm.isActive() ? 'bg-secondary/70 text-primary' : 'text-text'} rounded-xs cursor-pointer`}
                            onClick={comm.command}
                            title={comm.btnTitle}
                            type='button'
                        >
                            {comm.icon}
                        </button>
                    </div>
                ))}
            </div>

            {/* code commands */}
            <div 
                className={`flex flex-row items-center gap-0 w-fit h-full px-0.5 ${hiddenComm.includes('code') ? 'hidden' : 'flex'}`}
            >
                {codeCommands.map((comm) => (
                    <div className='p-1 px-1.25' key={comm.btnTitle}>
                        <button
                            className={`border-primary/70 hover:bg-text/10 p-1 duration-200 ${comm.isActive() ? 'bg-secondary/70 text-primary' : 'text-text'} rounded-xs cursor-pointer`}
                            onClick={comm.command}
                            title={comm.btnTitle}
                            type='button'
                            disabled={comm.isAllowed}
                        >
                            {comm.icon}
                        </button>
                    </div>
                ))}
            </div>

            <div 
                className={`flex flex-row items-center gap-0 w-fit h-full px-0.5 ${hiddenComm.includes('misc') ? 'hidden' : 'flex'}`}
            >                {
                    miscCommands.map((comm) => (
                        <div className='p-1 px-1.25' key={comm.btnTitle}>
                            <button
                                className={`border-primary/70 hover:bg-text/10 p-1 duration-200 ${comm.isActive ? 'bg-secondary/70 text-primary' : 'text-text'} rounded-xs cursor-pointer`}
                                onClick={comm.command}
                                title={comm.btnTitle}
                                type='button'
                            >
                                {comm.icon}
                            </button>
                        </div>
                    ))
                }
            </div>
{/*             
            <LinkModal  
                isLinkModalOn={isLinkModalOn}
                setIsLinkModalOn={setIsLinkModalOn}
            /> */}

        </div>
    );
};

export default Toolbar;