'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import {media} from 'sanity-plugin-media'

// import {FaCar} from 'react-icons/fa'
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './env'
import { schema } from './schema'
import home from './schemas/singletons/home'
import page from './schemas/documents/page'
import Iframe, { defineUrlResolver, IframeOptions } from 'sanity-plugin-iframe-pane'
import {previewUrl} from 'sanity-plugin-iframe-pane/preview-url'
import { previewSecretId } from '../lib/sanity.api'
// import product from '../schemas/documents/product'

export const PREVIEWABLE_DOCUMENT_TYPES: string[] = [home.name, page.name]
const PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS = [
  page.name,
  // product.name
] satisfies typeof PREVIEWABLE_DOCUMENT_TYPES
// Used to generate URLs for drafts and live previews
export const PREVIEW_BASE_URL = 'https://popup.vercel.app/api/draft'

// Customise this function to show the correct URL based on the current document and the current studio perspective
// const getPreviewUrl: UrlResolver = (doc, perspective) => {
//   return PREVIEW_BASE_URL + `?type=${doc._type}&slug=${doc.slug?.current}`
// }

export const iframeOptions = {
  url: defineUrlResolver({
    base: PREVIEW_BASE_URL,
    requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
  }),
  // url: getPreviewUrl,
  urlSecretId: previewSecretId,
  reload: {button: true},
} satisfies IframeOptions

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    structureTool(
      // Define structure of project folder and pages folder
      // https://www.sanity.io/docs/structure-builder-introduction
      {
        name: 'site-content',
        title: 'Site Content',
        structure: (S) =>
          S.list()
            .title('Site Content')
            .items([
              // S.documentTypeItem('home').title('Home'),
              S.listItem()
                .id('home')
                .schemaType('home')
                .title('Home')
                .child(
                    S.document().schemaType('home').views([
                    // Default form view
                    S.view.form(),
                    // Preview
                    S.view.component(Iframe).options(iframeOptions).title('Preview'),
                ])
              ),
              S.divider(),
              S.documentTypeListItem('product').title('Products'),
              S.documentTypeListItem('page').title('Pages'),
              S.divider(),
              S.documentTypeListItem('discover').title('Discover'),
              S.documentTypeListItem('artIndex').title('Art Index'),
              S.divider(),
              S.documentTypeListItem('productType').title('Product Types'),
              S.divider(),
              S.listItem()
                .id('settings')
                .schemaType('settings')
                .title('Settings')
                .child(
                  S.editor()
                    .id('settings')
                    .title('Settings')
                    .schemaType('settings')
                    .documentId('settings'),
                ),
            ]),
                  
            // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
            // You can add any React component to `S.view.component` and it will be rendered in the pane
            // and have access to content in the form in real-time.
            // It's part of the Studio's “Structure Builder API” and is documented here:
            // https://www.sanity.io/docs/structure-builder-reference
            defaultDocumentNode: (S, {schemaType}) => {
              if ((PREVIEWABLE_DOCUMENT_TYPES as string[]).includes(schemaType)) {
                return S.document().views([
                  // Default form view
                  S.view.form(),
                  // Preview
                  S.view.component(Iframe).options(iframeOptions).title('Preview'),
                ])
              }

              return null
            },
      },
    ),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    vercelDeployTool(),
    previewUrl({
      base: PREVIEW_BASE_URL,
      requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
      urlSecretId: previewSecretId,
      matchTypes: PREVIEWABLE_DOCUMENT_TYPES,
    }),
    media(),
  ],
})

// const title =
//   process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
//   'Next.js / Sanity v3'

// export const PREVIEWABLE_DOCUMENT_TYPES: string[] = [
//   home.name,
//   page.name,
//   project.name,
// ]
// const PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS = [
//   page.name,
//   project.name,
// ] satisfies typeof PREVIEWABLE_DOCUMENT_TYPES
// // Used to generate URLs for drafts and live previews
// export const PREVIEW_BASE_URL = '/api/draft'
// export const HIDDEN_DOCUMENT_TYPES: string[] = [
//   'blockText',
//   'fullBleedImage',
// ]

// export const iframeOptions = {
//   url: defineUrlResolver({
//     base: PREVIEW_BASE_URL,
//     requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
//   }),
//   urlSecretId: previewSecretId,
//   reload: { button: true },
// } satisfies IframeOptions

//   plugins: [
//     deskTool({
//       structure: pageStructure([home, settings]),
//       // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
//       // You can add any React component to `S.view.component` and it will be rendered in the pane
//       // and have access to content in the form in real-time.
//       // It's part of the Studio's “Structure Builder API” and is documented here:
//       // https://www.sanity.io/docs/structure-builder-reference
//       defaultDocumentNode: (S, { schemaType }) => {
//         if ((PREVIEWABLE_DOCUMENT_TYPES as string[]).includes(schemaType)) {
//           return S.document().views([
//             // Default form view
//             S.view.form(),
//             // Preview
//             S.view.component(Iframe).options(iframeOptions).title('Preview'),
//           ])
//         }

//         return null
//       },
//     }),
//     // Configures the global "new document" button, and document actions, to suit the Settings document singleton
//     singletonPlugin([home.name, settings.name]),
//     // Add the "Open preview" action
//     previewUrl({
//       base: PREVIEW_BASE_URL,
//       requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
//       urlSecretId: previewSecretId,
//       matchTypes: PREVIEWABLE_DOCUMENT_TYPES,
//     }),
//     // Add an image asset source for Unsplash
//     unsplashImageAsset(),
//     // Vision lets you query your content with GROQ in the studio
//     // https://www.sanity.io/docs/the-vision-plugin
//     visionTool({ defaultApiVersion: apiVersion }),
//     vercelDeployTool(),
//   ],
// })
