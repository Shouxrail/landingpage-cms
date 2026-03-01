import { Hero } from "@/blocks/Hero/Hero";
import { Features } from "@/blocks/Features/Features";
import Image from "@/blocks/Image/Image";

const COMPONENTS: Record<string, any> = {
  hero: Hero,
  features: Features,
  image: Image,
};

export default function BlockRenderer({ blocks }: { blocks: any[] }) {
  if (!blocks) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const Component = COMPONENTS[block.type];
        if (!Component) {
          return (
            <div key={index} className="p-4 bg-red-50 text-red-500 rounded-lg">
              Block type "{block.type}" not found in registry.
            </div>
          );
        }
        return <Component key={index} data={block.data} />;
      })}
    </>
  );
}