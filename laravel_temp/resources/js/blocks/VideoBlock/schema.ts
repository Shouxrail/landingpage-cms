export const VideoSchema = {
  url: { type: "video", label: "Video URL", default: "https://www.w3schools.com/html/mov_bbb.mp4" },
  poster: { type: "image", label: "Poster Image (Optional)", default: "" },
  hideControls: { type: "boolean", label: "Hide Player Controls", default: false },
  autoPlay: { type: "boolean", label: "Autoplay (Muted)", default: false },
  loop: { type: "boolean", label: "Loop Video", default: false },
  fit: { 
    type: "select", 
    label: "Video Fit & Aspect", 
    options: [
      { label: "Standard (16:9 Aspect Ratio)", value: "aspect-video object-cover" },
      { label: "Fill Container", value: "w-full h-full object-cover rounded-2xl" },
      { label: "Vertical/Mobile (9:16 Aspect)", value: "aspect-[9/16] object-cover max-w-sm mx-auto" }
    ],
    default: "aspect-video object-cover" 
  }
};
