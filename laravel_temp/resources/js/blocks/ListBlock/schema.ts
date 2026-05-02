export const ListBlockSchema = {
  items: {
    type: "objectList",
    label: "List Items",
    itemSchema: {
      title: { type: "text", label: "Item Title", default: "List Item Title" },
      contentBlocks: { type: "blocks", label: "Content Blocks", default: [] },
      defaultOpen: { 
        type: "select", 
        label: "Default State", 
        options: [
          { label: "Closed", value: "false" },
          { label: "Open", value: "true" }
        ],
        default: "false"
      },
      url: { type: "text", label: "Link URL (optional)", default: "" },
      urlText: { type: "text", label: "Link URL Text (optional)", default: "" },
    },
    default: [
      { title: "What is this feature?", contentBlocks: [], defaultOpen: "false" },
      { title: "How does it work?", contentBlocks: [], defaultOpen: "false" }
    ]
  },
  bgColor: { type: "color", label: "Background Color", default: "transparent" },
  textColor: { type: "color", label: "Text Color", default: "inherit" },
  borderColor: { type: "color", label: "Border Color", default: "rgba(0,0,0,0.1)" },
  titleSize: {
    type: "select",
    label: "Title Font Size",
    options: [
      { label: "Small", value: "text-sm" },
      { label: "Base", value: "text-base" },
      { label: "Large", value: "text-xl" },
      { label: "Extra Large", value: "text-2xl" },
    ],
    default: "text-base"
  },
  textContentSize: {
    type: "select",
    label: "Text Content Font Size",
    options: [
      { label: "Small", value: "text-sm" },
      { label: "Base", value: "text-base" },
      { label: "Large", value: "text-xl" },
      { label: "Extra Large", value: "text-2xl" },
    ],
    default: "text-base"
  },
  listStyle: {
    type: "select",
    label: "List Style",
    options: [
      { label: "Circle", value: "list-disc" },
      { label: "Number", value: "list-decimal" },
      { label: "None", value: "list-none" },
    ],
    default: "list-disc"
  },
  spacing: {
    type: "select",
    label: "Spacing",
    options: [
      { label: "Compact", value: "gap-2" },
      { label: "Normal", value: "gap-4" },
      { label: "Relaxed", value: "gap-6" }
    ],
    default: "gap-4"
  }
};
