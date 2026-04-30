import { VideoSchema } from "./schema";
import { VideoBlockComponent } from "./VideoBlock";

export const VideoBlock = {
  type: "video",
  Schema: VideoSchema,
  Component: VideoBlockComponent,
};
