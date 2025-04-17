import { ArtistPage } from 'components/pages/artists/ArtistPage'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { resolveHref } from 'lib/sanity.links'
import {
  artistPageBySlugQuery,
  artistPaths,
  homePageTitleQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ArtistPagePayload, SettingsPayload } from 'types'

interface ArtistPageProps {
  artistPage: ArtistPagePayload
  settings: SettingsPayload
  homePageTitle?: string
  draftMode: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

export default function ArtistPageRoute(props: ArtistPageProps) {
  const {
    homePageTitle,
    settings,
    artistPage: initialArtist,
    draftMode,
  } = props
  const router = useRouter()
  useEffect(() => {
    if (!initialArtist && router) {
      router.push('/404')
    }
  }, [initialArtist, router])
  if (!initialArtist) {
    return null
  }
  const [artistPage, loading] = useLiveQuery<ArtistPagePayload | null>(
    initialArtist,
    artistPageBySlugQuery,
    {
      slug: initialArtist.slug,
    },
  )
  if (!artistPage) {
    router.push('/404')
  }
  return (
    <ArtistPage
      preview={draftMode}
      loading={loading}
      artistPage={artistPage}
      settings={settings}
      homePageTitle={homePageTitle}
    />
  )
}

export const getStaticProps: GetStaticProps<ArtistPageProps, Query> = async (
  ctx,
) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode)

  const [settings, artistPage, homePageTitle] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<ArtistPagePayload | null>(artistPageBySlugQuery, {
      slug: params.slug,
    }),
    client.fetch<string | null>(homePageTitleQuery),
  ])

  if (!artistPage) {
    return {
      props: {
        artistPage: null,
      },
    }
  }

  return {
    props: {
      artistPage: artistPage,
      settings: settings ?? {},
      homePageTitle: homePageTitle ?? undefined,
      draftMode,
      token: draftMode ? readToken : null,
    },
  }
}

export const getStaticPaths = async () => {
  const client = getClient(true) // include draft documents
  const paths = await client.fetch<any[]>(artistPaths)

  return {
    paths:
      paths?.map((path) => {
        return resolveHref('artist', path.slug)
      }) || [],
    fallback: true,
  }
}
