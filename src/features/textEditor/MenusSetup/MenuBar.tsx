import type { Editor } from "@tiptap/core";
import LinkPopover from "../components/LinkPopover";
import FormattingButtons from "../components/FormattingButtons";
import HeadingSelect from "../components/HeadingSelect";
import ListButtons from "../components/ListButtons";
import HistoryButtons from "../components/HistoryButtons";
import { Toggle } from "@base-ui/react";
import { Unlink2 } from "lucide-react";
import editorState from "../editorState";

export const MenuBar = ({ editor }: { editor: Editor }) => {

  const editorStateFun = editorState(editor)

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group p-2">
      <div className="flex flex-wrap items-center gap-2 border border-input rounded-md p-2">
        <FormattingButtons editor={editor} editorState={editorStateFun} />

        <HeadingSelect editor={editor} />

        <ListButtons editor={editor} editorState={editorStateFun} />

        <HistoryButtons editor={editor} editorState={editorStateFun} />

        {editorStateFun.isLink ? (
          <Toggle
            pressed
            onPressedChange={() =>
              editor.chain().focus().extendMarkRange("link").unsetLink().run()
            }
          >
            <Unlink2 className="h-4 w-4" />
          </Toggle>
        ) : (
          <LinkPopover editor={editor} />
        )}
      </div>
    </div>
  );
};
