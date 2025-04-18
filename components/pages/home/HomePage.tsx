import { Section } from 'components/sections'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import type { HomePagePayload } from 'types'
import { SettingsPayload } from 'types'

import HomePageHead from './HomePageHead'

export interface HomePageProps {
  settings: SettingsPayload
  page: HomePagePayload
  preview?: boolean
  loading?: boolean
}

export function HomePage({ page, settings, preview, loading }: HomePageProps) {
  const { overview, sections, title = 'My Store' } = page ?? {}

  return (
    <>
      <HomePageHead page={page} settings={settings} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div className="space-y-20">
          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
          {sections?.map((section, index) => (
            <Section
              key={index}
              index={index}
              section={section}
              settings={settings}
            />
          ))}
        </div>
      </Layout>
    </>
  )
}
