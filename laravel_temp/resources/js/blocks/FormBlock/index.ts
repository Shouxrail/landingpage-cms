import FormBlock from "./FormBlock";
import { FormBlockSchema } from "./schema";

export const FormBlockPlugin = {
  Component: FormBlock,
  Schema: FormBlockSchema,
  type: "form",
};
