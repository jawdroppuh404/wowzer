import type { GlobalConfig, TextField, TextareaField } from "payload";
import { canEdit } from "../collections/Users";
const text = (
  name: string,
  type: "text" | "textarea" = "text",
): TextField | TextareaField =>
  type === "text"
    ? { name, type: "text", required: true }
    : { name, type: "textarea", required: true };
export const Site: GlobalConfig = {
  slug: "site",
  label: "Website & homepage",
  access: { read: () => true, update: canEdit },
  versions: { max: 30 },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contact & booking",
          fields: [
            text("phone"),
            text("email"),
            text("address"),
            text("bookingURL"),
            text("schedulerID"),
            {
              ...text("schedulerKey"),
              admin: {
                description:
                  "Public embed key from the existing ServiceTitan scheduler; this is not a private API credential.",
              },
            },
            { name: "serviceAreas", type: "array", fields: [text("name")] },
          ],
        },
        {
          label: "Brand & homepage",
          fields: [
            text("logoPath"),
            text("vanPath"),
            { name: "logo", type: "upload", relationTo: "media" },
            { name: "van", type: "upload", relationTo: "media" },
            text("heroTitle"),
            text("heroAccent"),
            text("heroDescription", "textarea"),
            text("promiseTitle"),
            text("promiseDescription", "textarea"),
            {
              name: "promises",
              type: "array",
              fields: [text("title"), text("description", "textarea")],
            },
            text("ctaTitle"),
          ],
        },
        {
          label: "Florida imagery",
          fields: [
            {
              name: "neighborhoodPhoto",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Illustrative neighborhood panorama used throughout the service-area sections.",
              },
            },
            {
              name: "homePhoto",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Home exterior used in the homepage feature and Plumbing panel.",
              },
            },
            {
              name: "backyardPhoto",
              type: "upload",
              relationTo: "media",
              admin: {
                description: "Backyard lifestyle image used for Heating & Air.",
              },
            },
          ],
        },
        {
          label: "Membership & financing",
          fields: [
            text("membershipTitle"),
            text("membershipDescription", "textarea"),
            text("membershipPrice"),
            text("membershipPeriod"),
            text("membershipAnnual"),
            text("membershipURL"),
            text("financingTitle"),
            text("financingDescription", "textarea"),
            text("financingURL"),
          ],
        },
        {
          label: "FAQs",
          fields: [
            {
              name: "faqs",
              type: "array",
              fields: [text("question"), text("answer", "textarea")],
            },
          ],
        },
      ],
    },
  ],
};
