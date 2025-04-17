import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { resolveHref } from 'lib/sanity.links'
import ArrowLink from './ArrowLink'
import { ArrowButton } from './ArrowButton'

export function CustomPortableText({
  paragraphClasses,
  value,
  textColorScheme = 'black',
  isOnColoredBackground = false,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
  textColorScheme?: 'black' | 'white'
  isOnColoredBackground?: boolean
}) {
  paragraphClasses += ` text-${textColorScheme}`
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>
      },
      h1: ({ children }) => {
        return <h1 className={`${paragraphClasses}`}>{children}</h1>
      },
      h1StyleDiv: ({ children }) => {
        return <div className={`h1 ${paragraphClasses}`}>{children}</div>
      },
      h2: ({ children }) => {
        return <h2 className={`${paragraphClasses}`}>{children}</h2>
      },
      h3: ({ children }) => {
        return <h3 className={`font-bold ${paragraphClasses}`}>{children}</h3>
      },
      h3Light: ({ children }) => {
        return <h3 className={`${paragraphClasses} light`}>{children}</h3>
      },
      h4: ({ children }) => {
        return <h4 className={`${paragraphClasses}`}>{children}</h4>
      },
      h4Bold: ({ children }) => {
        return <h4 className={`font-bold ${paragraphClasses}`}>{children}</h4>
      },
      h5: ({ children }) => {
        return <h5 className={`font-bold ${paragraphClasses}`}>{children}</h5>
      },
      smallText: ({ children }) => {
        return <div className="small-text">{children}</div>
      },
    },
    marks: {
      link: ({ children, value }) => {
        const link = value
        const href =
          link.type === 'internal'
            ? resolveHref(
                link?.page?._type,
                link?.page?.slug,
                link?.page?.artistSlug,
              )
            : link.url
        return (
          <a
            href={href}
            rel="noreferrer noopener"
            target={link.type === 'external' ? '_blank' : undefined}
            className={`${
              link.underlineStyle == 'underline' || !link.underlineStyle
                ? 'underline'
                : ''
            } 
          ${
            isOnColoredBackground
              ? `text-${textColorScheme} hover:opacity-50`
              : textColorScheme === 'black'
              ? 'text-black hover:text-[#48494B]'
              : 'text-white hover:text-[#727379]'
          }
          `}
          >
            {children}
          </a>
        )
      },
      arrowLink: ({ children, value }) => {
        const link = value
        const href =
          link.type === 'internal'
            ? resolveHref(
                link.page?._type,
                link.page?.slug,
                link.page?.artistSlug,
              )
            : link.url
        return (
          <ArrowLink
            href={href}
            textColorScheme={textColorScheme}
            isOnColoredBackground={isOnColoredBackground}
            openInNewTab={link.type === 'external'}
          >
            <span className="font-bold">{children}</span>
          </ArrowLink>
        )
      },
    },
    types: {
      button: ({ value }) => {
        return (
          <ArrowButton
            link={value}
            text={value.text}
            colorScheme={value.colorScheme}
          />
        )
      },
    },
  }

  return <PortableText components={components} value={value} />
}
