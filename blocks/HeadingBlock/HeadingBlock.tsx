export const HeadingBlockComponent = ({ data }: { data: any }) => {
  const Tag = (data.level || "h2") as keyof JSX.IntrinsicElements;
  const fontSize = data.fontSize || "text-4xl";
  const color = data.color || "inherit";
  const align = data.align || "text-left";
  const fontWeight = data.fontWeight || "font-black";
  const marginTop = data.marginTop !== undefined ? `${data.marginTop}px` : "0px";
  const marginBottom = data.marginBottom !== undefined ? `${data.marginBottom}px` : "16px";

  return (
    <Tag
      className={`${fontSize} ${align} ${fontWeight} leading-tight`}
      style={{
        color: color === "inherit" ? undefined : color,
        marginTop,
        marginBottom,
      }}
    >
      {data.text || "Heading"}
    </Tag>
  );
};
