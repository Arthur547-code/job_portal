import { Button } from "@/components/ui/button";
import { Redo2, Undo2 } from "lucide-react";
import type { Editor } from "@tiptap/core";
import type { EditorStateType } from "../types/textEditor.Types";

const HistoryButtons = ({
  editor,
  editorState,
}: {
  editor: Editor;
  editorState: EditorStateType;
}) => {
  return (
    <div>
      {" "}
      {/* Undo */}
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 className="h-4 w-4" />
      </Button>{" "}
      {/* Redo */}
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default HistoryButtons;
