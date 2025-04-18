import { ArtIndexPage } from 'components/pages/home/ProductIndex'
import { getClient } from 'lib/sanity.client'
import {
  artIndexQuery,
  getArtIndexQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import { useEffect, useState } from 'react'
import { ArtIndexPayload, SettingsPayload } from 'types'
import { readToken } from 'lib/sanity.api'
interface ArtIndexProps {
  page: ArtIndexPayload
  settings: SettingsPayload
  draftMode: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

export default function ArtIndex(props: ArtIndexProps) {
  const { settings, draftMode } = props
  const [pageData, loading] = useLiveQuery<ArtIndexPayload | null>(
    props.page,
    artIndexQuery,
  )
  return (
    <ArtIndexPage
      preview={draftMode}
      loading={loading}
      page={pageData}
      settings={settings}
    />
  )
}

export const getStaticProps: GetStaticProps<ArtIndexProps, Query> = async (
  ctx,
) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode)

  const [settings, page] = await Promise.all([
    client.fetch<SettingsPayload>(settingsQuery),
    client.fetch<ArtIndexPayload>(artIndexQuery),
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
