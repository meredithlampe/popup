import { defineType } from 'sanity'
import {  EnvelopeIcon } from '@sanity/icons'
import { BG_FIELD, TEXT_COLOR_SCHEME_FIELD } from 'schemas/utils'

export default defineType({
  name: 'emailSubscribe',
  title: 'Email Subscribe',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    BG_FIELD,
    TEXT_COLOR_SCHEME_FIELD,
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
    },
    {
      name: 'bodyText',
      title: 'Body Text',
      type: 'customPortableText',
      description: 'Appears above the email input field',
    },
    {
      name: 'finePrint',
      title: 'Fine Print',
      type: 'customPortableText',
      description: 'Appears below the email input field',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: `Email Subscribe`,
        subtitle: heading
      }
    }
  }
})
