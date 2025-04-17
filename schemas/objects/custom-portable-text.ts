import { ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { H1, H2, H3, H3Light, H4, H5, SmallText } from 'schemas/PortableTextStyles'
import { LINK_FIELDS } from 'schemas/utils'

export default defineType({
  name: 'customPortableText',
  title: 'Custom Portable Text',
  type: 'object',
  fields: [
    defineField({
      type: 'array',
      name: 'content',
      title: 'Content',
      of: [
        // Paragraphs
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                fields: [
                  ...LINK_FIELDS, 
                  {
                    title: 'Underline Style',
                    name: 'underlineStyle',
                    type: 'string',
                    options: {
                      list: [
                        { title: 'Underline', value: 'underline' },
                        { title: 'No Underline', value: 'no-underline' },
                      ],
                    },
                    defaultValue: 'underline',
                  }
                ],
              },
              {
                name: 'arrowLink',
                type: 'object',
                fields: LINK_FIELDS,
              },
            ],
          },
          styles: [
            { title: 'H1', value: 'h1', component: H1 },
            { title: 'H1-style Div', value: 'h1StyleDiv', component: H1 },
            { title: 'H2', value: 'h2', component: H2 },
            { title: 'H3', value: 'h3Light', component: H3Light },
            { title: 'H3 (Bold)', value: 'h3', component: H3 },
            { title: 'H4', value: 'h4', component: H4 },
            {title: 'H4 (Bold)', value: 'h4Bold', component: H4},
            {title: 'H5', value: 'h5', component: H5 },
            {title: 'Small Text', value: 'smallText', component: SmallText},
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'button',
          title: 'Button',
          fields: [
            {
              title: 'Color Scheme',
              name: 'colorScheme',
              type: 'string',
              options: {
                list: [
                  { title: 'Light', value: 'light' },
                  { title: 'Dark', value: 'dark' },
                ],
              },
            },
            {
              title: 'Text',
              name: 'text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            ...LINK_FIELDS,
          ],
          preview: {
            select: {
              text: 'text',
            },
            prepare({ text }) {
              return {
                title: 'Button',
                subtitle: text,
              }
            },
          },
        }),
      ],
    }),
  ],
})
