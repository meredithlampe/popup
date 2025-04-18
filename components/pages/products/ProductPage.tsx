import { CustomPortableText } from 'components/shared/CustomPortableText'
import FocusedImageGallery from 'components/shared/FocusedImageGallery'
import Layout from 'components/shared/Layout'
import { Line } from 'components/shared/Line'
import ScrollUp from 'components/shared/ScrollUp'
import { ShopifyBuyButton } from 'components/shared/ShopifyBuyButton'
import { motion } from 'framer-motion'
import { getPriceFormatted } from 'lib/next.helpers'
import { PortableTextBlock } from 'next-sanity'
import React from 'react'
import type { CustomImage, ProductPayload, SettingsPayload } from 'types'

import PageHead from '../page/PageHead'
import { Section } from 'components/sections'
import CarouselTwoUp from 'components/sections/CarouselTwoUp'
import { Breadcrumbs } from 'components/shared/Breadcrumbs'
import { ShareAndExplore } from 'components/shared/ShareAndExplore'
import ArrowLink from 'components/shared/ArrowLink'

export interface PageProps {
  product: ProductPayload
  settings: SettingsPayload
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
}

export function ProductPage({
  product,
  settings,
  preview,
  loading,
}: PageProps) {
  let images: CustomImage[] = []
  images = [...(product.alternateImages ?? [])]
  images?.unshift(product.featuredImage)
  return (
    <>
      <PageHead
        page={product}
        settings={settings}
        title={`${product.artist?.firstName} ${product.artist?.lastName} | Original Art for Sale`}
      />

      <Layout settings={settings} preview={preview} loading={loading}>
        {/* top white section  */}
        <div className="custom-grid gap-x-[8px] xl:gap-x-[10px] px-[32px] pt-[27px] pb-[67px] gap-y-[31px]">
          {/* breadcrumbs */}
          <div className="col-span-8 xl:col-span-24 xl:mb-[23px]">
            <Breadcrumbs
              breadcrumbs={[
                { label: 'Browse Art', href: '/art', classes: 'shrink-0' },
                {
                  label: `${product.artist?.firstName} ${product.artist?.lastName}`,
                  href: `/art?artist=${product.artist?.slug}`,
                  classes: 'overflow-hidden text-ellipsis whitespace-nowrap',
                },
                {
                  label: product.title,
                  classes:
                    'font-bold overflow-hidden whitespace-nowrap text-ellipsis',
                },
              ]}
            />
          </div>
          {/* images */}
          <div className="col-span-8 xl:col-span-12">
            <FocusedImageGallery images={images} />
          </div>

          {/* spacer */}
          <div className="hidden xl:block col-span-1"></div>

          {/* product info */}
          <div className="col-span-8 xl:col-span-11">
            <div className="flex flex-col gap-[53px]">
              {/* product title, artist and status */}
              <div className="flex flex-col gap-[20px] ">
                {product.status?.title && (
                  <div className="pb-[8px] px-[36px] pt-[4px] bg-lightestGray border border-solid border-lightGray text-medGray w-fit font-bold">
                    {product.status?.title}
                  </div>
                )}
                <div className="flex flex-col gap-[8px]">
                  <div className="product-title font-bold italic text-wrap break-words">
                    {product.title}
                  </div>
                  <h4>{`${product.artist?.firstName} ${product.artist?.lastName}`}</h4>
                </div>
              </div>
              {/* product fields */}
              <div className="border-b border-solid border-lightGray">
                <ProductField
                  keyString="Price"
                  value={getPriceFormatted(product.price)}
                />
                {product.types && product.types.length > 0 && (
                  <ProductField
                    keyString="Artwork Type"
                    value={product.types.map((type) => type.title).join(', ')}
                  />
                )}
                {product.yearCreated && product.yearCreated > 0 && (
                  <ProductField
                    keyString="Year"
                    value={product.yearCreated + ''}
                  />
                )}
                {product.editionSize && (
                  <ProductField
                    keyString="Edition Size"
                    value={product.editionSize}
                  />
                )}
                {product.height || product.width || product.depth ? (
                  <ProductField
                    keyString={`Dimensions`}
                    keySubstring={` (H \u00D7 W${
                      product.depth ? ' \u00D7 D' : ''
                    })`}
                    value={getDimensionsString(product)}
                  />
                ) : (
                  <></>
                )}
              </div>
              {/* product description */}
              <div className="grid-cols-8 xl:grid-cols-11 grid gap-x-[8px] xl:gap-x-[10px]">
                <div className="col-span-8">
                  <CustomPortableText
                    value={product.description}
                    textColorScheme="black"
                  />
                </div>
              </div>
            </div>
            {/* buy button */}
            <div className="mt-[25px]">
              {product.shopifyProductId && (
                <ShopifyBuyButton productId={product.shopifyProductId} />
              )}
            </div>
          </div>
        </div>
        {product.additionalInfo && (
          <div className="bg-lightestGray p-[35px] xl:pt-[89px] xl:pb-[97px] xl:px-[83px] flex flex-col gap-y-[56px]">
            <div className="">
              <h5 className="font-bold">More About this Product</h5>
              <CustomPortableText
                value={product.additionalInfo?.headerBlurb?.content}
                textColorScheme="black"
              />
            </div>
            {product.additionalInfo?.drawers && (
              <div className="border-b border-solid border-lightGray">
                {product.additionalInfo?.drawers.map((drawer, key) => (
                  <div
                    key={key}
                    className="flex flex-col gap-y-[22px] border-t border-solid border-lightGray pt-[18px]"
                  >
                    <Drawer
                      title={drawer.title}
                      content={drawer.content?.content}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="">
              Questions? Reach out to{' '}
              <a
                href="mailto:hello@company.com"
                rel="noreferrer noopener"
                className={`underline text-black hover:text-[#727379]`}
              >
                hello@company.com
              </a>
              .
              <CustomPortableText
                value={product.additionalInfo?.footerBlurb?.content}
                textColorScheme="black"
              />
            </div>
          </div>
        )}
        <ShareAndExplore
          settings={settings}
          typesAndTopics={[...(product.types || []), ...(product.topics || [])]}
          documentType="product"
        />
        {product.artist?.products?.length > 1 && ( // artist.products is the artist's "featured art"
          <MoreProductsBy product={product} />
        )}
        {/* Sections */}
        {product.sections && product.sections.length > 0 && (
          <div className="flex flex-col">
            {product.sections.map((section, key) => (
              <Section index={key} section={section} settings={settings} />
            ))}
          </div>
        )}
        {/* Workaround: scroll to top on route change */}
        <ScrollUp />
        {/* <div className="absolute left-0 w-screen border-t" /> */}
      </Layout>
    </>
  )
}

function MoreProductsBy({ product }) {
  let items = product.artist?.products
  // create new list of items, from after the current product wrapping around to before the current product
  if (indexOfProductInList(product, items) !== -1) {
    items = [
      ...items.slice(indexOfProductInList(product, items) + 1),
      ...items.slice(0, indexOfProductInList(product, items)),
    ]
  }
  if (items.length < 2) {
    return <></>
  }
  return (
    <CarouselTwoUp
      data={{
        items: items,
        textColorScheme: 'black',
        bgColor: null, // white background, so isColoredBackground will return false
      }}
    >
      <div className="flex flex-col gap-y-[20px] xl:gap-y-[30px]">
        <h4 className="font-bold">
          More Products
          <br /> By {product.artist.firstName} {product.artist.lastName}
        </h4>
        <ArrowLink
          href={`/art?artist=${product.artist.slug}`}
          children={<h6>Browse All</h6>}
          textColorScheme={'black'}
        />
      </div>
    </CarouselTwoUp>
  )
}

function indexOfProductInList(product, list) {
  return list.findIndex((item) => item.slug === product.slug)
}

function Drawer({
  title,
  content,
}: {
  title: string
  content: PortableTextBlock[]
}) {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <div
        className="cursor-pointer flex justify-between h-full items-center"
        onClick={handleExpand}
      >
        <h4>{title}</h4>
        <div className="relative">
          <div className="absolute right-[15px]">
            <Line />
          </div>
          <motion.div
            initial={false}
            animate={{
              rotate: expanded ? 0 : 90,
            }}
            transition={{ type: 'linear' }}
            className="absolute right-[15px]"
          >
            <Line />
          </motion.div>
        </div>
      </div>
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{
          height: expanded ? 'auto' : 0,
        }}
      >
        <div className="max-w-[444px] pt-[24px] pb-[37px]">
          <CustomPortableText value={content} textColorScheme="black" />
        </div>
      </motion.div>
    </>
  )
}

function getDimensionsString(product: ProductPayload) {
  return `${product.height && `${product.height} \u00D7 `}${
    product.width &&
    `${product.width} ${product.depth ? ` \u00D7 ${product.depth}` : ''} inches`
  }`
}

function ProductField({
  keyString,
  keySubstring,
  value,
  border = true,
}: {
  keyString: string
  keySubstring?: string
  value: string
  border?: boolean
}) {
  return (
    <div
      className={`grid grid-cols-8 xl:grid-cols-11 gap-x-[8px] xl:gap-x-[10px] py-[20px] xl:pt-[14px] xl:pb-[17px] ${
        border ? 'border-t border-solid border-lightGray' : ''
      }`}
    >
      <div className="col-span-8 xl:col-span-4">
        <span className="font-bold">{keyString}</span>
        {keySubstring}
      </div>
      <div className="col-span-8 xl:col-span-7 whitespace-nowrap overflow-hidden text-ellipsis">
        {value}
      </div>
    </div>
  )
}
