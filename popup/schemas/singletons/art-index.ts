import { DashboardIcon } from '@sanity/icons'
import {  defineArrayMember, defineField, defineType } from 'sanity'
import { ALL_SECTION_TYPES } from 'schemas/utils'

export default defineType({
  name: 'artIndex',
  title: 'Art Index',
  type: 'document',
  icon: DashboardIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Art',
      type: 'array',
      of: [{type: 'reference', to: [{ type: 'product'}]}],
      validation: (rule) => rule.max(24),
    }),
    defineField({
      name: 'gridDisruptors',
      title: 'Grid Disruptors',
      // description: 'These content modules will be displayed after every 4 items in the grid',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'editorial' }] }],
    }),
    defineField({
      name: 'sections',
      title: 'Page Content',
      description:
        'These are the content modules that will be displayed on underneath the artwork grid. You can add, remove, and reorder these modules.',
      type: 'array',
      of: ALL_SECTION_TYPES,
    }),
    defineField({
      name: 'overview',
      description: 'Used for the <meta> description tag for SEO.',
      title: 'Overview',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
  ],
  preview: {
    select: {},
    prepare({}) {
      return {
        title: 'Art Index',
      }
    },
  },
})
