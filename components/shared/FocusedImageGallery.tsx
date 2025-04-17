import Image from 'components/Image'
import React from 'react'
import type { Image as ImageType } from 'sanity'
import { CustomImage } from 'types'

interface FocusedImageGalleryProps {
  images: CustomImage[]
  initialIndex?: number
}

const FocusedImageGallery: React.FC<FocusedImageGalleryProps> = ({
  images,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex)

  return (
    <div className="grid grid-cols-8 xl:grid-cols-12 gap-[8px] xl:gap-[10px]">
      <div className="col-span-8 xl:hidden">
        <div className="w-full">
          <Image
            src={images[currentIndex]}
            alt={images[currentIndex].alt}
            objectFit="contain"
            // fill={true}
          />
        </div>
      </div>
      <div className="col-span-8 xl:col-span-2">
        <div className="grid grid-cols-8 gap-[8px] xl:flex xl:flex-col gap-2">
          {images.map((image, index) => (
            <div
              className={
                index == currentIndex ? ' border border-solid border-black' : ''
              }
            >
              <div
                key={index}
                className={`cursor-pointer aspect-square col-span-2 ${
                  index === currentIndex ? 'xl:opacity-[.35]' : ''
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <Image
                  src={image}
                  alt={image.alt}
                  fill={true}
                  className="w-full h-20"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden xl:col-span-10 xl:block">
        <div className="w-full">
          <Image
            src={images[currentIndex]}
            alt={images[currentIndex].alt}
            // fill={true}
            className=""
          />
        </div>
      </div>
    </div>
  )
}

export default FocusedImageGallery
