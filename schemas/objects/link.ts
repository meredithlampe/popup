import { defineArrayMember, defineField, defineType } from 'sanity'
import { LINK_FIELDS } from 'schemas/utils'

export default defineType({
  title: 'Link',
  name: 'link',
  type: 'object',
  fields: LINK_FIELDS,
  preview: {
    select: {
      url: 'url',
      page: 'page.slug.current',
      type: 'type',
    },
    prepare({ url, page, type }) {
      return {
        title: 'Link',
        subtitle: type === 'external' ? url : page,
      }
    },
  },
})
