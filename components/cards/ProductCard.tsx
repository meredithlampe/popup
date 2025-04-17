import Image from 'components/Image'
import { HoverLink } from 'components/shared/HoverLink'
import { getPriceFormatted } from 'lib/next.helpers'
import Link from 'next/link'
import { ProductPayloadLite } from 'types'
import { isColoredBackground } from 'lib/utils'

export function ProductCard({
  product,
  showPrice = true,
  textColorScheme = 'black',
  isOnColoredBackground = false,
}: {
  product: ProductPayloadLite
  showPrice?: boolean
  textColorScheme: 'black' | 'white'
  isOnColoredBackground?: boolean
}) {
  // only artwork is supported at the moment
  const artwork = product
  return (
    <div className="flex flex-col">
      <Link
        href={`/art/${artwork.artist.slug}/${artwork.slug}`}
        className="xl:hover:opacity-[.5]"
      >
        <Image src={artwork.featuredImage} alt={artwork.featuredImage.alt} />
      </Link>
      <div className="mt-[10px]">
        <HoverLink
          href={`/art/${artwork.artist.slug}/${artwork.slug}`}
          textColorScheme={textColorScheme}
          isOnColoredBackground={isOnColoredBackground}
        >
          <h5 className="font-bold italic text-wrap break-words">
            {artwork.title}
          </h5>
        </HoverLink>
        <HoverLink
          href={`/art?artist=${artwork.artist.slug}`}
          textColorScheme={textColorScheme}
          isOnColoredBackground={isOnColoredBackground}
        >
          <h5 className="w-fit">
            {artwork.artist.firstName} {artwork.artist.lastName}
          </h5>
        </HoverLink>
      </div>
      <div className={`mt-[20px] text-${textColorScheme}`}>
        {artwork.types && (
          <div>{artwork.types.map((type) => type.title).join(', ')}</div>
        )}
        {showPrice && (
          <span className="font-bold">{getPriceFormatted(artwork.price)}</span>
        )}
      </div>
    </div>
  )
}
