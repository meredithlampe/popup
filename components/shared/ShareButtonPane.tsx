import { useRouter } from 'next/router'
import { useState } from 'react'

import { CopyUrlButton } from './CopyUrlButton'
import { IconContainer } from './IconContainer'
import { LinkIcon } from './LinkIcon'
import { ShareLink } from './ShareLink'

export function ShareButtonPane({ shareLinks }) {
  const [shareText, setShareText] = useState('Share')
  const [animatedShareText, setAnimatedShareText] = useState<String | null>(
    null,
  )
  const [hoveredIndex, setHoveredIndex] = useState<Number | null>(null)
  const router = useRouter()

  return (
    <div className="flex flex-col gap-y-[24px]">
      <div className="font-bold">{animatedShareText ?? shareText}</div>
      <div className={`flex gap-x-[10px]`}>
        <div
          onMouseEnter={() => {
            setShareText('Copy URL')
            setHoveredIndex(0)
          }}
          onMouseLeave={() => {
            setShareText('Share')
            setHoveredIndex(null)
          }}
          className={` ${
            hoveredIndex != null
              ? hoveredIndex == 0
                ? 'opacity-100'
                : 'opacity-50'
              : 'opacity-100'
          }`}
        >
          <CopyUrlButton
            onClick={() => {
              setAnimatedShareText('Copied!')
              setTimeout(() => {
                setAnimatedShareText(null)
              }, 2000)
            }}
          >
            <IconContainer>
              <LinkIcon />
            </IconContainer>
          </CopyUrlButton>
        </div>
        {shareLinks.map((link, key) => {
          return (
            <ShareLink
              key={key}
              index={key}
              shareLink={link}
              onMouseEnter={() => {
                setShareText(link.shareText)
                setHoveredIndex(key + 1)
              }}
              onMouseLeave={() => {
                setShareText('Share')
                setHoveredIndex(null)
              }}
              hoveredIndex={hoveredIndex}
            />
          )
        })}
      </div>
    </div>
  )
}
