export const FeaturesSchema = {
  title: { type: "text", label: "Section Title", default: "Our Features" },
  subtitle: { type: "textarea", label: "Section Subtitle", default: "Discover what makes us stand out from the rest." },
  items: { 
    type: "objectList", 
    label: "Feature Items", 
    itemSchema: {
      title: { type: "text", label: "Title", default: "New Feature" },
      description: { type: "textarea", label: "Description", default: "Feature description..." },
    },
    default: [
      { title: "High Performance", description: "Incredibly fast and optimized." },
      { title: "Fully Responsive", description: "Looks great on any screen size." },
      { title: "Modern Design", description: "Clean, elegant, and user-friendly." }
    ] 
  },
};
