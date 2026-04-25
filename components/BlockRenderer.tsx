import { Hero } from "@/blocks/Hero/Hero";
import { Features } from "@/blocks/Features/Features";
import Image from "@/blocks/Image/Image";
import { EditorBlockComponent } from "@/blocks/EditorBlock/EditorBlock";
import { LayoutBlockComponent } from "@/blocks/LayoutBlock/LayoutBlock";
import { VideoBlockComponent } from "@/blocks/VideoBlock/VideoBlock";
import { BackgroundVideoBlockComponent } from "@/blocks/BackgroundVideoBlock/BackgroundVideoBlock";

const COMPONENTS: Record<string, any> = {
  hero: Hero,
  features: Features,
  image: Image,
  editor: EditorBlockComponent,
  layout: LayoutBlockComponent,
  video: VideoBlockComponent,
  backgroundVideo: BackgroundVideoBlockComponent,
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