import { BlockContentIcon } from '@sanity/icons'
import sanityCustomImage from '../../../lib/sanity.custom-image'
import { defineField, defineType } from 'sanity'
import { BG_FIELD, TEXT_COLOR_SCHEME_FIELD } from '../utils'

export default defineType({
  name: 'blockText',
  title: 'Block Text',
  type: 'document',
  icon: BlockContentIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    BG_FIELD,
    TEXT_COLOR_SCHEME_FIELD,
    defineField({
      type: 'customPortableText',
      name: 'content',
      title: 'Content',
    }),
    sanityCustomImage({
      name: 'image',
      title: 'Image',
      hasOptionalCaption: true,
      description:
        'If included, will render image alongside block text, according to layout below',
    }),
    defineField({
      name: 'imageLayout',
      title: 'Image Layout',
      type: 'string',
      options: {
        list: ['left', 'right'],
      },
      hidden: ({ parent }) => !parent.image,
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      return {
        subtitle: content?.content[0]?.children[0]?.text ?? 'No content',
        title: 'Block Text',
      }
    },
  },
})
