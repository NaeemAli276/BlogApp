import React, { useEffect, useMemo, useState } from "react";
import { useEditor, Tiptap, EditorContext, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import Toolbar from "../btns/Toolbar";

const RichTextInput = ({ content = ``, handleChangeContent }) => {


  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Enter some content'
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
        <Toolbar />
        <EditorContent editor={editor} className="flex-1 h-full"/>
      </div>
    </EditorContext.Provider>
  );
};

export default RichTextInput;
