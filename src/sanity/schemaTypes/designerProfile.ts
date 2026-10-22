import { defineField, defineType } from "sanity";

export const designerProfileType = defineType({
  name: "designerProfile",
  title: "Designer Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      initialValue: "Leang Sok",
    }),
    defineField({
      name: "monogram",
      title: "Monogram (2 letters)",
      type: "string",
      initialValue: "LS",
    }),
    defineField({
      name: "roleTitle",
      title: "Role Title",
      type: "string",
      initialValue: "Staff Product Designer & Design Architect",
    }),
    defineField({
      name: "status",
      title: "Status Badge Text",
      type: "string",
      initialValue: "Available for select advisory & leadership",
    }),
    defineField({
      name: "availability",
      title: "Availability Period",
      type: "string",
      initialValue: "Q2 / Q3 2026",
    }),
    defineField({
      name: "headline",
      title: "Hero Headline",
      type: "string",
    }),
    defineField({
      name: "statement",
      title: "Bio Statement",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "bioParagraphs",
      title: "About Bio Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Portrait Photo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
