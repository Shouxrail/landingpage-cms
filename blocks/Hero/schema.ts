export const HeroSchema = {
  bgColor: { type: "color", label: "Background Color", default: "" },
  bgImage: { type: "image", label: "Background Image", default: "" },
  title: { type: "text", label: "Hero Title", default: "Enter Title" },
  subtitle: { type: "textarea", label: "Subtitle", default: "Enter Subtitle here..." },
  description: { type: "textarea", label: "Description", default: "Enter Description here..." },
  align: {
    type: "select",
    label: "Text Alignment",
    options: [
      { label: "Left Aligned", value: "text-left justify-start" },
      { label: "Center Aligned", value: "text-center justify-center" },
      { label: "Right Aligned", value: "text-right justify-end" },
    ],
    default: "text-center justify-center"
  },
  buttons: {
    type: "objectList",
    label: "Action Buttons",
    itemSchema: {
      label: { type: "text", label: "Button Label", default: "Get Started" },
      url: { type: "text", label: "Button URL", default: "#" },
    },
    default: [
      { label: "Get Started", url: "#" }
    ]
  }
};
