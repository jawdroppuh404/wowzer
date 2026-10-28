import type { CollectionConfig } from "payload";
import { canEdit } from "./Users";
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: canEdit,
    update: canEdit,
    delete: canEdit,
  },
  upload: {
    disableLocalStorage: true,
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    imageSizes: [
      { name: "card", width: 1000, height: 800, position: "centre" },
    ],
  },
  fields: [{ name: "alt", type: "text", required: true }],
};
