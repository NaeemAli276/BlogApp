import React, { useMemo } from "react";
import { useEditor, Tiptap, EditorContext } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder'
import Toolbar from "../btns/Toolbar";

const RichTextInput = ({ content = `` }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Enter some content'
      })
    ],
    content: content,
    editorProps: {
      attributes: {
        // Add your Tailwind classes here
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[200px] p-2 bg-background border-t-0 rounded-t-none border-2 rounded border-primary text-text placeholder:text-text/50",
      },
    },
    immediatelyRender: true
  });

  const providerValue = useMemo(() => ({ editor }, [editor]))

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="flex flex-col gap-0 w-full h-full">
        <Toolbar editor={editor}/>
        <Tiptap editor={editor}>
          <Tiptap.Content />
        </Tiptap>
      </div>
    </EditorContext.Provider>
  );
};

export default RichTextInput;
