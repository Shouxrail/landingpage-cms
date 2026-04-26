export const ButtonSchema = {
  text: { type: "text", label: "Button Text", default: "Click Me" },
  url: { type: "text", label: "Button Link", default: "#" },
  variant: {
    type: "select",
    label: "Style Variant",
    options: [
      { label: "Primary", value: "btn-primary" },
      { label: "Secondary", value: "btn-secondary" },
      { label: "Accent", value: "btn-accent" },
      { label: "Ghost", value: "btn-ghost" },
      { label: "Outline", value: "btn-outline" },
      { label: "Soft", value: "btn-soft" },
    ],
    default: "btn-primary"
  },
  size: {
    type: "select",
    label: "Size",
    options: [
      { label: "Huge", value: "btn-lg" },
      { label: "Normal", value: "btn-md" },
      { label: "Small", value: "btn-sm" },
      { label: "Tiny", value: "btn-xs" },
    ],
    default: "btn-md"
  },
  fullWidth: {
    type: "select",
    label: "Full Width",
    options: [
      { label: "No", value: "" },
      { label: "Yes", value: "w-full" },
    ],
    default: ""
  },
  align: {
    type: "select",
    label: "Alignment",
    options: [
      { label: "Left", value: "justify-start text-left" },
      { label: "Center", value: "justify-center text-center" },
      { label: "Right", value: "justify-end text-right" },
    ],
    default: "justify-start text-left"
  },
  marginTop: { type: "range", label: "Margin Top (px)", min: 0, max: 100, step: 4, default: 8 },
  marginBottom: { type: "range", label: "Margin Bottom (px)", min: 0, max: 100, step: 4, default: 8 },
};
