import { getArtistForProductQuery } from "./sanity.queries"

export function resolveHref(
  documentType?: string,
  slug?: string,
  artistSlug?: string,
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'project':
      return slug ? `/projects/${slug}` : undefined
    case 'product':
      return slug && artistSlug ? `/art/${artistSlug}/${slug}` : undefined
    case 'artIndex':
      return '/art'
    case 'editorial':
      return slug ? `/exhibitions-and-stories/${slug}` : undefined
    case 'artistsIndex':
      return '/artists'
    case 'artist':
      return slug ? `/artists/${slug}` : undefined
    case 'discover':
      return '/discover'
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

export function resolvePageTitle(
  pageType: string,
  pageTitle: string,
): string {
  switch (pageType) {
    case 'home':
      return 'Home'
    case 'page':
      return pageTitle
    case 'project':
      return pageTitle
    case 'product':
      return pageTitle
    case 'artIndex':
      return 'Art'
    case 'editorial':
      return pageTitle
    case 'artistsIndex':
      return 'Artists'
    case 'artist':
      return pageTitle
    case 'discover':
      return 'Discover'
    default:
      return pageTitle
  }
}

export function resolveHrefWithPlaceholderArtist(
  documentType?: string,
  slug?: string,
): string | undefined {
  if (documentType === 'product') {
    return resolveHref(documentType, slug, 'artist-slug')
  }
  return resolveHref(documentType, slug)
}

export async function resolveHrefForSanityPreview(
  documentType?: string,
  slug?: string,
  client: any,
): Promise<string | undefined> {
  if (documentType === 'product') {
    const product = await client.fetch(getArtistForProductQuery(slug ?? ''))
    return resolveHref(documentType, slug, product.artist?.slug)
  }
  return resolveHref(documentType, slug)
}