import type { CollectionConfig, Access } from "payload";
export const isAdmin: Access = ({ req }) => req.user?.role === "admin";
export const canEdit: Access = ({ req }) =>
  ["admin", "editor", "agent"].includes(req.user?.role || "");
export const publishedOrEditor: Access = ({ req }) =>
  req.user ? canEdit({ req }) : { _status: { equals: "published" } };
export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    useAPIKey: true,
    tokenExpiration: 7200,
    maxLoginAttempts: 5,
    lockTime: 600000,
  },
  admin: {
    useAsTitle: "email",
    description:
      "Editors manage content. Agents use API keys. Only administrators manage accounts.",
  },
  access: {
    admin: ({ req }) => ["admin", "editor"].includes(req.user?.role || ""),
    create: isAdmin,
    read: ({ req }) =>
      req.user?.role === "admin" ? true : { id: { equals: req.user?.id } },
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: "name", type: "text" },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: ["admin", "editor", "agent"],
      access: {
        update: ({ req }) => req.user?.role === "admin",
        create: ({ req }) => req.user?.role === "admin",
      },
    },
  ],
};
