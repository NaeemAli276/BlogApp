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
import Icon from '../../assets/Icon';

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
                class: 'outline-none p-1 text-sm w-full h-auto min-h-[24px]' // Changed to auto height with min height
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