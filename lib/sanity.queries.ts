import { groq } from 'next-sanity'
import { getClient } from './sanity.client'
import { ProductPayloadLite } from 'types'

// === common objects ===

export const pageImpl = groq`
    id,
    "type": _type,
    seo,
    _type,
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
`

export const link = groq`
    _type,
    type,
    url,
    page->{
      ${pageImpl}
      _type == 'product' => {
        "artistSlug": artist->slug.current
      }
    },
    underlineStyle
`
// "alt": coalesce(alt, asset->altText),
export const imageMeta = groq`
  alt,
  "assetAlt": asset->altText,
  asset,
  caption,
  crop,
  customRatio,
  clipPath,
  hotspot,
  "id": asset->assetId,
  "type": asset->mimeType,
  "aspectRatio": asset->metadata.dimensions.aspectRatio,
  "lqip": asset->metadata.lqip
`

const markDefLink = groq`
    _type == "link" => {
      "url": @.url,
      "isButton": @.isButton,
      "styles": @.styles{style, isLarge, isBlock},
      "page":@.page->{
        ${pageImpl}
      }
    },
`
const markDefArrowLink = groq`
    _type == "arrowLink" => {
      "url": @.url,
      "page":@.page->{
        ${pageImpl}
      }
    },
`

export const ptContentImpl = groq`
    ...,
    markDefs[]{
      ...,
      ${markDefLink}
      ${markDefArrowLink}
    }
`

export const ptContent = groq`
  content[]{
    ${ptContentImpl},
    _type == 'button' => {
      ...,
      "page":@.page->{
        ${pageImpl}
      }
    },
  },
`

export const productType = groq`
      _type,
      title,
      "slug": slug.current
`

export const topic = groq`
    _type,
    title,
    "slug": slug.current
`

export const editorialType = groq`
      _type,
      title,
      "slug": slug.current,
`

// == documents lite ===

export const productLite = groq`
    _type,
    title,
    "slug": slug.current,
    price,
    types[]->{
      ${productType}    
    },
    topics[]->{
      ${topic}
    },
    artist->{
      _type,
      title,
      firstName,
      lastName,
      "slug": slug.current,
    },
    featuredImage{
      ${imageMeta}
    }
`

export const artistLite = groq`
  _type,
  "slug": slug.current,
  firstName,
  lastName,
  featuredImage{
    ${imageMeta}
  },
  overview[]{
    ${ptContentImpl}
  },
  products[]->{
    ${productLite}
  }
`


//  === documents === 

export const editorialLite = groq`
  _type,
  type->{
    title
  },
  title,
  "slug": slug.current,
  creationDate,
  creatorFirstName,
  creatorLastName,
  creatorTitle,
  topics[]->{
    ${topic}
  },
  shortSummary{
    ${ptContent}
  },
  metadata{
    ${ptContent}
  },
  featuredImage{
    ${imageMeta}
  },
`

//  === documents ===

export const sectionBgFields = groq`
  bgColor,
  textColorScheme
`

export const carouselItem = groq`
    itemType,
    image{
      ${imageMeta}
    },
    color,
    caption,
    text{
      ${ptContent}
    },
    textColorScheme, // for text on color
    textBelow{
      ${ptContent}
    },
    link{
      ${link}
    }
`

export const emailSubscribe = groq`
  ${sectionBgFields},
  heading,
  placeholder,
  bodyText{
    ${ptContent}
  },
  finePrint{
    ${ptContent}
  }
`

export const carouselTwoUpItem = groq`
    image{
      ${imageMeta}
    },
    text{
      ${ptContent}
    },
    link{
      ${link}
    }
`

// not finished
export const carouselTwoUpSection = groq`
    ${sectionBgFields},
    text{
      ${ptContent}
    },
    items[]{
      _type == 'carouselTwoUpItem' => {
        _type,
        ${carouselTwoUpItem}
      },
      _type == 'reference' => @->{
        _type == 'artist' => {
          ${artistLite}
        },
        _type == 'product' => {
          ${productLite}
        },
        _type == 'editorial' => {
          ${editorialLite}
        }
      }
    }
`

export const flippedText = groq`
    ${sectionBgFields},
    heading,
    headingFlipped,
    bodyText{
      ${ptContent}
    }
`

export const textAndImageSection = groq`
    ${sectionBgFields},
    text{
      ${ptContent}
    },
    image{
      ${imageMeta}
    },
    imageLayout,
    imageStyle
`

