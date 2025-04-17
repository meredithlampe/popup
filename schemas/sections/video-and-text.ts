import { DocumentVideoIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { BG_FIELD, TEXT_COLOR_SCHEME_FIELD } from 'schemas/utils'

export default defineType({
  name: 'videoAndText',
  title: 'Video and Text',
  type: 'document',
  icon: DocumentVideoIcon,
  fields: [
    BG_FIELD,
    TEXT_COLOR_SCHEME_FIELD,
    {
        name: 'title',
        title: 'Title',
        type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'customPortableText',
    },
    defineField({
      name:'videoId',
      title: 'Vimeo Video ID',
      type: 'string',
    }),
    defineField({
      name: 'embedCode',
      title: 'Embed Code',
      type: 'text',
    }),
    // defineField({
    //     name: 'video',
    //     title: 'Video',
    //     type: 'mux.video',
    // })
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare({ text }) {
      return {
        title: 'Video and Text',
        subtitle: text?.content[0]?.children[0]?.text ?? "No text content",
      }
    },
  },
})
