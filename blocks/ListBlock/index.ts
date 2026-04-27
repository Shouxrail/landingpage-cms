import ListBlock from "./ListBlock";
import { ListBlockSchema } from "./schema";

export const ListBlockPlugin = {
  Component: ListBlock,
  Schema: ListBlockSchema,
  type: "list",
};
