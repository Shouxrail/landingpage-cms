export const LayoutBlockSchema = {
  direction: { 
    type: "select", 
    label: "Layout Configuration", 
    options: [
      { label: "Stack Vertically (Rows)", value: "grid-cols-1" },
      { label: "2 Columns (50/50)", value: "grid-cols-1 md:grid-cols-2" },
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
