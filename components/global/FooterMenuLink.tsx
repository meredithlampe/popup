import { HoverLink } from 'components/shared/HoverLink'
import { resolveHref } from 'lib/sanity.links'
import { TextLink } from 'types'

export function FooterMenuLink(props: { menuItem: TextLink }) {
  const menuItem = props.menuItem
  const href =
    menuItem.link.type === 'internal'
      ? resolveHref(
          menuItem.link.page?._type,
          menuItem.link.page?.slug,
          menuItem.link.page?.artistSlug,
        )
      : menuItem.link.url
  if (!href) {
    return null
  }
  return (
    <HoverLink
      href={href}
      textColorScheme="black"
      isOnColoredBackground={false}
      openInNewTab={menuItem.link.type === 'external'}
    >
      {menuItem.text}
    </HoverLink>
  )
}
