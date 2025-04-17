import { EmailSubscribeComponent } from 'components/global/EmailSubscribeComponent'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { EmailSubscribeData } from 'types'
import { isColoredBackground } from 'lib/utils'

export interface EmailSubscribeProps {
  data: EmailSubscribeData
}
export function EmailSubscribe({ data }: EmailSubscribeProps) {
  return (
    <div
      className={`px-[32px] pt-[36px] xl:pt-[85px] pb-[39px] xl:pb-[103px] custom-grid custom-gap gap-y-[19px] text-${data.textColorScheme}`}
      style={{ backgroundColor: `#${data.bgColor}` }}
    >
      <div className="col-span-8 col-start-1 col-end-9 xl:col-start-2 xl:col-end-6">
        <h5 className="font-bold">{data.heading}</h5>
      </div>
      <div className="col-span-8 col-start-1 col-end-9 xl:col-start-9 xl:col-end-17 flex flex-col">
        <CustomPortableText
          value={data.bodyText?.content}
          textColorScheme={data.textColorScheme}
          isOnColoredBackground={isColoredBackground(data.bgColor)}
        />
      </div>
      <div className="col-span-8 col-start-1 col-end-9 xl:col-start-9 xl:col-end-24 mt-[15px] xl:mt-[43px]">
        <EmailSubscribeComponent
          placeholder={data.placeholder}
          finePrint={data.finePrint}
          colorScheme={data.textColorScheme}
          bgColor={data.bgColor}
        />
      </div>
    </div>
  )
}
