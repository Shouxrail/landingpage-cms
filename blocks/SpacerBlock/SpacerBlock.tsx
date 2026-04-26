export const SpacerBlockComponent = ({ data }: { data: any }) => {
  const height = data.height !== undefined ? `${data.height}px` : "40px";
  return <div style={{ height }} />;
};
