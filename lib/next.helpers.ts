export function getHrefForLink(link) {
  let internalLink
  if (link?.page?._type === 'pageHome') {
    internalLink = '/'
  } else {
    internalLink = '/' + link?.page?.slug
  }

  return {
    external: link?.url,
    internal: internalLink,
  }[link?.type]
}

export function getPriceFormatted(price) {
  if (price && price > 0) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  } else {
    return 'Price on request'
  }
}

export function customPortableTextToPlainText(blocks = []) {
  return blocks
    // loop through each block
    .map(block => {
      // if it's not a text block with children, 
      // return nothing
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      // loop through the children spans, and join the
      // text strings
      return block.children.map(child => child.text).join('')
    })
    // join the paragraphs leaving split by two linebreaks
    .join('\n\n')
}