export const quoteSection = groq`
  ${sectionBgFields},
  content{
    ${ptContent}
  }
`

export const videoAndTextSection = groq`
  ${sectionBgFields},
  title,
  text{
    ${ptContent}
  },
  embedCode,
  videoId
`
// old mux fields
  // video{
  //   asset->{
  //     playbackId,
  //     assetId,
  //     filename,
  //   }
  // }

export const blockTextSection = groq`
  ${sectionBgFields},
  content{
    ${ptContent}
  },
  image{
    ${imageMeta}
  },
  imageLayout
`

// Construct our content "sections" GROQ
export const sections = groq`
  _type,
  bgColor,
  _type == 'blockText' => {
    ${blockTextSection}
  },
  _type == 'fullBleedImage' => {
    photo{
      ${imageMeta}
    },
    text{
        ${ptContent}
    }
  },
  _type == 'carousel' => {
    ${sectionBgFields},
    items[]{
      ${carouselItem}
    }
  },
  _type == 'carouselTwoUp' => {
    ${carouselTwoUpSection}
  },
  _type == 'flippedText' => {
    ${flippedText} 
  },
  _type == 'textAndImage' => {
    ${textAndImageSection}
  },
  _type == 'emailSubscribe' => {
    ${emailSubscribe}
  },
  _type == 'quote' => {
    ${quoteSection}
  },
  _type == 'videoAndText' => {
   ${videoAndTextSection}
  },
   _type == 'share' => {
    types[]->{
      ${productType}, // same fields as editorial type
    }
  }
  `
export const artistPage = groq`
  ${artistLite},
  sections[]{
    ${sections}
  }
`

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    footer,
    overview,
    sections[]{
      ${sections}
    },
    title,
  }
`
export const product = groq`
    ${productLite},
    _createdAt,
    status->{
      title
    },
    shopifyProductId,
    editionSize,
    description[]{
      ${ptContentImpl}
    },
    height,
    width,
    depth,
    yearCreated,
    artist->{
      ${artistLite}
    },
    alternateImages[]{
      ${imageMeta}
    },
    additionalInfo{
      headerBlurb {
        ${ptContent}
      },
      footerBlurb {
        ${ptContent}
      },
      drawers[]{
        title,
        content{
          ${ptContent}
        }
      }
    },
    sections[]{
      ${sections}
    }
`

export const editorialQuery = groq`
  ${editorialLite}
  sections[]{
    ${sections}
  },
`

export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
    sections[]{
      ${sections}
    }
  }
`

export const editorialBySlugQuery = groq`
  *[_type == "editorial" && slug.current == $slug][0] {
    ${editorialQuery}
  }
`

export const artistPageBySlugQuery = groq`
  *[_type == "artist" && slug.current == $slug][0]{
    ${artistPage}
  }
`

export const indexPageQueryImpl = groq`
    header,
    overview,
    featured[]->{
      _type == 'artist' => {
        ${artistLite}
      },
      _type == 'product' => {
        ${productLite} 
      },
      _type == 'editorial' => {
        ${editorialLite}
      }
    },
    sections[]{
      ${sections}
    },
    gridDisruptors[]->{
      _type == 'artist' => {
        ${artistLite}
      },
      _type == 'editorial' => {
        ${editorialLite}
      }
    }
`

export const artIndexQuery = groq`
  *[_type == "artIndex"][0]{
    ${indexPageQueryImpl}
  }
`

export const discoverPageQuery = groq`
  *[_type == "discover"][0]{
    ${indexPageQueryImpl}
  }
`

export const artistsPageQuery = groq`
  *[_type == "artistsIndex"][0]{
    ${indexPageQueryImpl}
  }
`

export const artistNamesQuery = groq`
  *[_type == "artist"] | order(lastName asc, firstName asc) {
    firstName,
    lastName,
    "slug": slug.current
  }
`

export const productTypesQuery = groq`
  *[_type == "productType"] | order(title asc){
    ${productType}
  }
`

export const editorialTypesQuery = groq`
  *[_type == "editorialType"] | order(title asc){
    ${editorialType}
  }
`

export const topicsQuery = groq`
  *[_type == "topic"] | order(title asc){
    ${topic}
  }
`

const getArtistSlugFilter = (artistSlugs: string[]) => {
  if (artistSlugs.length > 0) {
    return ` && artist->slug.current in ${JSON.stringify(artistSlugs)}`
  }
  return ''
}

