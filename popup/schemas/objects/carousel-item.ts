import sanityCustomImage from '../../../lib/sanity.custom-image'
import { defineType } from 'sanity'

export default defineType({
  title: 'Carousel Item',
  name: 'carouselItem',
  type: 'object',
  fields: [
    {
      title: 'Carousel Item Type',
      name: 'itemType',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Image & Color (50/50)', value: 'imageAndColor' },
          { title: 'Image & Color (66/33)', value: 'imageAndColorTwoThirds' },
        ],
      },
    },
    sanityCustomImage({
      name: 'image',
      title: 'Image',
      description:
        'To be displayed on the left side of the carousel item on desktop, and as the full item on mobile.',
    }),
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
    },
    {
      title: 'Text (Below Carousel)',
      name: 'textBelow',
      type: 'customPortableText',
      description: 'Shown underneath carousel',
    },
    {
      title: 'Color',
      name: 'color',
      type: 'string',
      hidden: ({ parent }) => parent.itemType === 'image',
      description:
        'Hex code. Color is displayed on the right side of the carousel item on desktop, not visible on mobile.',
    },
    {
      title: 'Text (On Color)',
      name: 'text',
      type: 'customPortableText',
      hidden: ({ parent }) => parent.itemType === 'image',
      description: 'Shown as an overlay on color section',
    },
    {
      title: 'Text (On Color) Color Scheme',
      name: 'textColorScheme',
      type: 'string',
      hidden: ({ parent }) => parent.itemType === 'image',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Black', value: 'black' },
        ],
      },
      initialValue: 'black',
    },
    {
      title: 'Link',
      name: 'link',
      type: 'link',
      description: 'Link for clicking on this image in the carousel'
    }
  ],
  preview: {
    select: {
      itemType: 'itemType',
      image: 'image',
    },
    prepare({ itemType, image }) {
      return {
        title: itemType === 'image' ? 'Image' : 'Image & Color',
        media: image,
      }
    },
  },
})
