export const EditorBlockSchema = {
  title: { type: "text", label: "Block Title", default: "Untitled Block" },
  content: { type: "textarea", label: "Block Content", default: "Write your content here..." },
  media: { type: "image", label: "Optional Media", default: "" }
};
