import { CustomPortableText } from 'components/shared/CustomPortableText'
import { VideoAndTextData } from 'types'
import { isColoredBackground } from 'lib/utils'

export interface VideoAndTextProps {
  data: VideoAndTextData
}

export function VideoAndText({ data }: VideoAndTextProps) {
  return (
    <section id="video-and-text">
      <div
        className={`flex flex-col gap-[25px] px-[32px] py-[32px] pb-[62px] text-${data.textColorScheme}`}
        style={{ backgroundColor: `#${data.bgColor}` }}
      >
        {/* video */}
        <div className="flex justify-center items-center relative w-full h-full">
          {data.embedCode ? (
            <div
              className="w-full h-full relative"
              dangerouslySetInnerHTML={{ __html: data.embedCode }}
            />
          ) : (
            <></>
          )}
        </div>
        {/* text */}
        <div className="custom-grid gap-y-[21px]">
          <div className="col-span-8">
            <h3 className="font-bold">{data.title}</h3>
          </div>
          <div className="col-start-1 col-end-9 xl:col-start-14 xl:col-end-21">
            {data.text?.content ? (
              <CustomPortableText
                value={data.text?.content}
                textColorScheme={data.textColorScheme}
                isOnColoredBackground={isColoredBackground(data.bgColor)}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