const getTypesFilter = (types: string[]) => {
  if (types.length > 0) {
    return ` && count((types[]->slug.current)[@ in ${JSON.stringify(types)}]) > 0
      `
  }
  return ''
}

const getTopicsFilter = (topics: string[]) => {
  if (topics.length > 0) {
    return ` && count((topics[]->slug.current)[@ in ${JSON.stringify(topics)}]) > 0
  `
  }
  return ''
}

const getPricesFilter = (prices: string[]) => {
  if (prices.length > 0) {
    let condition = '('
    for (let priceIndex in prices) {
      const price = prices[priceIndex]
      let [priceLower, priceUpper] = price.split('-')
      let currentCondition = `${condition.length > 1 ? ' || ' : ''}(`
      if (priceLower) {
        currentCondition += `price >= ${priceLower}`
      }
      if (priceUpper) {
        if (priceLower) {
          currentCondition += ' && '
        }
        currentCondition += `price <= ${priceUpper}`
      }
      currentCondition += ')'
      condition += currentCondition
    }
    return ` && ${condition})`
  }
  return ''
}

const getSizesFilter = (sizes: string[]) => {
  if (sizes.length > 0) {
    let condition = '('
    for (let sizeIndex in sizes) {
      const size = sizes[sizeIndex]
      let [sizeLower, sizeUpper] = size.split('-')
      let currentCondition = `${condition.length > 1 ? ' || ' : ''}(`
      if (sizeLower) {
        currentCondition += `((height * width >= ${sizeLower}) || (height * depth >= ${sizeLower}) || (width * depth >= ${sizeLower}))`
      }
      if (sizeUpper) {
        if (sizeLower) {
          currentCondition += ' && '
        }
        currentCondition += `((height * width <= ${sizeUpper}) && (height * coalesce(depth, 0) <= ${sizeUpper}) && (width * coalesce(depth, 0) <= ${sizeUpper}))`
      }
      currentCondition += ')'
      condition += currentCondition
    } 
    return ` && ${condition})`
  }
  return ''
}

export function getArtistForProductQuery(productSlug: string) {
  const query = groq`
    *[_type == "product" && slug.current == "${productSlug}"][0]{
      artist->{
        ${artistLite}
      },
    }
  `
  return query
}



export function getProductGridQuery(
  sort: string,
  artistSlugs: string[],
  types: string[],
  topics: string[],
  prices: string[],
  sizes: string[],
  showPerPage: number,
  pageNum: number,
  featured: ProductPayloadLite[]
) {

  let filters = ''
  // if featured is not empty, add a filter to exclude the featured products
  if (featured.length > 0) {
    filters += ` && !(slug.current in ${JSON.stringify(featured.map(product => product.slug))})`
  }
  // if we're on the first page and sorting by featured, we need to subtract the number of featured products from the number of products to show
  // otherwise, all featured products will have been shown on the first page and we can show the full amount on other pages.
  // we do still need to account for showing the featured products on the first page, so we need to increase the start index by the number of featured products
  if (sort == 'featured' && pageNum == 1) {
    showPerPage -= featured.length
  }
  let startIndex = showPerPage * (pageNum - 1) - (sort == 'featured' && pageNum != 1 ? featured.length : 0)
  let endIndex = showPerPage * pageNum - (sort == 'featured' && pageNum != 1 ? featured.length : 0)
  const productIndexRange = `[${startIndex}...${endIndex}]`

  filters += getArtistSlugFilter(artistSlugs)
  filters += getTypesFilter(types) 
  filters += getTopicsFilter(topics)
  filters += getPricesFilter(prices)
  filters += getSizesFilter(sizes)

  if (sort == 'newest') {
    sort = '_createdAt desc'
  } else if (sort == 'priceAscending') {
    sort = 'price asc'
  } else if (sort == 'priceDescending') {
    sort = 'price desc'
  } else {
    sort = '_createdAt desc'
  }

  const query = groq`
    *[_type == "product"${filters}] | order(${sort})${productIndexRange}{
      ${product}
    }
  `
  return query
}

export function getProductCountQuery(
  artistSlugs: string[],
  types: string[],
  topics: string[],
  prices: string[],
  sizes: string[],
) {

  let filters = ''
  filters += getArtistSlugFilter(artistSlugs)
  filters += getTypesFilter(types) 
  filters += getTopicsFilter(topics)
  filters += getPricesFilter(prices)
  filters += getSizesFilter(sizes)

  const query = groq`
    count(*[_type == "product"${filters}])
  `
  return query
}

