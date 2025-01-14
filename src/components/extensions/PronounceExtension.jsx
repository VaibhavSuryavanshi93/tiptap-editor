import { Node, mergeAttributes } from "@tiptap/core";

const PronounceExtension = Node.create({
  name: "pronounce",

  inline: true,
  group: "inline",
  atom: true,

  addAttributes() {
    return {
      word: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-pronounce]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, { "data-pronounce": "" }),
      HTMLAttributes.word,
      "<button class='pronounce-btn' onclick='pronounceWord(\"" +
        HTMLAttributes.word +
        "\")'>🔊</button>",
    ];
  },

  addCommands() {
    return {
      addPronounce:
        (word) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { word },
          });
        },
    };
  },
});
// eslint-disable-next-line
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  window.speechSynthesis.speak(utterance);
}

export default PronounceExtension;
