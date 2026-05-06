export const SpacerBlockComponent = ({ data }: { data: any }) => {
  const height = data.height !== undefined ? `${data.height / 16}rem` : "2.5rem";
  return <div style={{ height }} />;
};
