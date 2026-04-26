export const CardSchema = {
  bgColor: { type: "color", label: "Background Color", default: "" },
  maxWidth: { type: "number", label: "Max Width Value" },
  maxWidthUnit: {
    type: "select",
    label: "Width Unit",
    options: [
      { label: "Percentage (%)", value: "%" },
      { label: "Pixels (px)", value: "px" }
    ],
    default: "%"
  },
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
  suptitle: { type: "text", label: "Section Sup Title", default: "Our Features" },
  suptitleColor: { type: "color", label: "Sup Title Color", default: "" },
  title: { type: "text", label: "Section Title", default: "Our Features" },
  titleSize: {
    type: "select",
    label: "Title Font Size",
    options: [
      { label: "Smallest", value: "text-xl" },
      { label: "Smaller", value: "text-2xl" },
      { label: "Small", value: "text-3xl" },
      { label: "Medium", value: "text-4xl" },
      { label: "Large", value: "text-5xl" },
      { label: "Larger", value: "text-6xl" },
      { label: "Extra Large", value: "text-7xl" },
      { label: "Extra Larger", value: "text-8xl" },
      { label: "Largest", value: "text-9xl" },
    ],
    default: "text-5xl"
  },
  titleColor: { type: "color", label: "Title Color", default: "#ffffff" },
  description: { type: "textarea", label: "Section Description", default: "Discover what makes us stand out from the rest." },
  descSize: {
    type: "select",
    label: "Description Font Size",
    options: [
      { label: "Small", value: "text-sm" },
      { label: "Base", value: "text-base" },
      { label: "Large", value: "text-xl" },
      { label: "Extra Large", value: "text-2xl" },
    ],
    default: "text-lg"
  },
  descColor: { type: "color", label: "Description Color", default: "#ffffff" },
  buttons: {
    type: "objectList",
    label: "Action Buttons",
    itemSchema: {
      text: { type: "text", label: "Button Text", default: "Learn More" },
      url: { type: "text", label: "Button Link", default: "#" },
      icon: { type: "image", label: "Button Icon", default: "" },
      textColor: { type: "color", label: "Text Color", default: "#ffffff" },
      textHoverColor: { type: "color", label: "Text Hover Color", default: "#ffffff" },
      bgColor: { type: "color", label: "Background Color", default: "" },
      bgHoverColor: { type: "color", label: "Background Hover Color", default: "#ffffff" }
    },
    default: []
  }
};
