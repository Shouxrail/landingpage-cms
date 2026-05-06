export const LayoutBlockSchema = {
  bgColor: { type: "color", label: "Background Color", default: "transparent" },
  paddingX: { type: "range", label: "Horizontal Padding", min: 0, max: 200, step: 1, unit: "px", default: 0 },
  paddingY: { type: "range", label: "Vertical Padding", min: 0, max: 200, step: 1, unit: "px", default: 0 },
  alignX: {
    type: "select",
    label: "Horizontal Alignment",
    options: [
      { label: "Stretch (default)", value: "justify-items-stretch" },
      { label: "Left", value: "justify-items-start" },
      { label: "Center", value: "justify-items-center" },
      { label: "Right", value: "justify-items-end" },
    ],
    default: "justify-items-stretch"
  },
  alignY: {
    type: "select",
    label: "Vertical Alignment",
    options: [
      { label: "Top (default)", value: "items-start" },
      { label: "Center", value: "items-center" },
      { label: "Bottom", value: "items-end" },
      { label: "Stretch", value: "items-stretch" },
    ],
    default: "items-start"
  },
  height: {
    type: "select",
    label: "Block Height",
    options: [
      { label: "Auto (Content Based)", value: "h-auto" },
      { label: "Full Screen (100vh)", value: "h-screen" },
      { label: "Min Full Screen (min-h-screen)", value: "min-h-screen" },
    ],
    default: "h-auto"
  },
  direction: {
    type: "select",
    label: "Layout Configuration",
    options: [
      { label: "Stack Vertically (Rows)", value: "grid-cols-1" },
      { label: "2 Columns (50/50)", value: "grid-cols-1 md:grid-cols-2" },
      { label: "2 Columns (40/60)", value: "grid-cols-1 md:grid-cols-[40%_60%]" },
      { label: "3 Columns (33/33/33)", value: "grid-cols-1 md:grid-cols-3" },
      { label: "4 Columns (25/25/25/25)", value: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" },
      { label: "Left Heavy (70/30)", value: "grid-cols-1 md:grid-cols-[7fr_3fr]" },
      { label: "Right Heavy (30/70)", value: "grid-cols-1 md:grid-cols-[3fr_7fr]" }
    ],
    default: "grid-cols-1"
  },
  children: {
    type: "blocks",
    label: "Nested Blocks",
    default: []
  }
};
