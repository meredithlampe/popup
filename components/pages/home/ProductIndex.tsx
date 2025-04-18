import { ProductGrid } from 'components/grids/ProductGrid'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import type { ArtIndexPayload } from 'types'
import { SettingsPayload } from 'types'

import PageHead from '../page/PageHead'
import { Section } from 'components/sections'
import { Suspense } from 'react'

export interface ArtIndexProps {
  settings: SettingsPayload
  page: ArtIndexPayload
  preview?: boolean
  loading?: boolean
}

export function ArtIndexPage({
  page,
  settings,
  preview,
  loading,
}: ArtIndexProps) {
  const { overview, sections, header = 'My Store' } = page ?? {}

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

            <Suspense fallback={<></>}>
              {/* artwork grid */}
              <ProductGrid
                defaultSort={page.featured?.length > 0 ? 'featured' : 'newest'}
                gridDisruptors={page.gridDisruptors}
                featured={page.featured}
              />
            </Suspense>
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
