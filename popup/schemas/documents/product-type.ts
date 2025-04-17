import { defineField, defineType } from 'sanity'
import { OlistIcon } from '@sanity/icons'

export default defineType({
  name: 'productType',
  title: 'Artwork Type',
  type: 'document',
  icon: OlistIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    })
  ],
})
