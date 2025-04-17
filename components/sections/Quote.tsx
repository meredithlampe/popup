import React from 'react'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { QuoteData } from 'types'
import { QuoteMark } from 'components/shared/icons/QuoteMark'
import { isColoredBackground } from 'lib/utils'

export interface QuoteProps {
  data: QuoteData
}

const Quote = ({ data }) => {
  return (
    <section id="quote">
      <div
        className={`gap-y-[21px] section-padding custom-grid custom-gap text-${data.textColorScheme}`}
        style={{ backgroundColor: `#${data.bgColor}` }}
      >
        <div className="col-span-8 sm:col-span-1 xl:col-span-2">
          <QuoteMark width="56" height="48" fill={data.textColorScheme} />
        </div>
        <div className="col-start-1 col-end-9 sm:col-start-2 sm:col-end-9 xl:col-start-5 xl:col-end-20 custom-gap">
          <CustomPortableText
            value={data?.content?.content}
            textColorScheme={data.textColorScheme}
            isOnColoredBackground={isColoredBackground(data.bgColor)}
          />
        </div>
      </div>
    </section>
  )
}

export default Quote
