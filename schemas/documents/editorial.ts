import { EditIcon } from '@sanity/icons'
import sanityCustomImage from 'lib/sanity.custom-image'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { ALL_SECTION_TYPES } from 'schemas/utils'

export default defineType({
  name: 'editorial',
  title: 'Editorial Content',
  type: 'document',
  icon: EditIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description:
        'Short title of the editorial. Used in breadcrumbs on editorial page and browser tab.',
    }),
    defineField({
      name: 'shortSummary',
      title: 'Short Summary',
      type: 'customPortableText',
      description: "Short summary of the editorial. Used in editorial cards' summaries, underneath the featured image and title information.",
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      description: 'Handle to be used in URL, must be unique per editorial',
    }),
    sanityCustomImage({
      name: 'featuredImage',
      title: 'Featured Image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'reference',
      to: [{ type: 'editorialType' }],
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }],
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'customPortableText',
      description: 'Shown underneath featured image and short summary on editorial page.',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'creationDate',
      title: 'Creation Date',
      type: 'date',
    }),
    defineField({
      name: 'creatorFirstName',
      title: 'Creator First Name',
      type: 'string',
    }),
    defineField({
      name: 'creatorLastName',
      title: 'Creator Last Name',
      type: 'string',
    }),
    defineField({
      name: 'creatorTitle',
      title: 'Creator Title',
      type: 'string',
    }),
    defineField({
      name: 'sections',
      title: 'Page Content',
      description:
        'These are the content modules that will be displayed on your home page. You can add, remove, and reorder these modules.',
      type: 'array',
      of: ALL_SECTION_TYPES,
    }),
    defineField({
      name: 'overview',
      description: 'Used for the <meta> description tag for SEO.',
      title: 'Meta Description',
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
})
