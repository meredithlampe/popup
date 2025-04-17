// eslint-disable-next-line simple-import-sort/imports
import React, { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'

type UseDotButtonType = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  }
}

export function DotButton({
  selected,
  onClick,
  fill,
  isOnColoredBackground = false,
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer w-[7px] h-[7px] bg-${fill} rounded-[50px] transition-opacity ${
        selected
          ? ''
          : isOnColoredBackground
          ? 'bg-black opacity-50'
          : 'bg-lightGray xl:opacity-[.35]'
      }`}
    />
  )
}

// type PropType = ComponentPropsWithRef<'button'>

// export const DotButton: React.FC<PropType> = (props) => {
//   const { children, ...restProps } = props

//   return (
//     <div type="button" {...restProps}>
//       {children}
//     </div>
//   )
// }
