export type BlockType = "hero" | "features";

export interface BlockData {
  type: BlockType;
  data: any;
}

export interface LandingPageContent {
  blocks: BlockData[];
}
