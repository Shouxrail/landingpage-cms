import { HeroBlock } from "../blocks/Hero";
import { FeaturesBlock } from "../blocks/Features";
import { ImageBlock } from "../blocks/Image";
import { EditorBlock } from "@/blocks/EditorBlock";
import { LayoutBlock } from "@/blocks/LayoutBlock";
import { VideoBlock } from "@/blocks/VideoBlock";
import { BackgroundVideoBlock } from "@/blocks/BackgroundVideoBlock";

export const BLOCK_REGISTRY: Record<string, any> = {
  [HeroBlock.type]: HeroBlock,
  [FeaturesBlock.type]: FeaturesBlock,
  [ImageBlock.type]: ImageBlock,
  [EditorBlock.type]: EditorBlock,
  [LayoutBlock.type]: LayoutBlock,
  [VideoBlock.type]: VideoBlock,
  [BackgroundVideoBlock.type]: BackgroundVideoBlock,
};
