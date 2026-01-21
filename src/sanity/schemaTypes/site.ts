import {defineType, defineField, defineArrayMember} from "sanity";

export const site = defineType({
  name: "site",
  title: "站点设置",
  type: "document",
  fields: [
    defineField({ name: "title", title: "网站标题", type: "string" }),
    defineField({ name: "tagline", title: "一句话简介", type: "text" }),

    defineField({ name: "introTitle", title: "简介标题", type: "string" }),
    defineField({ name: "introText", title: "简介内容", type: "text" }),

    defineField({ name: "contactEmail", title: "Email", type: "string" }),
    defineField({ name: "contactSocial", title: "Social", type: "string" }),

    
  ],
});

defineField({
  name: "seo",
  title: "默认 SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "默认标题", type: "string" }),
    defineField({ name: "description", title: "默认描述", type: "text" }),
    defineField({ name: "ogImage", title: "默认 OG 图", type: "image", options: { hotspot: true } }),
  ],
}),
defineField({
  name: "socialLinks",
  title: "社交链接",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      name: "socialLink",
      title: "Social Link",
      fields: [
        defineField({ name: "label", title: "名称", type: "string" }),
        defineField({ name: "url", title: "链接", type: "url" }),
      ],
    }),
  ],
});

defineArrayMember({
  type: "object",
  name: "socialLink",
  fields: [
    defineField({ name: "label", title: "名称", type: "string" }),
    defineField({
      name: "icon",
      title: "图标 key（github/x/linkedin/email）",
      type: "string",
    }),
    defineField({ name: "url", title: "链接", type: "url" }),
  ],
});

