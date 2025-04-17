import { UserIcon } from '@sanity/icons'
import sanityCustomImage from 'lib/sanity.custom-image'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { ALL_SECTION_TYPES, LINK_FIELDS } from 'schemas/utils'

export default defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  icon: UserIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  groups: [
    { name: 'general', title: 'General' },
    { name: 'information', title: 'Information' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'firstName',
      description: 'First name of the artist',
      title: 'First Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'lastName',
      description: 'Last name of the artist',
      title: 'Last Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc, _context) => `${doc.firstName}-${doc.lastName}`,
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'products',
      title: 'Featured Art',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      description: 'Dictates the order of the More Arworks By section. Pieces shown in that section will be the chosen according to the following logic: find the index of the current art piece in this list, then choose the next two pieces to show first. Finish the list in this ordre and loop around at the end.'
    }),
    sanityCustomImage({
      name: 'featuredImage',
      title: 'Featured Image',
      group: 'general',
    }),
    defineField({
      name: 'overview',
      description: 'Used for the <meta> description tag for SEO and in the card view for artist.',
      title: 'Overview',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: LINK_FIELDS,
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      group: 'seo',
    }),
    defineField({
      name: 'sections',
      title: 'Page Content',
      description:
        'These are the content modules that will be displayed on your home page. You can add, remove, and reorder these modules.',
      type: 'array',
      of: ALL_SECTION_TYPES,
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      media: 'featuredImage',
    },
    prepare({ firstName, lastName, media }) {
      return {
        title: `${firstName} ${lastName}`,
        media: media,
      }
    },
  },
})
