import React, { useState } from "react";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import FontFamilyExtension from "./extensions/FontFamilyExtension";
import Highlight from "@tiptap/extension-highlight";
import ReactionExtension from "./extensions/ReactionExtension";
import PronounceExtension from "./extensions/PronounceExtension";
import MenuBar from "./menuBar";
import TextAlign from "@tiptap/extension-text-align";
import "../styles/styles.css";

const TiptapEditor = () => {
  const [wordCount, setWordCount] = useState(0);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      ReactionExtension,
      PronounceExtension,
      TextStyle,
      FontFamilyExtension,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Enter your text..</P>", // Placeholder error , not showing
    onUpdate({ editor }) {
      const text = editor.getText();
      setWordCount(text.trim().split(/\s+/).length); // Count the words
    },
  });

  return (
    <div className="editor-container">
      <MenuBar className="Editor" editor={editor} />
      <EditorContent editor={editor} className="ProseMirror" />
      <p className="word-counter">Word Count: {wordCount}</p>
    </div>
  );
};

export default TiptapEditor;
