import { HeroBlock } from "../blocks/Hero";
import { FeaturesBlock } from "../blocks/Features";
import { ImageBlock } from "../blocks/Image";

export const BLOCK_REGISTRY: Record<string, any> = {
  [HeroBlock.type]: HeroBlock,
  [FeaturesBlock.type]: FeaturesBlock,
  [ImageBlock.type]: ImageBlock,
};
