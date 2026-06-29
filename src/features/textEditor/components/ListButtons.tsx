import { Toggle } from "@/components/ui/toggle";
import { List, ListOrdered } from "lucide-react";

import type { Editor } from "@tiptap/core";
import type { EditorStateType } from "../types/textEditor.Types";

const ListButtons = ({
  editor,
  editorState,
}: {
  editor: Editor;
  editorState: EditorStateType;
}) => {
  return (
    <div>
      {/* Unordered List */}

      <Toggle
        pressed={editorState.isBulletList}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>

      {/* Ordered List */}

      <Toggle
        pressed={editorState.isOrderedList}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default ListButtons;
