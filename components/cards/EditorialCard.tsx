import Image from 'components/Image'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { HoverLink } from 'components/shared/HoverLink'
import { customPortableTextToPlainText } from 'lib/next.helpers'
import Link from 'next/link'
import { EditorialPayloadLite } from 'types'
import { isColoredBackground } from 'lib/utils'

export function EditorialCard({
  editorial,
  shortSummaryWider = false,
  textColorScheme,
  isOnColoredBackground = false,
}: {
  editorial: EditorialPayloadLite
  shortSummaryWider?: boolean
  textColorScheme: 'black' | 'white'
  isOnColoredBackground?: boolean
}) {
  const href = `/exhibitions-and-stories/${editorial.slug}`
  return (
    <div className="flex flex-col">
      <Link className="xl:hover:opacity-[.5]" href={href}>
        {editorial.featuredImage ? (
          <Image
            src={editorial.featuredImage}
            alt={editorial.featuredImage.alt}
          />
        ) : (
          <div className={`bg-lightestGray w-[100%] aspect-square`}></div>
        )}
      </Link>
      <div className="mt-[24px] xl:mt-[22px] grid grid-cols-16 custom-gap">
        <div className="col-span-16 xl:col-span-8">
          <HoverLink
            href={href}
            textColorScheme={textColorScheme}
            isOnColoredBackground={isOnColoredBackground}
          >
            <h5 className="font-bold">{editorial.title}</h5>
          </HoverLink>
        </div>
      </div>
      <div
        className={`mt-[20px] grid grid-cols-12 gap-x-[10px] text-${textColorScheme}`}
      >
        <div
          className={`col-span-12 ${
            shortSummaryWider ? 'xl:col-span-10' : 'xl:col-span-6'
          } `}
        >
          <CustomPortableText
            value={editorial.shortSummary?.content}
            textColorScheme={textColorScheme}
            isOnColoredBackground={isOnColoredBackground}
          />
        </div>
      </div>
    </div>
  )
}
