import { DiscoverPage } from 'components/pages/editorial/DiscoverPage'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { discoverPageQuery, settingsQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import { ArtIndexPayload, DiscoverPayload, SettingsPayload } from 'types'
interface DiscoverProps {
  page: DiscoverPayload
  settings: SettingsPayload
  draftMode: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

export default function Discover(props: DiscoverProps) {
  const { settings, draftMode } = props
  const [pageData, loading] = useLiveQuery<DiscoverPayload | null>(
    props.page,
    discoverPageQuery,
  )
  return (
    <DiscoverPage
      preview={draftMode}
      loading={loading}
      page={pageData}
      settings={settings}
    />
  )
}

export const getStaticProps: GetStaticProps<DiscoverProps, Query> = async (
  ctx,
) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode)

  const [settings, page] = await Promise.all([
    client.fetch<SettingsPayload>(settingsQuery),
    client.fetch<ArtIndexPayload>(discoverPageQuery),
  ])

  return {
    props: {
      settings,
      page,
      draftMode,
      token: draftMode ? readToken : null,
    },
  }
}
