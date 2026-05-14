export const TextSchema = {
  content: { type: "textarea", label: "Text Content", default: "Your text here..." },
  fontSize: {
    type: "select",
    label: "Font Size",
    options: [
      { label: "Smallest", value: "text-[0.625rem]" },
      { label: "Extra Small", value: "text-xs" },
      { label: "Small", value: "text-sm" },
      { label: "Base", value: "text-base" },
      { label: "Large", value: "text-lg" },
      { label: "XL", value: "text-xl" },
      { label: "2XL", value: "text-2xl" },
    ],
    default: "text-base"
  },
  fontWeight: {
    type: "select",
    label: "Font Weight",
    options: [
      { label: "Normal", value: "font-normal" },
      { label: "Medium", value: "font-medium" },
      { label: "Bold", value: "font-bold" },
      { label: "Extra Bold", value: "font-extrabold" },
    ],
    default: "font-normal"
  },
  fontItalic: { type: "boolean", label: "Italic", default: false },
  color: { type: "color", label: "Text Color", default: "#4B5563" },
  align: {
    type: "select",
    label: "Alignment",
    options: [
      { label: "Left", value: "text-left" },
      { label: "Center", value: "text-center" },
      { label: "Right", value: "text-right" },
      { label: "Justify", value: "text-justify" },
    ],
    default: "text-left"
  },
  lineHeight: {
    type: "select",
    label: "Line Height",
    options: [
      { label: "Tight", value: "leading-tight" },
      { label: "Normal", value: "leading-normal" },
      { label: "Relaxed", value: "leading-relaxed" },
      { label: "Loose", value: "leading-loose" },
    ],
    default: "leading-relaxed"
  },
  marginTop: { type: "range", label: "Margin Top (px)", min: 0, max: 100, step: 4, default: 0 },
  marginLeft: { type: "range", label: "Margin Left (px)", min: 0, max: 100, step: 4, default: 0 },
  marginRight: { type: "range", label: "Margin Right (px)", min: 0, max: 100, step: 4, default: 0 },
  marginBottom: { type: "range", label: "Margin Bottom (px)", min: 0, max: 100, step: 4, default: 8 },
  letterSpacing: { type: "range", label: "Letter Spacing (em)", min: -0.1, max: 0.5, step: 0.01, default: 0 },
  links: {
    type: "objectList",
    label: "Custom Links",
    default: [],
    itemSchema: {
      text: { type: "text", label: "Display Text (must match text in content)" },
      url: { type: "text", label: "URL" },
      newTab: { type: "boolean", label: "Open in new tab?", default: true },
      underline: { type: "boolean", label: "Show underline?", default: true },
    }
  },
};
