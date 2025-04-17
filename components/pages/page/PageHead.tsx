import { toPlainText } from '@portabletext/react'
import { SiteMeta } from 'components/global/SiteMeta'
import {
  ArtistsPayload,
  PagePayload,
  ProductPayload,
  SettingsPayload,
} from 'types'

export interface PageHeadProps {
  title: string | undefined
  page: PagePayload | ProductPayload | ArtistsPayload | undefined
  settings: SettingsPayload | undefined
}

export default function PageHead({ title, page, settings }: PageHeadProps) {
  return (
    <SiteMeta
      baseTitle={'My Store'}
      description={page?.overview ? toPlainText(page.overview) : ''}
      image={settings?.ogImage}
      title={title}
    />
  )
}
