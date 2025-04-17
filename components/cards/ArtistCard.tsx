import Image from 'components/Image'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { HoverLink } from 'components/shared/HoverLink'
import Link from 'next/link'
import { ArtistPayloadLite } from 'types'

export function ArtistCard({
  artist,
  textColorScheme,
  isOnColoredBackground = false,
}: {
  artist: ArtistPayloadLite
  textColorScheme: 'black' | 'white'
  isOnColoredBackground?: boolean
}) {
  // only artwork is supported at the moment
  return (
    <div className="flex flex-col">
      <Link href={`/artists/${artist.slug}`} className="xl:hover:opacity-[.5]">
        {artist.featuredImage ? (
          <Image src={artist.featuredImage} alt={artist.featuredImage.alt} />
        ) : (
          <div className={`bg-lightestGray w-[100%] aspect-square`}></div>
        )}
      </Link>
      <HoverLink
        href={`/artists/${artist.slug}`}
        textColorScheme={textColorScheme}
        isOnColoredBackground={isOnColoredBackground}
      >
        <h5 className="font-bold italic mt-[10px] w-fit">
          {artist.firstName} {artist.lastName}
        </h5>
      </HoverLink>
      {artist.overview && (
        <div className={`mt-[15px] text-${textColorScheme}`}>
          <CustomPortableText
            value={artist.overview}
            textColorScheme={textColorScheme}
            isOnColoredBackground={isOnColoredBackground}
          />
        </div>
      )}
    </div>
  )
}
