import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'
import type { FullBleedImage } from 'types'

import BlockText from './block-text'
import Carousel from './Carousel'
import CarouselTwoUp from './CarouselTwoUp'
import { EmailSubscribe } from './EmailSubscribe'
import { FlippedText } from './flipped-text'
import PopupArt from './PopupArt'
import Quote from './Quote'
import { TextAndImage } from './TextAndImage'
import { VideoAndText } from './VideoAndText'
import { ShareAndExplore } from 'components/shared/ShareAndExplore'

export const Section = ({ index, section, settings }) => {
  switch (section._type) {
    case 'flippedText':
      return (
        <div key={index}>
          <FlippedText key={index} data={section} />
        </div>
      )
    case 'carousel':
      return (
        <div key={index}>
          <Carousel key={index} data={section} />
        </div>
      )
    case 'carouselTwoUp':
      return (
        <div key={index}>
          <CarouselTwoUp key={index} data={section}>
            {section.text && section.text.content && (
              <CustomPortableText
                value={section.text?.content}
                textColorScheme={section.textColorScheme}
              />
            )}
          </CarouselTwoUp>
        </div>
      )
    case 'blockText':
      return <BlockText key={index} data={section} />
    case 'fullBleedImage':
      const fullBleedImage = section as FullBleedImage
      return (
        <div key={index}>
          <ImageBox
            image={fullBleedImage.image}
            classesWrapper="h-[50vh] md:h-[70vh]"
          />
        </div>
      )
    case 'textAndImage':
      return (
        <div key={index}>
          <TextAndImage key={index} data={section} />
        </div>
      )
    case 'emailSubscribe':
      return (
        <div key={index}>
          <EmailSubscribe data={section} />
        </div>
      )
    case 'quote':
      return (
        <div key={index}>
          <Quote data={section} />
        </div>
      )
    case 'videoAndText':
      return (
        <div key={index}>
          <VideoAndText data={section} />
        </div>
      )
    case 'share':
      return (
        <div key={index}>
          <ShareAndExplore
            typesAndTopics={section.types}
            settings={settings}
            // we technically don't know where this section is being used, whether its in the
            // context of describing a product or editorial.
            // for now, assume editorial.
            documentType="editorial"
          />
        </div>
      )
    case 'popupArt':
      return (
        <div key={index} className="h-screen">
          <PopupArt />
        </div>
      )
  }
  return null
}
