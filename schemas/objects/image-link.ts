import sanityCustomImage from 'lib/sanity.custom-image'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  title: 'Image Link',
  name: 'imageLink',
  type: 'object',
  fields: [
    sanityCustomImage({
      name: 'image',
      title: 'Image',
      description: 'The image to display',
    }),
    {
      title: 'Link',
      name: 'link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      image: 'image',
      link: 'link',
    },
    prepare({ image, link }) {
      return {
        media: image,
        title: link.url ? link.url : link.page.slug,
      }
    },
  },
})
