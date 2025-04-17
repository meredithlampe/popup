export const useCdn = false

/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

export const dataset = assertValue(
  'production',
  // process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
)

export const projectId = assertValue(
  '8bvk61rm',
  // process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const readToken = process.env.SANITY_API_READ_TOKEN || 'skVIcwLjZNu0cvz8xTJxo9pwlQTUwU2o1Ct6awAhVxky2sbMjE4jiRW4SO2iHP2LR5ipC32l5NTwLyQSTkE5KAjh42wDqZQkbPcOkHcCq6AKvks2DsRHffzqu8iFqTqx1Ee5WsuXXcGglib2b312O1fo0POKMcKbCjfboUSqKCQQU4xdkTJr'

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21'

// This is the document id used for the preview secret that's stored in your dataset.
// The secret protects against unauthorized access to your draft content and have a lifetime of 60 minutes, to protect against bruteforcing.
export const previewSecretId: `${string}.${string}` = 'preview.secret'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
