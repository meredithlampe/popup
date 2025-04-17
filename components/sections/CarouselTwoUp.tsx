// eslint-disable-next-line simple-import-sort/imports
import useEmblaCarousel from 'embla-carousel-react'
import React from 'react'
import {
  ArtistPayloadLite,
  CarouselTwoUpData,
  CarouselTwoUpItemData,
  CarouselTwoUpItemType,
  EditorialPayloadLite,
  ProductPayloadLite,
} from 'types'
import { ProductCard } from 'components/cards/ProductCard'
import { EmblaCarousel } from 'components/carousel/EmblaCarousel'
import { EmblaCarouselControls } from 'components/carousel/EmblaCarouselControls'
import { EditorialCard } from 'components/cards/EditorialCard'
import { ArtistCard } from 'components/cards/ArtistCard'
import { CustomCard } from 'components/cards/CustomCard'
import { isColoredBackground } from 'lib/utils'

export interface CarouselTwoUpProps {
  data: CarouselTwoUpData
  children: React.ReactNode
}

const CarouselTwoUp = ({ data, children }: CarouselTwoUpProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 'auto',
    loop: true,
  })

  return (
    <section id="carousel-two-up">
      <div
        className={`flex flex-col section-padding text-${data.textColorScheme}`}
        style={{ backgroundColor: `#${data.bgColor}` }}
      >
        {/* text */}
        {children && (
          <div className="custom-grid mb-[27px] xl:mb-[52px]">
            <div className="col-span-8 xl:col-span-16 p-max-w-348">
              {children}
            </div>
          </div>
        )}
        {/* carousel controls */}
        {data.items?.length > 2 && (
          <div className="mb-[30px]">
            <EmblaCarouselControls
              emblaApi={emblaApi}
              textColorScheme={data.textColorScheme}
              isOnColoredBackground={
                !!data.bgColor &&
                !['fff', 'ffffff', '000', '000000'].includes(
                  data.bgColor.toLowerCase(),
                )
              }
            />
          </div>
        )}
        {/* if more than 2 items are present, render carousel */}
        {data.items?.length > 2 ? (
          <EmblaCarousel emblaRef={emblaRef}>
            {data.items.map((item, index) => (
              <div key={index} className="embla__slide_two_up">
                <CarouselItem
                  item={item}
                  textColorScheme={data.textColorScheme}
                  isOnColoredBackground={isColoredBackground(data.bgColor)}
                />
              </div>
            ))}
          </EmblaCarousel>
        ) : data.items?.length > 1 ? (
          // otherwise, render 2-up static layout.
          // (at least 2 elements are required in sanity document definition)
          <div className="flex flex-col xl:flex-row mt-[15px] mb-[25px] w-full gap-y-[32px] gap-x-[10px]">
            <div className="xl:basis-1/2">
              <CarouselItem
                item={data.items[0]}
                textColorScheme={data.textColorScheme}
                isOnColoredBackground={isColoredBackground(data.bgColor)}
              />
            </div>
            <div className="xl:basis-1/2">
              <CarouselItem
                item={data.items[1]}
                textColorScheme={data.textColorScheme}
                isOnColoredBackground={isColoredBackground(data.bgColor)}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  )
}

function CarouselItem({
  item,
  textColorScheme,
  isOnColoredBackground,
}: {
  item:
    | CarouselTwoUpItemData
    | ArtistPayloadLite
    | ProductPayloadLite
    | EditorialPayloadLite
  textColorScheme: 'black' | 'white'
  isOnColoredBackground: boolean
}) {
  let content = <></>
  switch (item?._type) {
    case CarouselTwoUpItemType.CarouselTwoUpItem:
      content = <CustomCard item={item} />
      break
    case CarouselTwoUpItemType.Artist:
      content = (
        <ArtistCard
          artist={item}
          textColorScheme={textColorScheme}
          isOnColoredBackground={isOnColoredBackground}
        />
      )
      break
    case CarouselTwoUpItemType.Product:
      content = (
        <ProductCard
          product={item}
          showPrice={false}
          textColorScheme={textColorScheme}
          isOnColoredBackground={isOnColoredBackground}
        />
      )
      break
    case CarouselTwoUpItemType.Editorial:
      content = (
        <EditorialCard
          editorial={item}
          textColorScheme={textColorScheme}
          isOnColoredBackground={isOnColoredBackground}
        />
      )
      break
  }

  return <div className="aspect-[0.89] sm:aspect-[1.78]">{content}</div>
}

export default CarouselTwoUp
