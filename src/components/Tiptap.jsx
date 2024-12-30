import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./menuBar";

import "../styles/styles.css";

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight],
    content: "<p>Edit your text here.. </p>",
  });

  return (
    <div>
      <MenuBar className="Editor" editor={editor} />
      <EditorContent editor={editor} className="ProseMirror" />
    </div>
  );
};

export default TiptapEditor;
