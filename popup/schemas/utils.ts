import { defineArrayMember } from 'sanity'

export const ALL_SECTION_TYPES = [
  defineArrayMember({
    type: 'blockText',
  }),
  defineArrayMember({
    type: 'carousel',
  }),
  defineArrayMember({
    type: 'carouselTwoUp',
  }),
  defineArrayMember({
    type: 'flippedText',
  }),
  defineArrayMember({
    type: 'textAndImage',
  }),
  defineArrayMember({
    type: 'emailSubscribe',
  }),
  defineArrayMember({
    type: 'quote',
  }),
  defineArrayMember({
    type: 'videoAndText',
  }),
  defineArrayMember({
    type: 'share',
  }),
]

export const ALL_PAGE_TYPES = [
  defineArrayMember({
    type: 'page',
  }),
  defineArrayMember({
    type: 'home',
  }),
  defineArrayMember({
    type: 'product',
  }),
  defineArrayMember({
    type: 'editorial',
  }),
]

export const BG_FIELD = {
  title: 'Background Color',
  name: 'bgColor',
  type: 'string',
  description: 'Section background color (hex code)',
}
export const TEXT_COLOR_SCHEME_FIELD = {
  title: 'Text Color Scheme',
  name: 'textColorScheme',
  type: 'string',
  options: {
    list: [
      { title: 'White', value: 'white' },
      { title: 'Black', value: 'black' },
    ],
  },
  initialValue: 'black',
}

export const LINK_FIELDS = [
  {
    title: 'Link Type',
    name: 'type',
    type: 'string',
    options: {
      list: [
        { title: 'Internal Page', value: 'internal' },
        { title: 'External URL', value: 'external' },
      ],
    },
    initialValue: 'internal',
    validation: (Rule) => Rule.required(),
  },
  {
    title: 'Page',
    name: 'page',
    type: 'reference',
    to: ALL_PAGE_TYPES,
    options: {
      disableNew: true,
    },
    hidden: ({ parent }) => parent?.type !== 'internal',
  },
  {
    title: 'URL',
    name: 'url',
    type: 'url',
    validation: (Rule) =>
      Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel'],
      }),
    hidden: ({ parent }) => parent?.type !== 'external',
  },
]
