import { PresentationIcon } from '@sanity/icons'
import sanityCustomImage from '../../../lib/sanity.custom-image'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { ALL_SECTION_TYPES, LINK_FIELDS } from '../utils'
export default defineType({
  name: 'product',
  title: 'Art',
  type: 'document',
  icon: PresentationIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  groups: [
    { name: 'general', title: 'General' },
    { name: 'information', title: 'Information' },
    { name: 'dimensions', title: 'Dimensions' },
    { name: 'pageContent', title: 'Page Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of the art piece.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'general',
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
      group: 'general',
      description: 'Handle to be used in URL, must be unique',
    }),
    // defineField({
    //   name: 'fullPath',
    //   title: 'Full URL Path',
    //   type: 'string',
    //   group: 'general',
    //   readOnly: true,
    //   components: {
    //     input: MyCustomStringInput,
    //   },
    // }),
    defineField({
      name: 'shopifyProductId',
      title: 'Shopify Product ID',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'reference',
      to: [{ type: 'productStatus' }],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      group: 'information',
    }),
    defineField({
      name: 'yearCreated',
      title: 'Year Created',
      type: 'string',
      group: 'information',
    }),
    defineField({
      name: 'editionSize',
      title: 'Edition Size',
      type: 'string',
      group: 'information',
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'text',
      group: 'information',
      hidden: true,
    }),
    defineField({
      name: 'types',
      title: 'Types',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'productType' }] }],
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }],
    }),
    sanityCustomImage({
      name: 'featuredImage',
      title: 'Featured Image',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alternateImages',
      title: 'Alternate Images',
      type: 'array',
      of: [sanityCustomImage({ name: 'image' })],
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'object',
      group: 'information',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'headerBlurb',
          title: 'Header Blurb',
          type: 'customPortableText',
          description: 'Appears at the top of the gray drawer section, underneath "More About this Artwork"'
        }),
        defineField({
          name: 'drawers',
          title: 'Drawers',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'drawer',
              title: 'Drawer',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'content',
                  title: 'Content',
                  type: 'customPortableText',
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'footerBlurb',
          title: 'Footer Blurb',
          type: 'customPortableText',
          description: 'Appears at the bottom of the gray drawer section, underneath "Questions about this artwork? ..."'
        }),
      ],
    }),
    defineField({
      name: 'description',
      description:
        'Used for the description on PDP page and <meta> description tag for SEO',
      title: 'Description',
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
        'These are the content modules that will be displayed underneath the product details. You can add, remove, and reorder these modules.',
      type: 'array',
      of: ALL_SECTION_TYPES,
      group: 'pageContent',
    }),
    defineField({
      name: 'height',
      title: 'Height (in)',
      type: 'number',
      group: 'dimensions',
      initialValue: 0,
    }),
    defineField({
      name: 'width',
      title: 'Width (in)',
      type: 'number',
      group: 'dimensions',
      initialValue: 0,
    }),
    defineField({
      name: 'depth',
      title: 'Depth (in)',
      type: 'number',
      group: 'dimensions',
      initialValue: 0,
    }),
  ],
})
