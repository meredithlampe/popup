import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  title: 'Image Link Array',
  name: 'imageLinkArray',
  type: 'object',
  fields: [
    {
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [
        {
          title: 'Image Link',
          name: 'imageLink',
          type: 'imageLink',
        },
      ],
    },
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items }) {
      return {
        title: 'Image Link List',
        subtitle: `${items.length} item ${items.length > 1 ? 's' : ''}`,
      }
    },
  },
})
