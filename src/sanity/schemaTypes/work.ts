import {defineField, defineType} from 'sanity'

export const work = defineType({
  name: 'work',
  title: '作品',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '标题', type: 'string' }),
    defineField({
      name: 'slug',
      title: '链接',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'cover',
      title: '封面',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'excerpt', title: '简介', type: 'text' }),
    defineField({
      name: 'content',
      title: '正文',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'date',
      title: '日期',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})

defineField({ name: "featured", title: "置顶", type: "boolean", initialValue: false }),
defineField({
  name: "featuredOrder",
  title: "置顶排序（数字小靠前）",
  type: "number",
  hidden: ({ document }) => !document?.featured,
}),
defineField({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "SEO 标题", type: "string" }),
    defineField({ name: "description", title: "SEO 描述", type: "text" }),
    defineField({ name: "ogImage", title: "OG 图片", type: "image", options: { hotspot: true } }),
  ],
})

defineField({ name: "featured", title: "置顶", type: "boolean", initialValue: false }),
defineField({
  name: "featuredOrder",
  title: "置顶排序（数字小靠前）",
  type: "number",
  hidden: ({ document }) => !document?.featured,
});


