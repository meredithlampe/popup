import { BlockElementIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { BG_FIELD, TEXT_COLOR_SCHEME_FIELD } from 'schemas/utils'

export default defineType({
  name: 'carouselTwoUp',
  title: '2-Up Carousel',
  type: 'document',
  icon: BlockElementIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    BG_FIELD,
    TEXT_COLOR_SCHEME_FIELD,
    defineField({
      name: 'text',
      title: 'Text',
      type: 'customPortableText',
      description: 'Optional text to display above the carousel',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
            type: 'reference', to: [{type: 'product'}, {type: 'artist'}, {type: 'editorial'}]
        },
        {
          type: 'carouselTwoUpItem',
        },
      ],
      validation: (Rule) => Rule.min(2),
    }),
  ],
  preview: {
    select: {
      text: 'text',
      items: 'items',
    },
    prepare({ text }) {
      if (text && text?.content[0]?.children[0]?.text) {
        return {
          title: '2-Up Carousel',
          subtitle: text?.content[0]?.children[0]?.text,
        }
      }
      return {
        title: '2-Up Carousel',
      }
    },
  },
})
