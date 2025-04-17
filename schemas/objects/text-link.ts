import { resolvePageTitle } from 'lib/sanity.links'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  title: 'Text Link',
  name: 'textLink',
  type: 'object',
  fields: [
    {
      title: 'Text',
      name: 'text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Link',
      name: 'link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      text: 'text',
      link: 'link',
      pageType: 'link.page._type',
      pageTitle: 'link.page.title',
    },
    prepare({ text, link, pageType, pageTitle }) {
      const title = resolvePageTitle(pageType, pageTitle)
      return {
        title: text,
        subtitle: link.type === 'external' ? link.url : `reference to ${title} page`,
      }
    },
  },
})
