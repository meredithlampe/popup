import { CogIcon } from '@sanity/icons'
import sanityCustomImage from 'lib/sanity.custom-image'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  groups: [
    { name: 'header', title: 'Header' },
    { name: 'footer', title: 'Footer' },
    { name: 'productPage', title: 'Product Page' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description:
        'Shown as a prefix on all page tabs, i.e. "Site Title | Page Title"',
      validation: (rule) => rule.required(),
    }),
    // site logo
    defineField({
      name: 'announcementBanner',
      title: 'Announcement Banner',
      type: 'object',
      group: 'header',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
          description: 'Displayed in the announcement banner.',
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
          description: 'Link for the announcement banner.',
        }),
      ]
    }),
    sanityCustomImage({
      name: 'logo',
      description: 'Displayed in the header of your site.',
      title: 'Site Logo (Header)',
      group: 'header',
    }),
    sanityCustomImage({
      name: 'logoFooter',
      title: 'Site Logo (Footer)',
      description: 'Displayed in the footer of your site.',
      group: 'footer',
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Item list (Header)',
      description: 'Links displayed on the header of your site.',
      type: 'array',
      group: 'header',
      of: [
        {
          title: 'Text Link',
          name: 'textLink',
          type: 'textLink',
        },
      ],
    }),
    defineField({
      name: 'menusFooter',
      title: 'Submenu List (Footer)',
      description: 'List of menus displayed in the footer of your site.',
      type: 'array',
      group: 'footer',
      of: [
        {
          title: 'Submenu',
          name: 'submenu',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ type: 'menu', name: 'menu', title: 'Menu' }),
          ],
        },
      ],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'pressSubmenu',
      title: 'Press Submenu',
      description: 'List of press links displayed in the footer of your site.',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({
          type: 'imageLinkArray',
          name: 'imageLinks',
          title: 'Image Links',
        }),
      ],
      group: 'footer',
    }),
    defineField({
      name: 'emailSubscribeSettings',
      title: 'Email Subscribe',
      description:
        'Settings for the email subscribe form and surrounding content',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      group: 'footer',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'Displayed above the email subscribe form.',
        }),
        defineField({
          name: 'contentAbove',
          title: 'Content Above',
          type: 'customPortableText',
          description:
            'Displayed below the title and above the email subscribe form.',
        }),
        defineField({
          name: 'placeholder',
          title: 'Input Placeholder',
          type: 'string',
          description: 'Text displayed in the email input field.',
        }),
        defineField({
          name: 'finePrint',
          title: 'Fine Print (Below)',
          type: 'customPortableText',
          description: 'Fine print displayed below the sign up button.',
        }),
        defineField({
          name: 'contentBelow',
          title: 'Content Below',
          type: 'customPortableText',
          description: 'Displayed below the fine print',
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'productPageShareLinks',
      title: 'Product Page Share Links',
      type: 'array',
      group: 'productPage',
      of: [
        {
          type: 'object',
          fields: [
            sanityCustomImage({
              name: 'icon',
              title: 'Icon',
              description: 'Social media icon',
            }),
            defineField({
              name: 'linkPrefix',
              title: 'Link Prefix',
              type: 'string',
            }),
            defineField({
              name: 'shareText',
              title: 'Share Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'overview',
      description: 'Used for the <meta> description tag for SEO. Pages without their own SEO description will use this.',
      title: 'Overview',
      type: 'array',
      group: 'seo',
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
    prepare() {
      return {
        title: 'Menu Items',
      }
    },
  },
})
