import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenusSetup/MenuBar";
import { Placeholder } from "@tiptap/extensions";
import Highlight from "@tiptap/extension-highlight";
import type { TextEditorProps } from "./types/textEditor.Types";
import { BubbleMenu as TextEditorBubbleMenu } from "@tiptap/react/menus";
import { BubbleMenu } from "./MenusSetup/BubbleMenu";

const TextEditorSetup = ({ content, onChange }: TextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: `📄 Tell candidates about your company, culture, mission, and what makes your workplace unique...`,
      }),
      Highlight.configure({ multicolor: true }),
      // Link.configure({
      //   openOnClick: false,
      //   autolink: true,
      //   linkOnPaste: true,
      // }),
    ],

    content: content || "",

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose dark:prose-invert prose-sm sm:prose-base focus:outline-none max-w-none min-h-37.5 p-2"
      />
      <TextEditorBubbleMenu
        className="bg-white z-50 zoom-in-50 rounded-lg"
        editor={editor}
      >
        <BubbleMenu editor={editor} />
      </TextEditorBubbleMenu>
    </div>
  );
};

export default TextEditorSetup;
