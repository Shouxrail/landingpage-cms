import { Hero } from "@/blocks/Hero/Hero";
import { Card } from "@/blocks/Card/Card";
import Image from "@/blocks/Image/Image";
import { EditorBlockComponent } from "@/blocks/EditorBlock/EditorBlock";
import { LayoutBlockComponent } from "@/blocks/LayoutBlock/LayoutBlock";
import { VideoBlockComponent } from "@/blocks/VideoBlock/VideoBlock";
import { BackgroundVideoBlockComponent } from "@/blocks/BackgroundVideoBlock/BackgroundVideoBlock";
import { HeadingBlockComponent } from "@/blocks/HeadingBlock/HeadingBlock";
import { TextBlockComponent } from "@/blocks/TextBlock/TextBlock";
import { ButtonBlockComponent } from "@/blocks/ButtonBlock/ButtonBlock";
import { SpacerBlockComponent } from "@/blocks/SpacerBlock/SpacerBlock";
import Features from "@/blocks/Features/Features";

const COMPONENTS: Record<string, any> = {
  hero: Hero,
  features: Features,
  card: Card,
  image: Image,
  editor: EditorBlockComponent,
  layout: LayoutBlockComponent,
  video: VideoBlockComponent,
  backgroundVideo: BackgroundVideoBlockComponent,
  heading: HeadingBlockComponent,
  text: TextBlockComponent,
  button: ButtonBlockComponent,
  spacer: SpacerBlockComponent,
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