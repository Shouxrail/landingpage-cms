export const BackgroundVideoSchema = {
  url: { type: "video", label: "Background Video URL", default: "https://www.w3schools.com/html/mov_bbb.mp4" },
  poster: { type: "image", label: "Poster Image (Shows while loading)", default: "" },
  id: { type: "text", label: "Section ID", default: "" },
  bgColor: { type: "color", label: "Background Color", default: "#000000" },
  horizontalPadding: { type: "range", label: "Horizontal Padding", min: 0, max: 1000, step: 1, unit: "(px)", default: 0 },
  height: {
    type: "select",
    label: "Section Height",
    options: [
      { label: "Full Screen (100vh)", value: "h-screen" },
      { label: "Min Full Screen (min-h-screen)", value: "min-h-screen" },
      { label: "Auto (Content Based)", value: "h-auto" },
    ],
    default: "h-screen"
  },
  overlayOpacity: {
    type: "select",
    label: "Darkness Overlay Filter",
    options: [
      { label: "None (0%)", value: "bg-transparent" },
      { label: "Light (30%)", value: "bg-black/30" },
      { label: "Medium (60%)", value: "bg-black/60" },
      { label: "Heavy (80%)", value: "bg-black/80" }
    ],
    default: "bg-black/60"
  },
  contentPosition: {
    type: "select",
    label: "Content Placement",
    options: [
      { label: "Absolute Center", value: "items-center justify-center text-center" },
      { label: "Top Left", value: "items-start justify-start text-left" },
      { label: "Bottom Left", value: "items-end justify-start text-left" },
      { label: "Center Right", value: "items-center justify-end text-right" },
      { label: "Center Left", value: "items-center justify-start text-left" },
      { label: "Top Center", value: "items-start justify-center text-center pt-24" },
    ],
    default: "items-center justify-center text-center"
  },
  videoSize: {
    type: "select",
    label: "Video Size",
    options: [
      { label: "Fill Entire Background Layout", value: "w-full h-full" },
      { label: "Fit Width (100% w)", value: "w-full h-auto" },
      { label: "Large (75% w)", value: "w-[75%] h-auto" },
      { label: "Medium (50% w)", value: "w-[50%] h-auto" },
      { label: "Small (25% w)", value: "w-[25%] h-auto" },
      { label: "Fit Height (100% h)", value: "h-full w-auto" },
      { label: "Extra Wide (125% w)", value: "w-[125%] h-full" },
      { label: "Double Wide (200% w)", value: "w-[200%] h-full" },
    ],
    default: "w-full h-full"
  },
  videoPlacement: {
    type: "select",
    label: "Video Position (If Resized)",
    options: [
      { label: "Top Left", value: "top-0 left-0" },
      { label: "Top Center", value: "top-0 left-1/2 -translate-x-1/2" },
      { label: "Top Right", value: "top-0 right-0" },
      { label: "Center Left", value: "top-1/2 left-0 -translate-y-1/2" },
      { label: "Absolute Center", value: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" },
      { label: "Center Right", value: "top-1/2 right-0 -translate-y-1/2" },
      { label: "Bottom Left", value: "bottom-0 left-0" },
      { label: "Bottom Center", value: "bottom-0 left-1/2 -translate-x-1/2" },
      { label: "Bottom Right", value: "bottom-0 right-0" },
    ],
    default: "top-0 left-0"
  },
  objectPosition: {
    type: "select",
    label: "Video Focus/Alignment (Object Position)",
    options: [
      { label: "Center", value: "object-center" },
      { label: "Left", value: "object-left" },
      { label: "Right", value: "object-right" },
      { label: "Top", value: "object-top" },
      { label: "Bottom", value: "object-bottom" },
    ],
    default: "object-center"
  },
  horizontalOffset: {
    type: "range",
    label: "Manual Horizontal Shift",
    min: -100,
    max: 100,
    step: 1,
    unit: "%",
    default: 0
  },
  fixedBackground: { type: "boolean", label: "Fixed Background (Still on Scroll)", default: false },
  children: {
    type: "blocks",
    label: "Foreground Content Elements",
    default: []
  }
};
