export const ButtonBlockComponent = ({ data }: { data: any }) => {
  const variant = data.variant || "btn-primary";
  const size = data.size || "btn-md";
  const fullWidth = data.fullWidth || "";
  const align = data.align || "justify-start";
  const marginTop = data.marginTop !== undefined ? `${data.marginTop}px` : "8px";
  const marginBottom = data.marginBottom !== undefined ? `${data.marginBottom}px` : "8px";

  const containerClasses = align.split(' ')[0]; // justify-start, etc

  return (
    <div 
        className={`flex ${containerClasses}`} 
        style={{ marginTop, marginBottom }}
    >
      <a
        href={data.url || "#"}
        className={`btn ${variant} ${size} ${fullWidth} rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95`}
      >
        {data.text || "Click Me"}
      </a>
    </div>
  );
};
