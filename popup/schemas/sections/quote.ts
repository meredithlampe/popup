import { DocumentIcon } from '@sanity/icons'
import {  defineField, defineType } from 'sanity'
import { BG_FIELD, TEXT_COLOR_SCHEME_FIELD } from '../utils'

export default defineType({
  name: 'quote',
  title: 'Quote',
  type: 'document',
  icon: DocumentIcon,
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
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content}) {
      return {
        subtitle: content?.content[0]?.children[0]?.text ?? "No content",
        title: 'Quote'
      }
    },
  },
})
