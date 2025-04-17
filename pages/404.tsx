import PageHead from 'components/pages/page/PageHead'
import { Section } from 'components/sections'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import { getClient } from 'lib/sanity.client'
import { settingsQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { PagePayload, SettingsPayload } from 'types'

interface Query {
  [key: string]: string
}

export interface PageProps {
  page: PagePayload
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
}

export default function Custom404({ settings }: PageProps) {
  return (
    <>
      <PageHead
        page={undefined}
        settings={settings}
        title={'404 - Page Not Found'}
      />

      <Layout settings={settings}>
        {/* Workaround: scroll to top on route change */}
        <div className="flex items-center justify-center page-404">
          <h3>404 - Page Not Found</h3>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode)

  const [settings] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
  ])

  return {
    props: {
      settings: settings ?? {},
    },
  }
}
