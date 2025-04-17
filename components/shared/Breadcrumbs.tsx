import { HoverLink } from './HoverLink'

export interface Breadcrumb {
  label: string
  href?: string
  classes?: string
}

export interface BreadcrumbProps {
  breadcrumbs: Array<Breadcrumb>
}

export function Breadcrumbs({ breadcrumbs }: BreadcrumbProps) {
  if (breadcrumbs.length === 0) {
    return null
  }
  return (
    <div className="flex gap-x-[6px] xl:gap-x-[13px] items-center">
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <>
            {breadcrumb.href ? (
              <HoverLink
                href={breadcrumb.href}
                textColorScheme={'black'}
                isOnColoredBackground={false}
              >
                <span
                  className={`${breadcrumb.classes} underline whitespace-nowrap`}
                >
                  {breadcrumb.label}
                </span>
              </HoverLink>
            ) : (
              <span className={breadcrumb.classes}>{breadcrumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <div className="shrink-0 pt-[2px]">→</div>
            )}
          </>
        )
      })}
    </div>
  )
}
