import type { CollectionConfig } from "payload";
import { canEdit, publishedOrEditor } from "./Users";
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
  },
  access: {
    read: publishedOrEditor,
    create: canEdit,
    update: canEdit,
    delete: ({ req }) => req.user?.role === "admin",
  },
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 30 },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "select",
      required: true,
      unique: true,
      options: ["plumbing", "hvac"],
    },
    {
      name: "theme",
      type: "select",
      required: true,
      options: ["water", "air"],
    },
    { name: "heroTitle", type: "text", required: true },
    { name: "heroAccent", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "introTitle", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
    {
      name: "image",
      type: "text",
      required: true,
      admin: {
        description:
          "Local image path; uploading a feature image below overrides this.",
      },
    },
    { name: "featureImage", type: "upload", relationTo: "media" },
    { name: "imageAlt", type: "text", required: true },
    {
      name: "offerings",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
    {
      name: "faqs",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
    { name: "seoTitle", type: "text", required: true },
    { name: "seoDescription", type: "textarea", required: true },
  ],
};
