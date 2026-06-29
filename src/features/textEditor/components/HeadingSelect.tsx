import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Editor } from "@tiptap/core";
import { Heading } from "lucide-react";

const HeadingSelect = ({ editor }: { editor: Editor }) => {
  return (
    <div>
      {" "}
      {/* Heading & Paragraph */}
      <Select
        onValueChange={(value) => {
          if (value === "paragraph") {
            editor.chain().focus().setParagraph().run();
            return;
          }

          editor
            .chain()
            .focus()
            .toggleHeading({
              level: Number(value) as 1 | 2 | 3 | 4 | 5 | 6,
            })
            .run();
        }}
      >
        <SelectTrigger className="w-45">
          <Heading className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Paragraph" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem value="1">Heading 1</SelectItem>
          <SelectItem value="2">Heading 2</SelectItem>
          <SelectItem value="3">Heading 3</SelectItem>
          <SelectItem value="4">Heading 4</SelectItem>
          <SelectItem value="5">Heading 5</SelectItem>
          <SelectItem value="6">Heading 6</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HeadingSelect;
