import Link from 'next/link'

export function HoverLink({
  href,
  children,
  textColorScheme,
  isOnColoredBackground = false,
  openInNewTab = false,
}) {
  return (
    <Link
      href={href}
      className={`w-fit ${
        isOnColoredBackground
          ? `text-${textColorScheme} hover:opacity-50`
          : textColorScheme === 'black'
          ? 'text-black hover:text-[#727379]'
          : 'text-white hover:text-[#48494B]'
      }`}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Link>
  )
}
