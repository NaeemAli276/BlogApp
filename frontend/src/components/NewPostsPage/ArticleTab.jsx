import React, { useEffect, useMemo } from 'react'
import { EditorContext, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import Toolbar from "../btns/Toolbar";
import Image from '@tiptap/extension-image';
import FileHandler from '@tiptap/extension-file-handler';

const ArticleTab = ({ content = ``, handleChangeContent }) => {
    
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Start typing your blog/article...'
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
            }),
            Image,
            FileHandler.configure({
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
                onDrop: (currentEditor, files, pos) => {
                    files.forEach(file => {
                    const fileReader = new FileReader()
        
                    fileReader.readAsDataURL(file)
                    fileReader.onload = () => {
                        currentEditor
                        .chain()
                        .insertContentAt(pos, {
                            type: 'image',
                            attrs: {
                            src: fileReader.result,
                            },
                        })
                        .focus()
                        .run()
                    }
                    })
                },
                onPaste: (currentEditor, files, htmlContent) => {
                    files.forEach(file => {
                    if (htmlContent) {
                        // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
                        // you could extract the pasted file from this url string and upload it to a server for example
                        console.log(htmlContent) // eslint-disable-line no-console
                        return false
                    }
        
                    const fileReader = new FileReader()
        
                    fileReader.readAsDataURL(file)
                    fileReader.onload = () => {
                        currentEditor
                        .chain()
                        .insertContentAt(currentEditor.state.selection.anchor, {
                            type: 'image',
                            attrs: {
                            src: fileReader.result,
                            },
                        })
                        .focus()
                        .run()
                    }
                    })
                },
            }),
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

    useEffect(() => {
        if (!editor) return
        
        const currentContent = editor.getHTML()
        const newContentValue = content || ''
        
        // Only update if the content has actually changed externally
        if (currentContent !== newContentValue) {
            editor.commands.setContent(newContentValue)
        }
    }, [editor, content])

    return (
        <EditorContext value={providerValue}>
            <div
                className='flex flex-col gap-2 w-full h-full relative'
            >
                <div
                    className='border-2 border-primary/70 rounded'
                >
                    <Toolbar/>
                </div>
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