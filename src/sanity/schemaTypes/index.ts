import { type SchemaTypeDefinition } from "sanity";

const embed: SchemaTypeDefinition = {
  name: "embed",
  type: "object",
  title: "Embed",
  fields: [
    {
      name: "embedUrl",
      type: "url",
      title: "Embed URL",
      description:
        "The URL of the embedded content (e.g., YouTube video, external iframe, etc.).",
    },
    {
      name: "embedDescription",
      type: "string",
      title: "Embed Description",
      description: "A short description of the embedded content.",
    },
  ],
  preview: {
    select: {
      title: "embedDescription",
      subtitle: "embedUrl",
    },
  },
};
const page: SchemaTypeDefinition = {
  name: "page",
  type: "document",
  title: "Page",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "isFolder",
      type: "boolean",
      title: "Is Folder",
    },
    {
      name: "parentId",
      type: "reference",
      to: [{ type: "page" }],
      title: "Parent Folder",
    },
    {
      name: "editorType",
      title: "Editor Type",
      type: "string",
      options: {
        list: [
          { title: "Article", value: "article" },
          { title: "Full Embed", value: "embed" },
        ],
      },
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [
        { type: "block" }, // Standard rich text blocks
        { type: "embed" }, // Reference to the embed type
      ],
    },
    {
      name: "fullEmbedUrl",
      type: "url",
      title: "Full Embed URL",
    },
  ],
};
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, embed],
};
