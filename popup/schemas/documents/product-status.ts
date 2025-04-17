import { defineField, defineType } from 'sanity'
import { InfoOutlineIcon } from '@sanity/icons'

export default defineType({
  name: 'productStatus',
  title: 'Product Status',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