export function getEditorialGridQuery(
  sort: string,
  types: string[],
  topics: string[],
  showPerPage: number,
  pageNum: number,
) {
  if (sort == 'oldest') {
    sort = '_createdAt asc'
  } else {
    sort = '_createdAt desc'
  }

  let filters = ''
  if (types.length > 0) {
    filters += ` && type->slug.current in ${JSON.stringify(types)}
      `
  }
  if (topics.length > 0) {
    filters += ` && count((topics[]->slug.current)[@ in ${JSON.stringify(topics)}]) > 0
  `
  }

  const editorialIndexRange = `[${showPerPage * (pageNum - 1)}...${showPerPage * pageNum}]`
  const query = groq`
    *[_type == "editorial"${filters}] | order(${sort})${editorialIndexRange}{
      ${editorialLite}
    }
  `
  return query
}

export function getEditorialCountQuery(
  types: string[],
  topics: string[],
) {

  let filters = ''
  if (types.length > 0) {
    filters += ` && type->slug.current in ${JSON.stringify(types)}
      `
  }
  if (topics.length > 0) {
    filters += ` && count((topics[]->slug.current)[@ in ${JSON.stringify(topics)}]) > 0
  `
  }

  const query = groq`
    count(*[_type == "editorial"${filters}])
  `
  return query
}

export function getArtistsGridQuery(
  sort: string,
  types: string[],
  topics: string[],
) {
  if (sort == 'alphabetical_asc') {
    sort = 'lastName asc'
  } else if (sort == 'newest') {
    sort = '_createdAt desc'
  } else {
    sort = 'lastName desc'
  }

  let filters = ''
  if (types.length > 0) {
    filters += ` && type->slug.current in ${JSON.stringify(types)}
      `
  }
  if (topics.length > 0) {
    filters += ` && count((topics[]->slug.current)[@ in ${JSON.stringify(topics)}]) > 0
  `
  }

  const query = groq`
    *[_type == "artist"${filters}] | order(${sort}){
      ${artistLite}
    }
  `
  return query
}

export const productBySlugAndArtistQuery = groq`
*[_type == "product" && slug.current == $slug && artist->slug.current == $artistSlug][0] {
  ${product}
  }`

export const project = groq`
id,
"type": _type,
seo,
_type,
backgroundColor,
_id,
body,
overview,
title,
"slug": slug.current,
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${project}
  }
`

export const projectPaths = groq`
  *[_type == "project" && slug.current != null].slug.current
`

export const pagePaths = groq`
  *[_type == "page" && slug.current != null].slug.current
`

export const productPaths = groq`
  *[_type == "product" && slug.current != null && artist->slug.current != null]{
    "slug": slug.current,
    "artistSlug": artist->slug.current
  }
`
export const editorialPaths = groq`
  *[_type == "editorial" && slug.current != null]{
    "slug": slug.current,
  }
`

export const artistPaths = groq`
  *[_type == "artist" && slug.current != null]{
    "slug": slug.current,
  }
`


export const textLink = groq`
    text,
    link {
      ${link}
    }
`

export const imageLink = groq`
    image{
      ${imageMeta}
    },
    link {
      ${link}
    }
`
// from color-input plugin
// https://www.sanity.io/plugins/color-input
export const color = groq`
  alpha,
  hex,
  hsl,
  hsv,
  rgb,
  _type,
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    siteTitle,
    logo{
      ${imageMeta}
    },
    announcementBanner{
      text,
      link{
        ${link}
      }
    },
    logoFooter{
      ${imageMeta}
    },
    menuItems[]{
      ${textLink}
    },
    menusFooter[]{
      title,
      menu{
        menuItems[]{
          ${textLink}
        }
      }
    },
    pressSubmenu{
      title,
      imageLinks{
        items[]{
          ${imageLink}
        }
      }
    },
    emailSubscribeSettings{
      title,
      contentAbove{
        ${ptContent}
      },
      placeholder,
      finePrint{
        ${ptContent}
      },
      contentBelow{
        ${ptContent}
      }
    },
    socialLinks[]{
      ${imageLink}
    },
    ogImage,
    productPageShareLinks[]{
      icon{
        ${imageMeta}
      },
      linkPrefix,
      shareText
    }
  }
`

// Fetch all dynamic docs
export async function getAllDocSlugs(doc) {
  const data = await getClient().fetch(
    `*[_type == "${doc}" && wasDeleted != true && isDraft != true]{ "slug": slug.current }`,
  )
  return data
}
