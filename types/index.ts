import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface TextLink {
  text: string
  link: Link
}
export interface ImageLink {
  image: Image
  link: Link
}

export interface CustomImage {
  alt?: string
  asset: {
    _ref: string
    _type: string
  }
  caption?: string
}

export interface Menu {
  menuItems: TextLink[]
}
export interface ImageLinkArray {
  items: ImageLink[]
}

export interface Submenu {
  title: string
  menu: Menu
}
export interface ImageSubmenu {
  title: string
  imageLinks: ImageLinkArray
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

export interface BlockText {
  _type: string
  content?: PortableTextBlock[]
}

export interface FullBleedImage {
  _type: string
  image?: Image
}

// make enum for carousel item types
export enum CarouselItemType {
  Image = 'image',
  ImageAndColor = 'imageAndColor',
  ImageAndColorTwoThirds = 'imageAndColorTwoThirds',
}

export enum CarouselTwoUpItemType {
  CarouselTwoUpItem = 'carouselTwoUpItem',
  Artist = 'artist',
  Product = 'product',
  Editorial = 'editorial',
}

export interface CarouselItemData {
  _type: string
  itemType: string
  image: Image
  color?: string // hex code without the "#"
  caption?: string
  text?: {
    content?: PortableTextBlock[]
  }
  textColorScheme?: 'black' | 'white'
  textBelow?: {
    content?: PortableTextBlock[]
  }
  link?: Link
}

export interface CarouselData {
  bgColor: string
  textColorScheme: 'black' | 'white'
  items: CarouselItemData[]
  text?: {
    content: PortableTextBlock[]
  }
}

export interface CarouselTwoUpItemData {
  image: CustomImage
  text: {
    content: PortableTextBlock[]
  }
  link: Link
}

export interface CarouselTwoUpData {
  bgColor: string
  textColorScheme: 'black' | 'white'
  items: (CarouselItemData | ArtistPayloadLite)[]
  text?: {
    content: PortableTextBlock[]
  }
}

export interface FlippedTextData {
  bgColor: string
  textColorScheme: 'black' | 'white'
  heading: string
  headingFlipped: string
  bodyText: {
    content: PortableTextBlock[]
  }
}

export interface TextAndImageData {
  bgColor: string
  textColorScheme: 'black' | 'white'
  text: {
    content: PortableTextBlock[]
  }
  image: CustomImage
  imageLayout: string
  imageStyle: string
}

export interface BlockTextData {
  bgColor: string
  textColorScheme: 'black' | 'white'
  content: {
    content: PortableTextBlock[]
  }
  image: CustomImage
  imageLayout?: 'left' | 'right'
}

export interface VideoAndTextData {
  bgColor: string
  textColorScheme: 'black' | 'white'
  text: {
    content: PortableTextBlock[]
  }
  title: string
  videoId: string
}

export interface QuoteData {
  bgColor: string
  textColorScheme: string
  content: {
    content: PortableTextBlock[]
  }
}

export interface EmailSubscribeData {
  bgColor: string
  textColorScheme: 'black' | 'white'
  heading: string
  placeholder: string
  bodyText: {
    content: PortableTextBlock[]
  }
  finePrint: {
    content: PortableTextBlock[]
  }
}

export interface Section {
  _type: string
  content?: BlockText | FullBleedImage | CarouselData | FlippedTextData
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  sections?: Section[]
  title?: string
}

export interface PagePayload {
  sections?: Section[]
  overview?: PortableTextBlock[]
  name?: string
  title?: string
  slug?: string
  type: string
  _type: string
}

export interface ArtistPagePayload {
  sections?: Section[]
  overview?: PortableTextBlock[]
  firstName: string
  lastName: string
  title?: string
  slug?: string
  type: string
  _type: string
}

export interface PagePayloadForLink extends PagePayload{
  artistSlug?: string
}

export interface ArtIndexPayload {
  overview?: PortableTextBlock[]
  sections?: Section[]
  featured: Array<ProductPayloadLite>
  header?: string
  gridDisruptors?: Array<ArtistPayloadLite | EditorialPayloadLite>
}

export interface DiscoverPayload {
  overview?: PortableTextBlock[]
  sections?: Section[]
  featured: Array<EditorialPayloadLite>
  header?: string
  gridDisruptors?: Array<ArtistPayloadLite | EditorialPayloadLite>
}

export interface ArtistsPayload {
  overview?: PortableTextBlock[]
  sections?: Section[]
  featured: Array<ArtistPayloadLite>
  header?: string
  gridDisruptors?: Array<ArtistPayloadLite | EditorialPayloadLite>
}

export interface Slug {
  current: string
}

export interface Page {
  name?: string
  title?: string
  slug?: string
  _type: string
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  site?: string
  slug: string
  tags?: string[]
  title?: string
}

export interface EmailSubscribeSettings {
  title: string
  contentAbove: { content: PortableTextBlock[] }
  contentBelow: { content: PortableTextBlock[] }
  finePrint: { content: PortableTextBlock[] }
  placeholder: string
}

export interface SettingsPayload {
  siteTitle?: string
  logo?: CustomImage
  announcementBanner: {
    text: string,
    link: Link
  }
  logoFooter?: CustomImage
  footer?: PortableTextBlock[]
  menuItems?: Array<TextLink>
  menusFooter: Array<Submenu>
  pressSubmenu: ImageSubmenu
  emailSubscribeSettings: EmailSubscribeSettings
  ogImage?: Image
  productPageShareLinks: Array<{
    icon: CustomImage
    linkPrefix: string
    shareText: string
  }>
}

export interface Link {
  _type: string
  url?: string
  page: PagePayloadForLink
  type: string
}

export interface TextLink {
  _type: string
  text: string
  link: Link
}

export interface Drawer {
  title: string
  content: {
    content: PortableTextBlock[]
  }
}

export interface ProductAdditionalInfo {
  headerBlurb: {
    content: PortableTextBlock[]
  }
  footerBlurb: {
    content: PortableTextBlock[]
  }
  drawers: Array<Drawer>
}

export interface ProductType {
  _type: string
  title: string
  slug: string
}

export interface EditorialType {
  _type: string
  title: string
  slug: string
}

export interface Topic {
  _type: string
  title: string
  slug: string
}

export interface ProductPayload {
  slug: string
  title: string
  artist: ArtistPayloadLite
  shopifyProductId: string
  editionSize: string
  description: PortableTextBlock[]
  status: {
    title: string
  }
  types: ProductType[]
  topics: Topic[]
  height?: number
  width?: number
  depth?: number
  price?: number
  yearCreated?: number
  featuredImage: CustomImage
  alternateImages?: CustomImage[]
  additionalInfo: any[]
  sections: Section[]
}

export interface ProductPayloadLite {
  _type: string
  slug: string
  title: string
  artist: ArtistPayloadLite
  featuredImage: CustomImage
  types: ProductType[]
}

export interface ArtistPayloadLite {
  _type: string
  firstName: string
  lastName?: string
  slug: string
  overview: PortableTextBlock[]
  featuredImage: CustomImage
  products: ProductPayloadLite[]
}

export interface ArtistPayload extends ArtistPayloadLite {
  sections: Section[]
}

export interface EditorialPayload {
  _type: string
  type: {
    title: string
  }
  title: string
  slug: string
  sections: Section[]
  creationDate: string
  creatorFirstName: string
  creatorLastName: string
  creatorTitle: string
  topics: Topic[]
  featuredImage: CustomImage
  shortSummary: {
    content: PortableTextBlock[]
  }
}

export interface EditorialPayloadLite {
  _type: string
  title: string
  slug: string
  featuredImage: CustomImage
  shortSummary: {
    content: PortableTextBlock[]
  }
}
