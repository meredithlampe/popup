import { DotButton, useDotButton } from 'components/shared/CarouselDotButton'
import { useCallback } from 'react'
import { PreviousButton } from './PreviousButton'
import { NextButton } from './NextButton'

export function EmblaCarouselControls({
  emblaApi,
  textColorScheme = 'black',
  isOnColoredBackground = false,
}) {
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])
  return (
    <div className={`flex justify-between items-center carousel-controls`}>
      <PreviousButton
        onClick={() => scrollPrev()}
        fill={textColorScheme}
        isOnColoredBackground={isOnColoredBackground}
      />
      <div className="flex gap-x-[6px] xl:gap-x-[10px]">
        {scrollSnaps.map((_, index) => (
          <DotButton
            fill={textColorScheme}
            key={index}
            selected={index === selectedIndex}
            onClick={() => onDotButtonClick(index)}
            isOnColoredBackground={isOnColoredBackground}
          />
        ))}
      </div>
      <NextButton
        onClick={() => scrollNext()}
        fill={textColorScheme}
        isOnColoredBackground={isOnColoredBackground}
      />
    </div>
  )
}
