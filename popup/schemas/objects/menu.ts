import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  title: 'Menu',
  name: 'menu',
  type: 'object',
  fields: [
    {
      title: 'Menu Items',
      name: 'menuItems',
      type: 'array',
      of: [
        {
          title: 'Text Link',
          name: 'textLink',
          type: 'textLink',
        },
      ],
      validation: (Rule) => Rule.min(1),
    },
  ],
  preview: {
    select: {
      items: 'menuItems',
    },
    prepare({ items }) {
      return {
        title: 'Menu',
        subtitle: `${items.length} item ${items.length > 1 ? 's' : ''}`,
      }
    },
  },
})
