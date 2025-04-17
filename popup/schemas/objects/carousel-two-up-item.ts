import sanityCustomImage from '../../../lib/sanity.custom-image'
import { defineType } from 'sanity'

export default defineType({
  title: 'Custom Carousel Item',
  name: 'carouselTwoUpItem',
  type: 'object',
  fields: [
    sanityCustomImage({
      name: 'image',
      title: 'Image',
      validation: (Rule) => Rule.required(),
      description:
        'To be displayed on the left side of the carousel item on desktop, and as the full item on mobile.',
    }),
    {
      title: 'Link',
      name: 'link',
      type: 'link',
      validation: (Rule) => Rule.required(),
      description: 'Clicking the image will take the user to this link.',
    },
    {
      title: 'Text',
      name: 'text',
      type: 'customPortableText',
    },
  ],
  preview: {
    select: {
        text: 'text',
      image: 'image',
    },
    prepare({  image, text }) {
      return {
        title: 'Custom Carousel Item',
        media: image,
      }
    },
  },
})
