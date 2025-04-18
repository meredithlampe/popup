import { ProductPage } from 'components/pages/products/ProductPage'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { resolveHref } from 'lib/sanity.links'
import {
  homePageTitleQuery,
  pagesBySlugQuery,
  productBySlugAndArtistQuery,
  productPaths,
  settingsQuery,
} from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ProductPayload, SettingsPayload } from 'types'

interface ProductPageProps {
  product: ProductPayload
  settings: SettingsPayload
  homePageTitle?: string
  draftMode: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

export default function ProductPageSlugRoute(props: ProductPageProps) {
  const { homePageTitle, settings, product: initialProduct, draftMode } = props
  const router = useRouter()
  useEffect(() => {
    if (!initialProduct && router) {
      router.push('/404')
    }
  }, [initialProduct, router])
  if (!initialProduct) {
    return null
  }
  const [product, loading] = useLiveQuery<ProductPayload | null>(
    initialProduct,
    pagesBySlugQuery,
    {
      slug: initialProduct.slug,
    },
  )
  // if (!product) {
  //   router.push('/404')
  // }

  return (
    <ProductPage
      preview={draftMode}
      loading={loading}
      product={product ?? initialProduct}
      settings={settings}
      homePageTitle={homePageTitle}
    />
  )
}

export const getStaticProps: GetStaticProps<ProductPageProps, Query> = async (
  ctx,
) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode)

  const [settings, product, homePageTitle] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<ProductPayload | null>(productBySlugAndArtistQuery, {
      slug: params.slug,
      artistSlug: params['artist-slug'],
    }),
    client.fetch<string | null>(homePageTitleQuery),
  ])

  if (!product) {
    return {
      props: {
        product: null,
      },
    }
  }

  return {
    props: {
      product: product,
      settings: settings ?? {},
      homePageTitle: homePageTitle ?? undefined,
      draftMode,
      token: draftMode ? readToken : null,
    },
  }
}

export const getStaticPaths = async () => {
  const client = getClient(true) // include draft documents
  const paths = await client.fetch<any[]>(productPaths)

  return {
    paths:
      paths?.map((path) => {
        return resolveHref('product', path.slug, path.artistSlug)
      }) || [],
    fallback: true,
  }
}
