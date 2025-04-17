import { defineType } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'
import { BG_FIELD, TEXT_COLOR_SCHEME_FIELD } from '../utils'

export default defineType({
  name: 'flippedText',
  title: 'Flipped Text',
  type: 'document',
  icon: BlockContentIcon,
  fields: [
    BG_FIELD,
    TEXT_COLOR_SCHEME_FIELD,
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'headingFlipped',
      title: 'Flipped Heading',
      type: 'string',
    },
    {
      name: 'bodyText',
      title: 'Body Text',
      type: 'customPortableText',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      headingFlipped: 'headingFlipped',
    },
    prepare({ heading, headingFlipped }) {
      return {
        title: `Flipped Text: ${heading} / ${headingFlipped}`,
      }
    }
  }
})
