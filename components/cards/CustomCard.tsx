import Image from 'components/Image'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { CarouselTwoUpItemData } from 'types'

export function CustomCard({
  item,
  textColorScheme,
}: {
  item: CarouselTwoUpItemData
  textColorScheme: 'black' | 'white'
}) {
  const link = item.link
  const href =
    link.type === 'internal'
      ? resolveHref(link.page?._type, link.page?.slug, link.page?.artistSlug)
      : link.url
  return (
    <div className="flex flex-col">
      <Link className="xl:hover:opacity-[.5]" href={href}>
        <Image src={item.image} alt={item.image?.alt} />
      </Link>
      <div
        className={`mt-[10px] grid grid-cols-12 custom-gap text-${textColorScheme}`}
      >
        <div className="col-span-12 xl:col-span-10">
          <CustomPortableText
            value={item.text?.content}
            textColorScheme={textColorScheme}
          />
        </div>
      </div>
    </div>
  )
}
