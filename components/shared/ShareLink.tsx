import Image from 'components/Image'
import { useEffect, useState } from 'react'

import { IconContainer } from './IconContainer'

export function ShareLink({
  onMouseEnter,
  onMouseLeave,
  shareLink,
  hoveredIndex,
  index,
}) {
  const [shareUrl, setShareUrl] = useState('')
  useEffect(() => {
    const url = window.location.toString()
    setShareUrl(shareLink.linkPrefix + encodeURI(url))
  }, [shareLink])
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={` ${
        hoveredIndex != null
          ? hoveredIndex == index + 1
            ? 'opacity-100'
            : 'opacity-50'
          : 'opacity-100'
      }`}
    >
      {/* assume external url */}
      <a href={shareUrl} target="_blank" className="no-hover-fade">
        <IconContainer>
          <Image src={shareLink.icon} />
        </IconContainer>
      </a>
    </div>
  )
}
