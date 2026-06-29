import { Editor } from "@tiptap/core";
import { menuBarStateSelector } from "./menuBarState";
import { useEditorState } from "@tiptap/react";
import { EditorStateType } from "./types/textEditor.Types";

const editorState = (editor: Editor) => {
 const editorState = useEditorState<EditorStateType>({
    editor,
    selector: menuBarStateSelector,
  });

  return editorState
};

export default editorState