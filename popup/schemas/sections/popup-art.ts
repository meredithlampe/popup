import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'popupArt',
  title: 'Popup Art',
  type: 'document',
  fields: [
    defineField({
      name: 'frequency',
      title: 'Popup Frequency (seconds)',
      description: 'How often new popups should appear (in seconds)',
      type: 'number',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(10),
    }),
  ],
  preview: {
    select: {
      frequency: 'frequency',
    },
    prepare({ frequency }) {
      return {
        title: 'Popup Art',
        subtitle: `New popup every ${frequency} seconds`,
      }
    },
  },
}) 