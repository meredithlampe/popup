import { ShareIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'share',
  title: 'Share',
  type: 'document',
  icon: ShareIcon,
  fields: [
    {name: 'types', title: 'Types', type: 'array', of: [
        {type: 'reference', to: [
            {type: 'productType'}, {type: 'editorialType'}, {type: 'topic'}
        ]
    }
    ]},
  ],
  preview: {
    select: {
      types: 'types',
    },
    prepare() {
      return {
        title: 'Share',
      }
    },
  },
})
