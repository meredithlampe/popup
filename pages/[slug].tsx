import { Page } from 'components/pages/page/Page'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { resolveHref } from 'lib/sanity.links'
import {
  homePageTitleQuery,
  pagePaths,
  pagesBySlugQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PagePayload, SettingsPayload } from 'types'

interface PageProps {
  page: PagePayload
  settings: SettingsPayload
  homePageTitle?: string
  draftMode: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

export default function PageSlugRoute(props: PageProps) {
  const { homePageTitle, settings, page: initialPage, draftMode } = props
  const router = useRouter()
  useEffect(() => {
    if (!initialPage && router) {
      router.push('/404')
    }
  }, [initialPage, router])

  if (!initialPage) {
    return null
  }

  const [page, loading] = useLiveQuery<PagePayload | null>(
    initialPage,
    pagesBySlugQuery,
    {
      slug: initialPage.slug,
    },
  )
  if (!page) {
    router.push('/404')
  }

  return (
    <Page
      preview={draftMode}
      loading={loading}
      page={page ?? initialPage}
      settings={settings}
      homePageTitle={homePageTitle}
    />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode)

  const [settings, page, homePageTitle] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<PagePayload | null>(pagesBySlugQuery, {
      slug: params.slug,
    }),
    client.fetch<string | null>(homePageTitleQuery),
  ])

  if (!page) {
    return {
      props: {
        page: null,
      },
    }
  }

  return {
    props: {
      page,
      settings: settings ?? {},
      homePageTitle: homePageTitle ?? undefined,
      draftMode,
      token: draftMode ? readToken : null,
    },
  }
}

export const getStaticPaths = async () => {
  const client = getClient(true)
  const paths = await client.fetch<string[]>(pagePaths)

  return {
    paths: paths?.map((slug) => resolveHref('page', slug)) || [],
    fallback: true,
  }
}
