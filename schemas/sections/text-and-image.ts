import { InlineIcon } from '@sanity/icons'
import sanityCustomImage from 'lib/sanity.custom-image'
import { defineType } from 'sanity'
import { BG_FIELD, TEXT_COLOR_SCHEME_FIELD } from 'schemas/utils'

export default defineType({
  name: 'textAndImage',
  title: 'Text and Image',
  type: 'document',
  icon: InlineIcon,
  fields: [
    BG_FIELD,
    TEXT_COLOR_SCHEME_FIELD,
    {
      name: 'text',
      title: 'Text',
      type: 'customPortableText',
    },
    sanityCustomImage({ name: 'image', title: 'Image' }),
    {
      name: 'imageLayout',
      title: 'Image Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Image Right', value: 'right' },
          { title: 'Image Left', value: 'left' },
        ],
      },
    },
    {
      name: 'imageStyle',
      title: 'Image Style',
      type: 'string',
      options: {
        list: [
          { title: 'Contain', value: 'contain' },
          { title: 'Fill', value: 'fill' },
        ],
      },
    },
  ],
  preview: {
    select: {
      text: 'text',
      image: 'image',
    },
    prepare({ text, image }) {
      return {
        title: 'Text and Image',
        media: image,
      }
    },
  },
})
