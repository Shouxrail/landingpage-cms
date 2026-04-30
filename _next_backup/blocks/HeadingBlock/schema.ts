export const HeadingSchema = {
  text: { type: "text", label: "Heading Text", default: "Heading" },
  level: {
    type: "select",
    label: "Level",
    options: [
      { label: "H1", value: "h1" },
      { label: "H2", value: "h2" },
      { label: "H3", value: "h3" },
      { label: "H4", value: "h4" },
      { label: "H5", value: "h5" },
      { label: "H6", value: "h6" },
    ],
    default: "h2"
  },
  fontSize: {
    type: "select",
    label: "Font Size",
    options: [
      { label: "Base", value: "text-base" },
      { label: "Large", value: "text-lg" },
      { label: "XL", value: "text-xl" },
      { label: "2XL", value: "text-2xl" },
      { label: "3XL", value: "text-3xl" },
      { label: "4XL", value: "text-4xl" },
      { label: "5XL", value: "text-5xl" },
      { label: "6XL", value: "text-6xl" },
      { label: "7XL", value: "text-7xl" },
      { label: "8XL", value: "text-8xl" },
    ],
    default: "text-4xl"
  },
  color: { type: "color", label: "Text Color", default: "#000000" },
  align: {
    type: "select",
    label: "Alignment",
    options: [
      { label: "Left", value: "text-left" },
      { label: "Center", value: "text-center" },
      { label: "Right", value: "text-right" },
    ],
    default: "text-left"
  },
  fontWeight: {
    type: "select",
    label: "Font Weight",
    options: [
      { label: "Normal", value: "font-normal" },
      { label: "Medium", value: "font-medium" },
      { label: "Bold", value: "font-bold" },
      { label: "Black", value: "font-black" },
    ],
    default: "font-black"
  },
  marginTop: { type: "range", label: "Margin Top (px)", min: 0, max: 100, step: 4, default: 0 },
  marginBottom: { type: "range", label: "Margin Bottom (px)", min: 0, max: 100, step: 4, default: 16 },
};
