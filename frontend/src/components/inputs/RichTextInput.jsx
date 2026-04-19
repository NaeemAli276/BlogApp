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

const RichTextInput = ({ 
  content = ``, 
  handleChangeContent, 
  allowedCommands = {
    listItem: true,
    codeBlock: true,
    textAlign: true,
    blockQuote: true,
    link: true,
    headings: true,
    bold: true,
    italic: true,
    underline: true
  }
}) => {

  const editorExtensions = [
    StarterKit.configure({
      heading: allowedCommands.headings,
      codeBlock: allowedCommands.codeBlock,
      bulletList: allowedCommands.listItem,
      orderedList: allowedCommands.listItem,
      Blockquote: allowedCommands.blockQuote,
      link: allowedCommands.link,
      bold: allowedCommands.bold,
      italic: allowedCommands.italic,
      underline: allowedCommands.underline
    }),
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
    })
  ] 

  const editor = useEditor({
    extensions: editorExtensions,
    content: content,
    editorProps: {
      attributes: {
        // Add your Tailwind classes here
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[200px] flex flex-col flex-1 h-full p-2 bg-background rounded text-text placeholder:text-text/50",
        
      },
    },
    onUpdate: () => handleChangeContent(editor.getHTML()),
    immediatelyRender: true,
  });

  const providerValue = useMemo(() => ({ editor }), [editor])

  if (!editor) return null;

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="flex flex-col-reverse flex-1 gap-0 w-full h-full relative border-2 border-primary/70 rounded">
        <Toolbar allowedCommands={allowedCommands}/>
        <EditorContent editor={editor} className="flex-1 h-full"/>
      </div>
    </EditorContext.Provider>
  );
};

export default RichTextInput;
