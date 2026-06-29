import { useState } from "react";

import { Link2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import toast from "react-hot-toast";

import type { Editor } from "@tiptap/core";

const LinkPopover = ({ editor }: { editor: Editor }) => {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  const handleSaveLink = () => {
    // Text select nahi kiya
    if (editor.state.selection.empty) {
      toast.error("Please select the text you want to link.");
      return;
    }

    if (!url.trim()) {
      toast.error("Please enter a valid URL.");
      return;
    }

    toast.success("Link added successfully.");

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
      })
      .run();

    setUrl("");
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (value) {
          setUrl(editor.getAttributes("link").href || "");
        }
      }}
    >
      <PopoverTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
        <Link2 className="h-4 w-4" />
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Add Link</h4>

          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveLink();
              }
            }}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                setUrl("");
              }}
            >
              Cancel
            </Button>

            <Button type="button" onClick={handleSaveLink}>
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LinkPopover;
