export const TextBlockComponent = ({ data }: { data: any }) => {
  const fontSize = data.fontSize || "text-base";
  const color = data.color || "inherit";
  const align = data.align || "text-left";
  const lineHeight = data.lineHeight || "leading-relaxed";
  const marginTop = data.marginTop !== undefined ? `${data.marginTop}px` : "0px";
  const marginBottom = data.marginBottom !== undefined ? `${data.marginBottom}px` : "8px";

  return (
    <p
      className={`${fontSize} ${align} ${lineHeight}`}
      style={{
        color: color === "inherit" ? undefined : color,
        marginTop,
        marginBottom,
        whiteSpace: "pre-line",
      }}
    >
      {data.content || "Your text here..."}
    </p>
  );
};
