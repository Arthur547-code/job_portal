import { Toggle } from "@/components/ui/toggle";
import { FileCode2, Quote } from "lucide-react";
import type { Editor } from "@tiptap/core";
import type { EditorStateType } from "../types/textEditor.Types";

const BlockButtons = ({
  editor,
  editorState,
}: {
  editor: Editor;
  editorState: EditorStateType;
}) => {
  return (
    <div>
      {" "}
      {/* Code Block */}
      <Toggle
        pressed={editorState.isCodeBlock}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <FileCode2 className="h-4 w-4" />
      </Toggle>
      {/* Blockquote */}
      <Toggle
        pressed={editorState.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default BlockButtons;
