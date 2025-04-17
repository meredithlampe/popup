// eslint-disable-next-line simple-import-sort/imports
import { useDotButton } from 'components/shared/CarouselDotButton'
import useEmblaCarousel from 'embla-carousel-react'
import React from 'react'
import { CarouselData, CarouselItemData, CarouselItemType } from 'types'
import Image from 'components/Image'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { EmblaCarouselControls } from 'components/carousel/EmblaCarouselControls'
import { EmblaCarousel } from 'components/carousel/EmblaCarousel'
import { resolveHref } from 'lib/sanity.links'
import router from 'next/router'
import { isColoredBackground } from 'lib/utils'

export interface CarouselProps {
  data: CarouselData
}

export function Carousel({ data }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const { selectedIndex } = useDotButton(emblaApi)
  const hasTextBelow = data.items.some((item) => item.textBelow)

  return (
    <section id="carousel">
      <div
        className={`flex flex-col gap-x-[16px] gap-y-[22px] xl:gap-y-[16px] section-padding text-${data.textColorScheme}`}
        style={{ backgroundColor: `#${data.bgColor}` }}
      >
        {data.items.length > 1 ? (
          <>
            <EmblaCarousel emblaRef={emblaRef}>
              {data.items.map((item, index) => (
                <div key={index} className="embla__slide">
                  <CarouselItem item={item} />
                </div>
              ))}
            </EmblaCarousel>
            <EmblaCarouselControls
              emblaApi={emblaApi}
              textColorScheme={data.textColorScheme}
              isOnColoredBackground={isColoredBackground(data.bgColor)}
            />
          </>
        ) : (
          <CarouselItem item={data.items[0]} />
        )}
        {/* text */}
        {hasTextBelow && (
          <div className="custom-grid mt-[10px] xl:mt-[30px]">
            <div className="col-span-8 xl:col-span-10 p-max-w-348">
              {data.items.map(
                (item, index) =>
                  index == selectedIndex && (
                    <CustomPortableText
                      value={item.textBelow?.content}
                      textColorScheme={data.textColorScheme}
                      isOnColoredBackground={isColoredBackground(data.bgColor)}
                    />
                  ),
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function CarouselItem({ item }: { item: CarouselItemData }) {
  let content = <></>
  switch (item.itemType) {
    case CarouselItemType.Image:
      content = (
        <div className="aspect-square sm:aspect-[1.78]">
          <Image
            src={item.image}
            alt={item.image?.alt}
            fill={true}
            objectFit="cover"
          />
        </div>
      )
      break
    case CarouselItemType.ImageAndColor:
      content = (
        <div className="grid grid-cols-2 h-full w-full sm:aspect-[1.78]">
          <div className="col-span-2 sm:col-span-1 aspect-square sm:aspect-auto">
            <Image src={item.image} alt={item.image?.alt} fill={true} />
          </div>
          <div
            className="hidden sm:block h-full text-white py-[32px] px-[37px]"
            style={{ backgroundColor: `#${item.color}` }}
          >
            {item.text && (
              <CustomPortableText
                value={item.text?.content}
                textColorScheme={item.textColorScheme}
              />
            )}
          </div>
        </div>
      )
      break
    case CarouselItemType.ImageAndColorTwoThirds:
      content = (
        <div className="custom-grid h-full w-full md:aspect-[1.78]">
          <div className="col-span-8 md:col-span-5 xl:col-span-16 aspect-square md:aspect-auto">
            <Image src={item.image} alt={item.image?.alt} fill={true} />
          </div>
          <div
            className="hidden md:block md:col-span-3 xl:col-span-8 h-full text-white py-[32px] px-[37px]"
            style={{ backgroundColor: `#${item.color}` }}
          >
            {item.text && (
              <CustomPortableText
                value={item.text?.content}
                paragraphClasses="break-words"
                textColorScheme={item.textColorScheme}
              />
            )}
          </div>
        </div>
      )
      break
  }

  const href =
    item.link?.type === 'internal'
      ? resolveHref(
          item.link?.page?._type,
          item.link?.page?.slug,
          item.link?.page?.artistSlug,
        )
      : item.link?.url

  return (
    <div className="embla__slide flex flex-col gap-y-[17px]">
      {href ? (
        <div
          onClick={() => router.push(href)}
          className="xl:hover:opacity-[.5] cursor-pointer"
        >
          {content}
        </div>
      ) : (
        <div>{content}</div>
      )}
      {item.caption && <div className="italic small-text">{item.caption}</div>}
    </div>
  )
}

export default Carousel
