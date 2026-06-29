export type EditorStateType = {
  isBold: boolean;
  canBold: boolean;
  isItalic: boolean;
  canItalic: boolean;
  isStrike: boolean;
  canStrike: boolean;
  isLink: boolean;
  isCode: boolean;
  canCode: boolean;
  canClearMarks: boolean;
  isHighlight: boolean;
  canHighlight: boolean;
  isParagraph: boolean;
  isHeading1: boolean;
  isHeading2: boolean;
  isHeading3: boolean;
  isHeading4: boolean;
  isHeading5: boolean;
  isHeading6: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isCodeBlock: boolean;
  isBlockquote: boolean;
  canUndo: boolean;
  canRedo: boolean;
};

export type TextEditorProps = {
  content?: string;
  onChange: (value: string) => void;
};
