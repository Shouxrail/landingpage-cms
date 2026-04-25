import { BackgroundVideoSchema } from "./schema";
import { BackgroundVideoBlockComponent } from "./BackgroundVideoBlock";

export const BackgroundVideoBlock = {
  type: "backgroundVideo",
  Schema: BackgroundVideoSchema,
  Component: BackgroundVideoBlockComponent,
};
