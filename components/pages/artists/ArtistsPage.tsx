import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import type { ArtistsPayload } from 'types'
import { SettingsPayload } from 'types'

import PageHead from '../page/PageHead'
import { Section } from 'components/sections'
import { ArtistsGrid } from 'components/grids/ArtistsGrid'

export interface ArtistsPageProps {
  settings: SettingsPayload
  page: ArtistsPayload
  preview?: boolean
  loading?: boolean
}

export function ArtistsPage({
  page,
  settings,
  preview,
  loading,
}: ArtistsPageProps) {
  const { overview, sections, header } = page ?? {}

  return (
    <>
      <PageHead page={page} settings={settings} title={header} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div>
          <div className="custom-padding">
            {/* header */}
            <h1 className="mt-[19px] xl:mt-[42px] mb-[35px] xl:mb-[79px]">
              {page.header}
            </h1>

            {/* editorial grid */}
            <ArtistsGrid
              defaultSort={page.featured.length > 0 ? 'featured' : 'newest'}
              gridDisruptors={page.gridDisruptors}
              featured={page.featured}
            />
          </div>
          {page.sections && page.sections.length > 0 && (
            <div className="flex flex-col">
              {page.sections.map((section, key) => (
                <Section
                  key={key}
                  index={key}
                  section={section}
                  settings={settings}
                />
              ))}
            </div>
          )}

          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </div>
      </Layout>
    </>
  )
}
