export default ({ hasDisplayOptions = false, hasOptionalCaption = false, ...props } = {}) => {
  const crops = [
    { title: 'Original', value: 0 },
    { title: '1 : 1 (square)', value: 1 },
    { title: '5 : 7', value: 0.7142857143 },
    { title: '4 : 6', value: 0.6666666667 },
    { title: '16 : 9', value: 1.7777777778 },
  ]

  return {
    title: 'Photo',
    name: 'photo',
    type: 'image',
    options: {
      hotspot: true,
    },
    fields: [
      ...(hasDisplayOptions
        ? [
            {
              title: 'Display Size (aspect ratio)',
              name: 'customRatio',
              type: 'number',
              options: {
                isHighlighted: true,
                list: crops,
              },
              validation: (Rule) => {
                return Rule.custom((field, context) =>
                  'asset' in context.parent && field === undefined
                    ? 'Required!'
                    : true,
                )
              },
            },
          ]
        : []),
      {
        title: 'Alternative text',
        name: 'alt',
        type: 'string',
        description: 'Important for SEO and accessiblity.',
      },
      ...(hasOptionalCaption ?
        [{
        title: 'Caption',
        name: 'caption',
        type: 'string',
        description: 'Optional caption for the photo.',
        }] : []
      )
    ],
    preview: {
      select: {
        asset: 'asset',
        alt: 'asset.alt',
        customAlt: 'alt',
        customRatio: 'customRatio',
        shape: 'clipPath',
      },
      prepare(photo) {
        const { alt, customAlt } = photo

        return {
          title: customAlt,
          media: photo,
        }
      },
    },
    ...props,
  }
}
