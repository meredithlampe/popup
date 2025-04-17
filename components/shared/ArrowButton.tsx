import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { RightArrow } from './RightArrow'
import { useState } from 'react'

export function ArrowButton({ link, colorScheme, text }) {
  const [hovering, setHovering] = useState(false)
  const href =
    link.type === 'internal'
      ? resolveHref(link?.page?._type, link?.page?.slug, link?.page?.artistSlug)
      : link.url

  let fill = 'black'
  if (
    (!hovering && colorScheme == 'dark') ||
    (hovering && colorScheme == 'light')
  ) {
    fill = 'white'
  }

  return (
    <Link
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      href={href}
      className={`no-hover-fade flex items-center gap-x-[10px] ${
        colorScheme == 'dark'
          ? 'bg-black hover:bg-white text-white hover:text-black'
          : 'bg-white hover:bg-darkGray text-black hover:text-white'
      } pb-[10px] xl:pb-[12px] pt-[7px] xl:pt-[8px] px-[30px] w-fit font-bold text-[16px] xl:text-[18px]`}
    >
      {text}{' '}
      <span>
        <RightArrow width={'13'} fill={fill} />
      </span>
    </Link>
  )
}
