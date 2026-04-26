export const HeroSchema = {
  bgColor: { type: "color", label: "Background Color", default: "" },
  bgImage: { type: "image", label: "Background Image", default: "" },
  overlayOpacity: {
    type: "select",
    label: "Overlay Filter",
    options: [
      { label: "None", value: "bg-transparent" },
      { label: "Glass (White)", value: "bg-white/40" },
      { label: "Glass (Black)", value: "bg-black/40" },
      { label: "Soft White", value: "bg-white/80" },
      { label: "Soft Black", value: "bg-black/80" }
    ],
    default: "bg-transparent"
  },
  paddingY: { type: "range", label: "Vertical Padding (px)", min: 0, max: 300, step: 10, default: 100 },
  align: {
    type: "select",
    label: "Content Alignment",
    options: [
      { label: "Left", value: "items-start text-left" },
      { label: "Center", value: "items-center text-center" },
      { label: "Right", value: "items-end text-right" },
    ],
    default: "items-center text-center"
  },
  children: {
    type: "blocks",
    label: "Block Content",
    default: [
      { type: "heading", data: { text: "Main Hero Heading", level: "h1", fontSize: "text-6xl", align: "text-inherit" } },
      { type: "text", data: { content: "This is a modular hero section. Add any blocks here.", fontSize: "text-xl", align: "text-inherit" } },
      { type: "button", data: { text: "Get Started Now", align: "justify-center" } }
    ]
  }
};
