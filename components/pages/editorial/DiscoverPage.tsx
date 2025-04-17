import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import type { DiscoverPayload } from 'types'
import { SettingsPayload } from 'types'

import PageHead from '../page/PageHead'
import { Section } from 'components/sections'
import { EditorialGrid } from 'components/grids/EditorialGrid'
import ArrowLink from 'components/shared/ArrowLink'

export interface DiscoverPageProps {
  settings: SettingsPayload
  page: DiscoverPayload
  preview?: boolean
  loading?: boolean
}

export function DiscoverPage({
  page,
  settings,
  preview,
  loading,
}: DiscoverPageProps) {
  const { overview, sections, title = 'My Store' } = page ?? {}

  return (
    <>
      <PageHead page={page} settings={settings} title={title} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div>
          <div className="custom-padding">
            <ArrowLink direction="left" href="/" textColorScheme={'black'}>
              <div className="underline">Home</div>
            </ArrowLink>

            {/* header */}
            <h1 className="mt-[19px] xl:mt-[42px] mb-[35px] xl:mb-[79px]">
              {page.header}
            </h1>

            {/* editorial grid */}
            <EditorialGrid
              defaultSort={page.featured?.length > 0 ? 'featured' : 'newest'}
              gridDisruptors={page.gridDisruptors}
              featured={page.featured}
            />
          </div>
          {page.sections && page.sections?.length > 0 && (
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
