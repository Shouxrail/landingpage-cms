export const ImageSchema = {
  src: { type: "image", label: "Image Source", default: "" },
  alt: { type: "text", label: "Alt Text", default: "Image description" },
  caption: { type: "text", label: "Caption (Optional)", default: "" },
};
