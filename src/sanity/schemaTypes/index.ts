import { type SchemaTypeDefinition } from "sanity";
import { projectType } from "./project";
import { designerProfileType } from "./designerProfile";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, designerProfileType],
};
