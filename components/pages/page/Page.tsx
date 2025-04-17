import { Section } from 'components/sections'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import type { PagePayload, SettingsPayload } from 'types'

import PageHead from './PageHead'

export interface PageProps {
  page: PagePayload
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
}

export function Page({ page, settings, preview, loading }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { sections, title } = page || {}

  return (
    <>
      <PageHead page={page} settings={settings} title={page.title} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div>
          <div>
            {/* Header */}

            {/* Sections */}
            {sections && sections.length > 0 && (
              <div className="flex flex-col">
                {sections.map((section, key) => (
                  <Section index={key} section={section} settings={settings} />
                ))}
              </div>
            )}

            {/* Workaround: scroll to top on route change */}
            <ScrollUp />
          </div>
        </div>
      </Layout>
    </>
  )
}
