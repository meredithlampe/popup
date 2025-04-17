import { CustomPortableText } from 'components/shared/CustomPortableText'
import React from 'react'
import Image from 'components/Image'
import { BlockTextData } from 'types'
import { isColoredBackground } from 'lib/utils'

export interface BlockTextProps {
  data: BlockTextData
}

const BlockText = ({ data }: BlockTextProps) => {
  const textContent = (
    <div className="p-max-w-550">
      <CustomPortableText
        value={data.content.content}
        textColorScheme={data.textColorScheme}
        isOnColoredBackground={isColoredBackground(data.bgColor)}
      />
    </div>
  )
  return (
    <section id="block-text">
      <div
        style={{ backgroundColor: `#${data.bgColor}` }}
        className="px-[32px] custom-gap custom-grid pt-[60px] pb-[60px] gap-y-[53px]"
      >
        {data.image && data.image.asset ? (
          data.imageLayout == 'left' ? (
            <>
              <div className="col-span-12">
                <Image
                  src={data.image}
                  alt={data.image.alt}
                  imageContainerClassName="h-fit"
                />
              </div>
              <div className="col-start-1 col-end-9 xl:col-start-14 xl:col-end-24">
                {textContent}
              </div>
            </>
          ) : (
            <>
              <div className="col-start-1 col-end-9 xl:col-start-2 xl:col-end-13">
                {textContent}
              </div>
              <div className="col-span-12">
                <Image
                  src={data.image}
                  alt={data.image.alt}
                  imageContainerClassName="h-fit"
                />
              </div>
            </>
          )
        ) : (
          // no image, just text
          <div className="col-start-1 col-end-9 xl:col-start-2 xl:col-end-22">
            {textContent}
          </div>
        )}
      </div>
    </section>
  )
}

export default BlockText
