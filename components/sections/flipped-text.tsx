import { CustomPortableText } from 'components/shared/CustomPortableText'
import { FlippedTextData } from 'types'
import { isColoredBackground } from 'lib/utils'

export interface FlippedTextProps {
  data: FlippedTextData
}

export function FlippedText({ data }: FlippedTextProps) {
  return (
    <div
      style={{ backgroundColor: `#${data.bgColor}` }}
      className={`pt-[51px] pb-[66px] xl:py-[131px] px-[32px] text-center flex flex-col gap-y-[44px] xl:gap-y-[71px] text-${data.textColorScheme}`}
    >
      <div className="flex flex-col gap-y-[14px] xl:gap-y-[43px]">
        <div className="h1">{data.heading}</div>
        <div className={`h1 rotate-180`}>{data.headingFlipped}</div>
      </div>
      <div className="custom-grid custom-gap">
        <div className="col-span-8 sm:col-start-3 sm:col-span-4 xl:col-span-8 xl:col-start-9 flex flex-col items-center">
          {data.bodyText && (
            <CustomPortableText
              value={data.bodyText.content}
              textColorScheme={data.textColorScheme}
              isOnColoredBackground={isColoredBackground(data.bgColor)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
