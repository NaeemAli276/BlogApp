import React from 'react'
import { Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import TextAlign from '@tiptap/extension-text-align'
import Blockquote from '@tiptap/extension-blockquote'
import { Link } from '@tiptap/extension-link'
import FileHandler from '@tiptap/extension-file-handler'
import { useEditor } from '@tiptap/react'
import { EditorContent } from '@tiptap/react'
import Image from '@tiptap/extension-image'

const RichTextViewer = ({
    content,
    className = 'px-2 text-text/70'
}) => {

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
                class: 'pl-4 max-w-none bg-background/0'
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
                class: className
            },
        },
        editable:false,
    });

    return (
        <div
            className='w-full h-full'
        >
            <EditorContent
                editor={editor}
            />
        </div>
    )
}

export default RichTextViewer