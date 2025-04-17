import { CustomPortableText } from 'components/shared/CustomPortableText'
import { VideoAndTextData } from 'types'
import MuxPlayer from '@mux/mux-player-react'
import { useEffect, useState } from 'react'
import { isColoredBackground } from 'lib/utils'

export interface VideoAndTextProps {
  data: VideoAndTextData
}

export function VideoAndTextMux({ data }: VideoAndTextProps) {
  return (
    <section id="video-and-text">
      <div
        className={`flex flex-col gap-[25px] px-[32px] py-[32px] pb-[62px] text-${data.textColorScheme}`}
        style={{ backgroundColor: `#${data.bgColor}` }}
      >
        {/* video */}
        <div className="flex justify-center items-center aspect-[6/3] bg-lightestGray">
          <MuxPlayer
            playbackId={data.video?.asset.playbackId}
            accent-color="#A3A5AA"
          />
        </div>
        {/* text */}
        <div className="custom-grid gap-y-[21px]">
          <div className="col-span-8">
            <h3 className="font-bold">{data.title}</h3>
          </div>
          <div className="col-start-1 col-end-9 xl:col-start-14 xl:col-end-21">
            <CustomPortableText
              value={data.text.content}
              textColorScheme={data.textColorScheme}
              isOnColoredBackground={isColoredBackground(data.bgColor)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
