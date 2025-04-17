import { BlockElementIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { BG_FIELD, TEXT_COLOR_SCHEME_FIELD } from 'schemas/utils'

export default defineType({
  name: 'carousel',
  title: '1-Up Carousel',
  type: 'document',
  icon: BlockElementIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    BG_FIELD,
    TEXT_COLOR_SCHEME_FIELD,
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [ 
        {
          type: 'carouselItem',
        },
      ],
      // ensure at least one item is present
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items }) {
      return {
        media: items.length > 0 ? items[0]?.image : null,
        subtitle: items.length > 0 ? items[0]?.texBelow?.content[0]?.children[0].text : 'No items',
        title: 'Carousel',
      }
    },
  },
})
