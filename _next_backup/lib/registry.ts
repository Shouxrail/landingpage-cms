import { HeroBlock } from "../blocks/Hero";
import { FeaturesBlock } from "../blocks/Features";
import { ImageBlock } from "../blocks/Image";
import { EditorBlock } from "@/blocks/EditorBlock";
import { LayoutBlock } from "@/blocks/LayoutBlock";
import { VideoBlock } from "@/blocks/VideoBlock";
import { BackgroundVideoBlock } from "@/blocks/BackgroundVideoBlock";
import { HeadingBlock } from "@/blocks/HeadingBlock";
import { TextBlock } from "@/blocks/TextBlock";
import { ButtonBlock } from "@/blocks/ButtonBlock";
import { SpacerBlock } from "@/blocks/SpacerBlock";
import { CardBlock } from "@/blocks/Card";
import { ListBlockPlugin } from "@/blocks/ListBlock";
import { FormBlockPlugin } from "@/blocks/FormBlock";

export const BLOCK_REGISTRY: Record<string, any> = {
  [HeroBlock.type]: HeroBlock,
  [FeaturesBlock.type]: FeaturesBlock,
  [ImageBlock.type]: ImageBlock,
  [EditorBlock.type]: EditorBlock,
  [LayoutBlock.type]: LayoutBlock,
  [VideoBlock.type]: VideoBlock,
  [BackgroundVideoBlock.type]: BackgroundVideoBlock,
  [HeadingBlock.type]: HeadingBlock,
  [TextBlock.type]: TextBlock,
  [ButtonBlock.type]: ButtonBlock,
  [SpacerBlock.type]: SpacerBlock,
  [CardBlock.type]: CardBlock,
  [ListBlockPlugin.type]: ListBlockPlugin,
  [FormBlockPlugin.type]: FormBlockPlugin
};
