import { ComponentProps } from "react";

export type ImageUploadProps = Omit<ComponentProps<"div">, "onChange"> & {
  onChange: (value: string) => void;
  value: string;
  descriptions?: string;
};