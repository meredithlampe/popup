import Image from 'components/Image'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { TextAndImageData } from 'types'
import { isColoredBackground } from 'lib/utils'

export interface TextAndImageProps {
  data: TextAndImageData
}

export function TextAndImage({ data }: TextAndImageProps) {
  const textContent = (
    <div>
      <CustomPortableText
        value={data.text?.content}
        textColorScheme={data.textColorScheme}
        isOnColoredBackground={isColoredBackground(data.bgColor)}
      />
    </div>
  )
  const imageContent = (
    <Image
      src={data.image}
      alt={data.image?.alt}
      objectFit={data.imageStyle == 'contain' ? 'contain' : 'cover'}
      imageContainerClassName={data.imageStyle == 'contain' ? 'h-fit' : ''}
    />
  )

  const textColumn = (
    <div
      className={`col-span-8 ${
        data.imageLayout == 'left'
          ? 'xl:col-start-16 xl:col-end-24'
          : 'xl:col-start-2 xl:col-span-7'
      } flex items-center`}
    >
      {textContent}
    </div>
  )

  const imageColumn = (
    <div
      className={`col-span-8 ${
        data.imageStyle == 'contain'
          ? data.imageLayout == 'left'
            ? 'xl:col-span-14'
            : 'xl:col-start-11 xl:col-span-14'
          : `hidden xl:block ${
              data.imageLayout == 'left' ? '' : 'xl:col-start-14 '
            } xl:col-span-11 -mt-[200px] -mr-[30px] -mb-[100px]`
      }`}
    >
      {imageContent}
    </div>
  )

  return (
    <div
      style={{ backgroundColor: `#${data.bgColor}` }}
      className={`overflow-hidden custom-padding custom-grid custom-gap gap-y-[36px] text-${data.textColorScheme}`}
    >
      {data.imageLayout === 'left' ? (
        <>
          {imageColumn}
          {textColumn}
        </>
      ) : (
        <>
          {textColumn}
          {imageColumn}
        </>
      )}
    </div>
  )
}
