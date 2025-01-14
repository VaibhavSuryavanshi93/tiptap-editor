import React, { useState } from "react";
const MenuBar = ({ editor }) => {
  const [isFontMenuOpen, setFontMenuOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("👍");
  const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false);

  // Array of emojis you and add more if you want fo 
  const emojis = ["👍", "❤️", "😂", "😎", "🔥", "🎉", "💡", "🚀", "👏"];

  // Function to handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    if (editor) {
      editor.chain().focus().addReaction(emoji).run(); // Insert selected emoji
    }
    setIsEmojiMenuOpen(false);
  };

  // Toggle emoji
  const toggleEmojiMenu = () => {
    setIsEmojiMenuOpen(!isEmojiMenuOpen);
  };

  // Function to pronounce selected text 
  const pronounceText = () => {
    const selection = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to
    );
    const textToPronounce = selection || editor.getText();
    if (textToPronounce) {
      const utterance = new SpeechSynthesisUtterance(textToPronounce);
      speechSynthesis.speak(utterance);
    }
  };
  if (!editor) return null;

  const fontStyles = [ // You can add more font Styles 
    "Arial",
    "Courier New",
    "Georgia",
    "Times New Roman",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Impact",
    "Lucida Console",
  ];

  const applyFont = (font) => {
    editor.chain().focus().setFontFamily(font).run();
    setFontMenuOpen(false);
  };

  return (
    <div className="menu-bar">
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        Bold
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        Italic
      </button>
      <button onClick={() => editor.chain().focus().toggleHighlight().run()}>
        Highlight
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        Center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        Right
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
      >
        Justify
      </button>
      {/* <button onClick={() => editor.chain().focus().addReaction("😂").run()}>
        Add Reaction 😂
      </button>
      <button onClick={() => editor.chain().focus().addReaction("❤️").run()}>
        Add Reaction ❤️
      </button> */}
      <button onClick={() => editor.chain().focus().undo().run()}>Undo</button>
      <button onClick={() => editor.chain().focus().redo().run()}>Redo</button>
      {/* Emoji Button */}
      <button className="emoji-btn" onClick={toggleEmojiMenu}>
        Add Reactions 😂 {selectedEmoji}
      </button>
      {/* Pronunciation Button */}
      <button className="pronounce-btn" onClick={pronounceText}>
        🎤 Pronounce
      </button>

      {/* Emoji Menu Popup */}
      {isEmojiMenuOpen && (
        <div className="emoji-menu">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleEmojiSelect(emoji)}
              className="emoji-option"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
      {/* Button to open the font menu */}
      <button onClick={() => setFontMenuOpen(!isFontMenuOpen)}>
        Font Style
      </button>
      {isFontMenuOpen && (
        <div className="font-menu">
          {fontStyles.map((font) => (
            <button
              key={font}
              onClick={() => applyFont(font)}
              style={{ fontFamily: font }}
            >
              {font}
            </button>
          ))},
        </div>
      )}
    </div>
  );
};

export default MenuBar;
