import React, { cloneElement, useMemo } from 'react'
import { EditorContext, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import Toolbar from "../btns/Toolbar";

const ArticleTab = ({ content, handleChangeContent }) => {
    
    const editor = useEditor({
        extensions: [
        StarterKit,
        Placeholder.configure({
            placeholder: 'Start typing your blog/article'
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph']
        }),
        Blockquote.configure({
            HTMLAttributes: {
            class: 'pl-4 max-w-none '
            }
        }),
        Link.configure({
            isAllowedUri: (url, ctx) => {
            // Only allow HTTPS URLs
            return ctx.defaultValidate(url) && url.startsWith('https://');
            },
            openOnClick: true,      // Open link when clicked
            autolink: true,         // Auto-convert URLs as you type
            linkOnPaste: true,      // Convert pasted URLs to links
            defaultProtocol: "https", // Default protocol for URLs without one
        })
        ],
        content: content,
        editorProps: {
        attributes: {
            class: 'bg-background focus:outline-0 p-1 flex flex-1 w-full h-full max-w-none flex-col'
        },
        },
        onUpdate: () => handleChangeContent(editor.getHTML()),
        immediatelyRender: true,
    });

    const providerValue = useMemo(() => ({ editor }), [editor])

    return (
        <EditorContext value={providerValue}>
            <div
                className='flex flex-col gap-2 w-full h-full relative'
            >   
                <Toolbar></Toolbar>
                <div
                    className='p-2 overflow-y-scroll scrollbar-hide'
                >
                    <EditorContent editor={editor}/>
                </div>
            </div>
        </EditorContext>
    )
}

export default ArticleTab