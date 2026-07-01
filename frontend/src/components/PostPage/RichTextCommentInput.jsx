import React, { useState, useMemo, useEffect } from 'react'
import { useEditor, Tiptap, EditorContext, EditorContent } from "@tiptap/react";
import Paragraph from "@tiptap/extension-paragraph";
import Text from '@tiptap/extension-text'
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { CharacterCount } from "@tiptap/extensions";
import StarterKit from '@tiptap/starter-kit';

const RichTextCommentInput = ({
    content = '',
    handleChangeContent,
    wordLimit = 5000,
}) => {
    const [newContent, setNewContent] = useState(content)
    const [, forceUpdate] = useState({});

    const editorExtensions = [
        StarterKit,
        Placeholder.configure({
            placeholder: 'Start typing...'
        }),
        CharacterCount.configure({
            limit: wordLimit,
            mode: 'dictionary'
        })
    ] 

    const editor = useEditor({
        extensions: editorExtensions,
        content: newContent,
        editorProps: {
            attributes: {
                class: 'outline-none p-1 text-sm w-full h-auto min-h-[80px]' // Changed to auto height with min height
            },
        },
        onUpdate: () => handleChangeContent(editor.getHTML()),
        immediatelyRender: true,
    });

    const providerValue = useMemo(() => ({ editor }), [editor])

    if (!editor) return null;

    useEffect(() => {
        if (!editor) return
        
        const currentContent = editor.getHTML()
        const newContentValue = content || ''
        
        if (currentContent !== newContentValue) {
            editor.commands.setContent(newContentValue)
        }
    }, [editor, content])

    useEffect(() => {
        if (!editor) return;
            
        const handleUpdate = () => {
            forceUpdate({});
        };
        
        editor.on('update', handleUpdate);
        editor.on('selectionUpdate', handleUpdate);
        editor.on('transaction', handleUpdate);
        
        return () => {
            editor.off('update', handleUpdate);
            editor.off('selectionUpdate', handleUpdate);
            editor.off('transaction', handleUpdate);
        };
    }, [editor]);

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
    ]

    return (
        <EditorContext.Provider value={providerValue}>
            <div
                className='w-full flex flex-col relative' // Removed h-full
            >
                <EditorContent 
                    editor={editor} 
                    className='flex-1 w-full prose prose-sm max-w-none' // Added prose for better text rendering
                />

                {/* toolbar */}
                <div
                    className='flex flex-row items-end justify-between w-full mt-10' // Added margin top
                >
                    <div
                        className='w-full rounded' // Added rounded corners
                    >
                        {/* rich text btns */}
                        <div
                            className='flex flex-row items-end gap-1'
                        >
                            {
                                styleCommands.map((comm) => (
                                    <button
                                        className={`border-primary/70 hover:bg-text/10 p-1 duration-200 ${comm.isActive() ? 'bg-secondary/70 text-primary' : 'text-text'} rounded-xs cursor-pointer`}
                                        onClick={comm.command}
                                        title={comm.btnTitle}
                                        type='button'
                                    >
                                        {comm.icon}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </EditorContext.Provider>
    )
}

export default RichTextCommentInput