import React, { useEffect, useMemo, useState } from "react";
import { useEditor, Tiptap, EditorContext, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import Toolbar from "../btns/Toolbar";
import { BulletList, ListItem, OrderedList }  from "@tiptap/extension-list";
import CodeBlock from '@tiptap/extension-code-block'
import Heading  from'@tiptap/extension-heading'
import Paragraph from "@tiptap/extension-paragraph";
import Text from '@tiptap/extension-text'
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from '@tiptap/extension-underline'
import Document from '@tiptap/extension-document'
import Image from '@tiptap/extension-image'
import FileHandler from '@tiptap/extension-file-handler'
import { CharacterCount } from "@tiptap/extensions";

const RichTextInput = ({ 
  content = ``, 
  handleChangeContent, 
  hiddenComm,
  wordLimit=256,
  className="prose prose-lg max-w-none focus:outline-none min-h-50 flex flex-col flex-1 h-full p-2 bg-background rounded text-text placeholder:text-text/50"
}) => {

  const [newContent, setNewContent] = useState(content) // used to make sure the content updates

  const editorExtensions = [
    StarterKit,
    Placeholder.configure({
      placeholder: 'Start typing...'
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
    CharacterCount.configure({
      limit: wordLimit,
      mode:'dictionary'
    })
  ] 

  const editor = useEditor({
    extensions: editorExtensions,
    content: newContent,
    editorProps: {
      attributes: {
        // Add your Tailwind classes here
        class: className
        
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
    
    // Only update if the content has actually changed externally
    if (currentContent !== newContentValue) {
      editor.commands.setContent(newContentValue)
    }
  }, [editor, content])

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="flex flex-col-reverse flex-1 gap-0 w-full h-full relative border-2 border-primary/70 rounded">
        <Toolbar hiddenComm={hiddenComm}/>
        <EditorContent editor={editor} className="flex-1 h-full"/>
      </div>
    </EditorContext.Provider>
  );
};

export default RichTextInput;
