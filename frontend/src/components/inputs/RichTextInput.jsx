import React, { useEffect, useMemo, useState } from "react";
import { useEditor, Tiptap, EditorContext, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import Toolbar from "../btns/Toolbar";

const RichTextInput = ({ content = `` }) => {


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
        }
      })
    ],
    content: content,
    editorProps: {
      attributes: {
        // Add your Tailwind classes here
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[200px] p-2 bg-background border-t-0 rounded-t-none border-2 rounded border-primary/70 text-text placeholder:text-text/50",
      },
    },
    immediatelyRender: true
  });

  const providerValue = useMemo(() => ({ editor }), [editor])

  if (!editor) return null;

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="flex flex-col gap-0 w-full h-full relative">
        <Toolbar />
        <EditorContent editor={editor}/>
      </div>
    </EditorContext.Provider>
  );
};

export default RichTextInput;
