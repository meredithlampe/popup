import React from 'react'
import { RightArrow } from './RightArrow'

export default function ArrowLink({
  href,
  children,
  textColorScheme,
  direction = 'right',
  isOnColoredBackground = false,
  openInNewTab = false,
}) {
  const [isHovered, setIsHovered] = React.useState(false)
  return (
    <a
      href={href}
      className={`flex items-baseline gap-x-[9px] w-fit cursor-pointer ${
        isOnColoredBackground
          ? `text-${textColorScheme} hover:opacity-50`
          : textColorScheme === 'black'
          ? 'text-black hover:text-[#727379]'
          : 'text-white hover:text-[#48494B]'
      }`}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {direction == 'left' && (
        <div className="rotate-[180deg]">
          <RightArrow
            width="12"
            height="11"
            fill={
              isOnColoredBackground
                ? textColorScheme === 'black'
                  ? 'black'
                  : 'white'
                : textColorScheme == 'black'
                ? isHovered
                  ? '#727379'
                  : 'black'
                : isHovered
                ? '#48494B'
                : 'white'
            }
          />
        </div>
      )}
      {children}
      {direction == 'right' && (
        <RightArrow
          width="12"
          height="11"
          fill={
            isOnColoredBackground
              ? textColorScheme === 'black'
                ? 'black'
                : 'white'
              : textColorScheme == 'black'
              ? isHovered
                ? '#727379'
                : 'black'
              : isHovered
              ? '#48494B'
              : 'white'
          }
        />
      )}
    </a>
  )
}
