export const useCdn = false

/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

export const dataset = assertValue(
  // 'production',
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const readToken = process.env.SANITY_API_READ_TOKEN || 'skIkLUXNlzpcgQQWKXCXhDb3kegoWtW5PEJBszO11dVmRJu23ukuAUe16I05OM6ZITD6iOmQZxBnOS5Pmgf1R8UG5sRjnqYqQd9AtWpHMvKL6Q4kTc1Nh4Ux8p1hxv8eIaoJGz9MmoCbGvFnXmFFfEfp28q8kvGAW59eLKuLUfzoG7A9PtTu'

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
