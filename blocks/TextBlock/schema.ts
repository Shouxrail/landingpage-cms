export const TextSchema = {
  content: { type: "textarea", label: "Text Content", default: "Your text here..." },
  fontSize: {
    type: "select",
    label: "Font Size",
    options: [
      { label: "Small", value: "text-sm" },
      { label: "Base", value: "text-base" },
      { label: "Large", value: "text-lg" },
      { label: "XL", value: "text-xl" },
      { label: "2XL", value: "text-2xl" },
    ],
    default: "text-base"
  },
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
  marginBottom: { type: "range", label: "Margin Bottom (px)", min: 0, max: 100, step: 4, default: 8 },
};
