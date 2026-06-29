import { Toggle } from "@/components/ui/toggle";
import type { Editor } from "@tiptap/core";
import { Bold, Code2, Highlighter, Italic, Strikethrough } from "lucide-react";
import type { EditorStateType } from "../types/textEditor.Types";

const FormattingButtons = ({
  editor,
  editorState,
}: {
  editor: Editor;
  editorState: EditorStateType;
}) => {
  return (
    <div>
      {" "}
      {/* Bold */}
      <Toggle
        pressed={editorState.isBold}
        disabled={!editorState.canBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      {/* Italic */}
      <Toggle
        pressed={editorState.isItalic}
        disabled={!editorState.canItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      {/* Strike-through */}
      <Toggle
        pressed={editorState.isStrike}
        disabled={!editorState.canStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      {/* Code */}
      <Toggle
        pressed={editorState.isCode}
        disabled={!editorState.canCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
      >
        <Code2 className="h-4 w-4" />
      </Toggle>
      {/* Highlight */}
      <Toggle
        pressed={editorState.isHighlight}
        disabled={!editorState.canHighlight}
        onPressedChange={() =>
          editor.chain().focus().toggleHighlight({ color: "yellow" }).run()
        }
      >
        <Highlighter className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default FormattingButtons;
