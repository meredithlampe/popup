import { EditorialPage } from 'components/pages/editorial/EditorialPage'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { resolveHref } from 'lib/sanity.links'
import {
  editorialBySlugQuery,
  editorialPaths,
  homePageTitleQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { EditorialPayload, SettingsPayload } from 'types'

interface EditorialPageProps {
  editorial: EditorialPayload
  settings: SettingsPayload
  homePageTitle?: string
  draftMode: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

export default function EditorialPageRoute(props: EditorialPageProps) {
  const {
    homePageTitle,
    settings,
    editorial: initialEditorial,
    draftMode,
  } = props
  const router = useRouter()
  useEffect(() => {
    if (!initialEditorial && router) {
      router.push('/404')
    }
  }, [initialEditorial, router])
  if (!initialEditorial) {
    return null
  }
  const [editorial, loading] = useLiveQuery<EditorialPayload | null>(
    initialEditorial,
    editorialBySlugQuery,
    {
      slug: initialEditorial.slug,
    },
  )
  if (!editorial) {
    router.push('/404')
  }
  return (
    <EditorialPage
      editorial={editorial}
      settings={settings}
      homePageTitle={homePageTitle}
      preview={draftMode}
      loading={false}
    />
  )
}

export const getStaticProps: GetStaticProps<EditorialPageProps, Query> = async (
  ctx,
) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode)

  const [settings, editorial, homePageTitle] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<EditorialPayload | null>(editorialBySlugQuery, {
      slug: params.slug,
    }),
    client.fetch<string | null>(homePageTitleQuery),
  ])

  if (!editorial) {
    return {
      props: {
        editorial: null,
      },
    }
  }

  return {
    props: {
      editorial: editorial,
      settings: settings ?? {},
      homePageTitle: homePageTitle ?? undefined,
      draftMode,
      token: draftMode ? readToken : null,
    },
  }
}

export const getStaticPaths = async () => {
  const client = getClient(true) // include draft documents
  const paths = await client.fetch<any[]>(editorialPaths)

  return {
    paths:
      paths?.map((path) => {
        return resolveHref('editorial', path.slug)
      }) || [],
    fallback: true,
  }
}
