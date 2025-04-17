import { type SchemaTypeDefinition } from 'sanity'
import artist from 'schemas/documents/artist'
import editorial from 'schemas/documents/editorial'
import editorialType from 'schemas/documents/editorial-type'
import page from 'schemas/documents/page'
import product from 'schemas/documents/product'
import productStatus from 'schemas/documents/product-status'
import productType from 'schemas/documents/product-type'
import topic from 'schemas/documents/topic'
import carouselItem from 'schemas/objects/carousel-item'
import carouselTwoUpItem from 'schemas/objects/carousel-two-up-item'
import customPortableText from 'schemas/objects/custom-portable-text'
import imageLink from 'schemas/objects/image-link'
import imageLinkArray from 'schemas/objects/image-link-array'
import link from 'schemas/objects/link'
import menu from 'schemas/objects/menu'
import textLink from 'schemas/objects/text-link'
import blockText from 'schemas/sections/block-text'
import carousel from 'schemas/sections/carousel'
import carouselTwoUp from 'schemas/sections/carousel-two-up'
import emailSubscribe from 'schemas/sections/email-subscribe'
import flippedText from 'schemas/sections/flipped-text'
import fullBleedImage from 'schemas/sections/full-bleed-image'
import quote from 'schemas/sections/quote'
import share from 'schemas/sections/share'
import textAndImage from 'schemas/sections/text-and-image'
import videoAndText from 'schemas/sections/video-and-text'
import artIndex from 'schemas/singletons/art-index'
import artistsIndex from 'schemas/singletons/artists-index'
import discover from 'schemas/singletons/discover'
// Sections
import home from 'schemas/singletons/home'
import settings from 'schemas/singletons/settings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    artist,
    page,
    home,
    artIndex,
    artistsIndex,
    discover,
    settings,
    link,
    productStatus,
    productType,
    topic,
    editorial,
    editorialType,

    // Section types
    blockText,
    customPortableText,
    fullBleedImage,
    carousel,
    carouselTwoUp,
    flippedText,
    textAndImage,
    emailSubscribe,
    quote,
    videoAndText,
    share,

    // Object types
    textLink,
    imageLink,
    menu,
    carouselItem,
    carouselTwoUpItem,
    imageLinkArray,
  ],
}
