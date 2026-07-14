// # UploadThing

// ## Steps

// 1. Create File Router
// 2. Create Route Handler
// 3. Add NextSSRPlugin
// 4. Generate React Helpers
// 5. useUploadThing()
// 6. startUpload(file)
// 7. onClientUploadComplete()
// 8. Save ufsUrl to RHF
// 9. Submit form
// 10. Save URL in DB

import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { ImageUploadProps } from "./types/types";

const ImageUpload = ({
  onChange,
  value,
  descriptions,
  className,
  ...props
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Clean up Object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res?.[0]) {
        onChange(res[0].ufsUrl);
        toast.success("Image Uploaded Successfully.");
      }
      setIsUploading(false);
      // Fast UX: Preview ko turant reset nahi karte jab tak new value sync na ho
      setPreviewUrl(null);
    },
    onUploadError: (error: Error) => {
      toast.error(`Upload failed: ${error.message}`);
      setIsUploading(false);
      setPreviewUrl(null);
    },
  });

  const handleFileSelect = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please Select An Image File.");
      return;
    }

    // 4MB Validation
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image Size Should Be Less Than 4MB");
      return;
    }

    // Performance Boost: FileReader ki jagah Object URL use kiya (Instant Preview)
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setIsUploading(true);

    try {
      await startUpload([file]);
    } catch {
      setIsUploading(false);
      setPreviewUrl(null);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await handleFileSelect([file]);
    e.target.value = "";
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileSelect,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    disabled: isUploading,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  const displayUrl = previewUrl || value;

  // Render Logic
  if (displayUrl) {
    return (
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-lg border border-border group select-none",
          className,
        )}
        {...props}
      >
        <Image
          src={displayUrl}
          alt="Uploaded Image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={!!previewUrl} // Performance: Preview image ko high priority load do
          className={cn(
            "object-cover transition-all duration-300",
            isUploading && "blur-sm scale-95 opacity-70",
          )}
        />

        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-xs transition-opacity">
            <div className="flex flex-col items-center gap-2 rounded-xl bg-background/80 px-4 py-3 shadow-md backdrop-blur-md">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-xs font-medium text-foreground">
                Uploading...
              </span>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center rounded-lg justify-center gap-3 bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-xs">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Change
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
            >
              <X className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-200 select-none",
        isDragActive
          ? "border-primary bg-primary/5 scale-[0.99]"
          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30",
        isUploading && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center p-4 text-center">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-transform group-hover:scale-110 hover:">
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>

        <p className="mb-1 text-sm font-medium text-foreground">
          <span className="text-primary hover:underline">Browse Photo</span> or
          drop here
        </p>

        {descriptions && (
          <p className="max-w-xs text-xs text-muted-foreground mt-1 leading-normal">
            {descriptions}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
