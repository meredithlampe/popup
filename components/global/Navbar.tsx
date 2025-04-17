import useDetectScroll from '@smakss/react-scroll-direction'
import Image from 'components/Image'
import HamburgerButton from 'components/shared/HamburgerButton'
import { X } from 'components/shared/icons/X'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { Image as ImageType } from 'sanity'
import { SettingsPayload, TextLink } from 'types'
import { FooterMenu } from './FooterMenu'
import { RightArrow } from 'components/shared/RightArrow'
import { HoverLink } from 'components/shared/HoverLink'

interface NavbarProps {
  logo: ImageType
  menuItems?: TextLink[]
  settings: SettingsPayload
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

function MenuLink(props: { menuItem: TextLink }) {
  const menuItem = props.menuItem
  const href =
    menuItem.link.type === 'internal'
      ? resolveHref(
          menuItem?.link.page?.type,
          menuItem?.link?.page.slug,
          menuItem?.link?.page.artistSlug,
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
    >
      {menuItem.text}
    </HoverLink>
  )
}

export function Navbar({
  menuItems,
  logo,
  settings,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavbarProps) {
  const { scrollDir } = useDetectScroll()

  let announcementLinkHref: string | undefined = undefined
  if (
    settings.announcementBanner &&
    settings.announcementBanner.link &&
    (settings.announcementBanner.link.page?.slug ||
      settings.announcementBanner.link.url)
  ) {
    announcementLinkHref =
      settings.announcementBanner.link.type === 'internal'
        ? resolveHref(
            settings.announcementBanner?.link.page?._type,
            settings.announcementBanner?.link?.page?.slug,
            settings.announcementBanner?.link?.page?.artistSlug,
          )
        : settings.announcementBanner.link.url
  }
  return (
    <>
      <div
        className={`sticky ${
          scrollDir === 'up' || mobileMenuOpen ? 'top-0' : 'top-[-100%]'
        }
      top-0 z-10 left-0 right-0 transition-top duration-[500ms] max-h-[100vh] flex flex-col`}
      >
        {settings.announcementBanner &&
          settings.announcementBanner?.text &&
          announcementLinkHref && (
            <div className="bg-black hover:bg-darkGray text-white justify-center py-[8px] px-[32px] text-center">
              <Link
                href={announcementLinkHref ?? '#'}
                className="flex items-center gap-x-[6px] justify-center"
              >
                <h6>{settings.announcementBanner.text}</h6>
                <div className="shrink-0">
                  <RightArrow width="12" height="11" fill="white" />
                </div>
              </Link>
            </div>
          )}
        <div className={`bg-lightestGray px-[32px]`}>
          <div className="flex justify-between items-center">
            <div className="pt-[25px] pb-[18px]">
              <div className="w-[97px] ">
                <Link href="/" className="xl:hover:opacity-[.35]">
                  <Image src={logo} alt={logo?.alt} className="w-[97px]" />
                </Link>
              </div>
            </div>
            <div
              className="xl:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <HamburgerButton />}
            </div>
            <div className="hidden xl:flex gap-[42px] font-bold items-center">
              {menuItems &&
                menuItems.map((menuItem, key) => (
                  <div key={key}>
                    <MenuLink menuItem={menuItem} />
                  </div>
                ))}
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="bg-white z-[9] overflow-scroll h-full">
            <div className="flex flex-col gap-[35px] pt-[36px] px-[32px] overflow-scroll pb-[43px]">
              {menuItems &&
                menuItems.map((menuItem, key) => (
                  <h3 key={key} className="font-bold">
                    <MenuLink menuItem={menuItem} />
                  </h3>
                ))}
              <hr></hr>
              <div className="col-span-8 xl:col-span-4">
                {settings.menusFooter && settings.menusFooter[0] && (
                  <FooterMenu menu={settings.menusFooter[0]} />
                )}
              </div>
              <div className="col-span-8 xl:col-span-6 xl:col-start-12 xl:col-end-17">
                {settings.menusFooter && settings.menusFooter[1] && (
                  <FooterMenu menu={settings.menusFooter[1]} />
                )}
              </div>
              <div className="col-span-8 xl:col-span-6 xl:col-start-18 xl:col-end-24">
                {settings.menusFooter && settings.menusFooter[2] && (
                  <FooterMenu menu={settings.menusFooter[2]} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
