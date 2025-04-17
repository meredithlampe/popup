import { RightArrow } from 'components/shared/RightArrow'
import { useState } from 'react'

export function PreviousButton({
  onClick,
  fill,
  isOnColoredBackground = false,
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`rotate-180 cursor-pointer ${
        isOnColoredBackground ? 'hover:opacity-50' : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="sm:hidden">
        <RightArrow width="20" height="20" fill={fill} />
      </span>
      <span className="hidden sm:block">
        <RightArrow
          fill={
            hovered
              ? isOnColoredBackground
                ? fill
                : fill === 'white'
                ? '#48494B'
                : '#727379'
              : fill
          }
        />
      </span>
    </div>
  )
}
