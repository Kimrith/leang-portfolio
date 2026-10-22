import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Completion Year",
      type: "number",
      initialValue: 2026,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Product Design", value: "Product Design" },
          { title: "Design Systems", value: "Design Systems" },
          { title: "Brand Identity", value: "Brand Identity" },
          { title: "Spatial & Web3", value: "Spatial & Web3" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tagline",
      title: "Short Tagline / Summary",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "metadata",
      title: "Project Metadata",
      type: "object",
      fields: [
        { name: "role", type: "string", title: "Role" },
        { name: "timeline", type: "string", title: "Timeline" },
        { name: "tools", type: "array", of: [{ type: "string" }], title: "Tools Used" },
        { name: "deliverables", type: "array", of: [{ type: "string" }], title: "Key Deliverables" },
        { name: "liveUrl", type: "url", title: "Live URL" },
      ],
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "object",
      fields: [
        { name: "challenge", type: "text", title: "The Challenge", rows: 4 },
        { name: "solution", type: "text", title: "The Solution", rows: 4 },
        { name: "impact", type: "text", title: "The Impact", rows: 3 },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "client",
      media: "coverImage",
    },
  },
});
