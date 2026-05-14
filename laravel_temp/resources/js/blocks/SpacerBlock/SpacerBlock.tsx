export const SpacerBlockComponent = ({ data }: { data: any }) => {
  if (!data) return <div style={{ height: "2.5rem", width: "100%" }} />;
  
  const h = data.height ?? 40;
  const unit = data.unit ?? "px";
  
  let height = `${h / 16}rem`; // Default to px (scaled)
  
  if (unit === "%") height = `${h}%`;
  else if (unit === "vh") height = `${h}vh`;
  
  return <div style={{ height, width: "100%" }} />;
};
