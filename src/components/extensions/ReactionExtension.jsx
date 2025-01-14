import { Node, mergeAttributes } from "@tiptap/core";

const ReactionExtension = Node.create({
  name: "reaction",

  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      emoji: {
        default: "👍",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-reaction]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, { "data-reaction": "" }),
      HTMLAttributes.emoji,
    ];
  },

  addCommands() {
    return {
      addReaction:
        (emoji) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { emoji },
          });
        },
    };
  },
});

export default ReactionExtension;
