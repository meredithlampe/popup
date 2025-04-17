import { ArtistsPage } from 'components/pages/artists/ArtistsPage'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { artistsPageQuery, settingsQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import { ArtIndexPayload, ArtistsPayload, SettingsPayload } from 'types'
interface ArtistsProps {
  page: ArtistsPayload
  settings: SettingsPayload
  draftMode: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

export default function Artists(props: ArtistsProps) {
  const { settings, draftMode } = props
  const [pageData, loading] = useLiveQuery<ArtistsPayload | null>(
    props.page,
    artistsPageQuery,
  )
  return (
    <ArtistsPage
      preview={draftMode}
      loading={loading}
      page={pageData}
      settings={settings}
    />
  )
}

export const getStaticProps: GetStaticProps<ArtistsProps, Query> = async (
  ctx,
) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode)

  const [settings, page] = await Promise.all([
    client.fetch<SettingsPayload>(settingsQuery),
    client.fetch<ArtIndexPayload>(artistsPageQuery),
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
