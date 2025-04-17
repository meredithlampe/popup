import { LoadingCard } from 'components/cards/LoadingCard'
import { ProductCard } from 'components/cards/ProductCard'
import { getClient } from 'lib/sanity.client'
import { getProductCountQuery, getProductGridQuery } from 'lib/sanity.queries'
import { useEffect, useState } from 'react'
import {
  ArtistPayloadLite,
  EditorialPayloadLite,
  ProductPayloadLite,
} from 'types'

import { SortBy } from './SortBy'
import { useSearchParams } from 'next/navigation'
import { SelectInput } from './Select'
import { PaginationControls } from './PaginationControls'
import { GridDisruptor } from './GridDisruptor'
import { ArtistFilter } from './filters/ArtistFilter'
import { TypeFilter } from './filters/TypeFilter'
import { TopicFilter } from './filters/TopicFilter'
import { PriceFilter } from './filters/PriceFilter'
import { SizeFilter } from './filters/SizeFilter'
import { Subscription } from 'rxjs'

interface ProductGridProps {
  defaultSort: string
  gridDisruptors?: Array<ArtistPayloadLite | EditorialPayloadLite>
  featured: Array<ProductPayloadLite>
}

const SORTS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price Ascending', value: 'priceAscending' },
  { label: 'Price Descending', value: 'priceDescending' },
]
const SORTS_WITHOUT_FEATURED = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price Ascending', value: 'priceAscending' },
  { label: 'Price Descending', value: 'priceDescending' },
]

export function ProductGrid({
  defaultSort,
  gridDisruptors,
  featured,
}: ProductGridProps) {
  const [sort, setSort] = useState(defaultSort)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<ProductPayloadLite[] | null>(null)
  const [showPerPage, setShowPerPage] = useState<null | number>(null)
  const [page, setPage] = useState<null | number>(null) // 1-indexed
  const [totalPages, setTotalPages] = useState<null | number>(null)
  const filterParams = useSearchParams()
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  // artists
  const [selectedArtistFilters, setSelectedArtistFilters] = useState<
    string[] | undefined // slugs
  >(undefined)

  // types
  const [selectedTypeFilters, setSelectedTypeFilters] = useState<
    string[] | undefined // slug
  >(undefined)

  // topics
  const [selectedTopicFilters, setSelectedTopicFilters] = useState<
    string[] | undefined // slugs
  >(undefined)

  // prices
  const [selectedPriceFilters, setSelectedPriceFilters] = useState<string[]>([])

  // sizes
  const [selectedSizeFilters, setSelectedSizeFilters] = useState<string[]>([])

  const [filterSelected, setFilterSelected] = useState(false)
  useEffect(() => {
    setFilterSelected(
      (selectedArtistFilters && selectedArtistFilters.length > 0) ||
        (selectedTypeFilters && selectedTypeFilters.length > 0) ||
        (selectedTopicFilters && selectedTopicFilters.length > 0) ||
        (selectedPriceFilters && selectedPriceFilters.length > 0) ||
        (selectedSizeFilters && selectedSizeFilters.length > 0),
    )
  }, [
    selectedArtistFilters,
    selectedTypeFilters,
    selectedTopicFilters,
    selectedPriceFilters,
    selectedSizeFilters,
  ])
  useEffect(() => {
    if (filterSelected && sort == 'featured') {
      setSort('newest')
    }
  }, [filterSelected])

  // show per page
  useEffect(() => {
    const showPerPageFromURL = filterParams?.get('show')
    setShowPerPage(showPerPageFromURL ? parseInt(showPerPageFromURL) : 24)
  }, [filterParams])

  // page
  useEffect(() => {
    const pageFromURL = filterParams?.get('page')
    setPage(pageFromURL ? parseInt(pageFromURL) : 1)
  }, [filterParams])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const client = getClient()
      if (
        selectedArtistFilters &&
        selectedTypeFilters &&
        selectedTopicFilters &&
        showPerPage &&
        page
      ) {
        if (subscription) {
          subscription.unsubscribe()
        }
        const currSubscription = client.observable
          .fetch<ProductPayloadLite[]>(
            getProductGridQuery(
              sort,
              selectedArtistFilters,
              selectedTypeFilters,
              selectedTopicFilters,
              selectedPriceFilters,
              selectedSizeFilters,
              showPerPage,
              page,
              sort == 'featured' ? featured : [], // if featured is not empty, add a filter to exclude the featured products as we'll prepend them below
            ),
          )
          .subscribe((products) => {
            if (sort == 'featured' && page == 1) {
              const newestProductsAfterFeatured = products.filter((product) => {
                let inFeatured = false
                featured.map((featuredProduct) => {
                  if (featuredProduct.slug == product.slug) {
                    inFeatured = true
                  }
                })
                return !inFeatured
              })
              setProducts(featured.concat(newestProductsAfterFeatured))
            } else {
              setProducts(products)
            }
            setLoading(false)
          })
        setSubscription(currSubscription)
      }
    }
    fetchProducts()
  }, [
    sort,
    selectedArtistFilters,
    selectedTypeFilters,
    selectedTopicFilters,
    selectedPriceFilters,
    selectedSizeFilters,
    showPerPage,
    page,
  ])

  useEffect(() => {
    const fetchProductCount = async () => {
      const client = getClient()
      if (
        selectedArtistFilters &&
        selectedTypeFilters &&
        selectedTopicFilters &&
        showPerPage
      ) {
        const productCount = await client.fetch<number>(
          getProductCountQuery(
            selectedArtistFilters,
            selectedTypeFilters,
            selectedTopicFilters,
            selectedPriceFilters,
            selectedSizeFilters,
          ),
        )
        setTotalPages(Math.ceil(productCount / showPerPage))
      }
    }
    fetchProductCount()
  }, [
    selectedArtistFilters,
    selectedTypeFilters,
    selectedTopicFilters,
    selectedPriceFilters,
    selectedSizeFilters,
    showPerPage,
  ])

  return (
    <div className="custom-grid custom-gap gap-y-[23px] xl:gap-y-[61px]">
      {/* sort by dropdown */}
      <div className="col-span-8 xl:col-span-5">
        <SortBy
          sort={sort}
          setSort={(x) => {
            setSort(x.value)
            if (x.value == featured) {
              setSelectedTopicFilters([])
              setSelectedTypeFilters([])
              setSelectedArtistFilters([])
              setSelectedPriceFilters([])
              setSelectedSizeFilters([])
            }
            setPage(1)
          }}
          value={
            featured.length > 0
              ? SORTS.find((x) => x.value == sort)
              : SORTS_WITHOUT_FEATURED.find((x) => x.value == sort)
          }
          options={featured.length > 0 ? SORTS : SORTS_WITHOUT_FEATURED}
        />
      </div>

      {/* show per page */}
      <div className="col-start-1 col-end-9 xl:col-start-21 xl:col-end-25">
        <SelectInput
          options={[
            { label: '25 per page', value: 24 },
            { label: '50 per page', value: 50 },
            { label: '100 per page', value: 100 },
          ]}
          name="sort"
          onChange={(x) => {
            setShowPerPage(x.value)
            setPage(1)
          }}
          placeholder={`25 per page`}
        />
      </div>

      {/* filters */}
      <div className="col-span-8 xl:col-span-24 custom-grid custom-gap gap-y-[23px] mb-[13px] xl:mb-[0px]">
        {/* artists */}
        <div className="col-span-8 xl:col-span-5">
          <ArtistFilter
            onChange={() => {
              if (sort == 'featured') {
                setSort('newest')
              }
            }}
            selectedArtistFilters={selectedArtistFilters}
            setSelectedArtistFilters={setSelectedArtistFilters}
            setPage={setPage}
            filterParams={filterParams}
            selectedTypeFilters={selectedTypeFilters}
            selectedTopicFilters={selectedTopicFilters}
            selectedPriceFilters={selectedPriceFilters}
            selectedSizeFilters={selectedSizeFilters}
          />
        </div>

        {/* type */}
        <div className="col-span-8 xl:col-span-5 flex flex-col gap-y-[9px]">
          <TypeFilter
            onChange={() => {
              if (sort == 'featured') {
                setSort('newest')
              }
            }}
            filterParams={filterParams}
            selectedTypeFilters={selectedTypeFilters}
            setSelectedTypeFilters={setSelectedTypeFilters}
            setPage={setPage}
            selectedTopicFilters={selectedTopicFilters}
            selectedArtistFilters={selectedArtistFilters}
            selectedPriceFilters={selectedPriceFilters}
            selectedSizeFilters={selectedSizeFilters}
          />
        </div>

        {/* topic */}
        <div className="col-span-8 xl:col-span-5 flex flex-col gap-y-[9px]">
          <TopicFilter
            onChange={() => {
              if (sort == 'featured') {
                setSort('newest')
              }
            }}
            filterParams={filterParams}
            setSelectedTopicFilters={setSelectedTopicFilters}
            selectedTopicFilters={selectedTopicFilters}
            setPage={setPage}
            selectedArtistFilters={selectedArtistFilters}
            selectedTypeFilters={selectedTypeFilters}
            selectedPriceFilters={selectedPriceFilters}
            selectedSizeFilters={selectedSizeFilters}
          />
        </div>

        {/* price */}
        <div className="col-span-8 xl:col-span-5 flex flex-col gap-y-[9px]">
          <PriceFilter
            onChange={() => {
              if (sort == 'featured') {
                setSort('newest')
              }
            }}
            setSelectedPriceFilters={setSelectedPriceFilters}
            setPage={setPage}
            selectedArtistFilters={selectedArtistFilters}
            selectedTypeFilters={selectedTypeFilters}
            selectedTopicFilters={selectedTopicFilters}
            selectedPriceFilters={selectedPriceFilters}
            selectedSizeFilters={selectedSizeFilters}
          />
        </div>

        {/* size */}
        <div className="col-span-8 xl:col-span-4">
          <SizeFilter
            onChange={() => {
              if (sort == 'featured') {
                setSort('newest')
              }
            }}
            setSelectedSizeFilters={setSelectedSizeFilters}
            setPage={setPage}
            selectedArtistFilters={selectedArtistFilters}
            selectedTypeFilters={selectedTypeFilters}
            selectedTopicFilters={selectedTopicFilters}
            selectedPriceFilters={selectedPriceFilters}
            selectedSizeFilters={selectedSizeFilters}
          />
        </div>
      </div>

      {/* product grid */}
      {loading || !page || !showPerPage ? (
        <>
          <div className="col-span-8">
            <LoadingCard />
          </div>
          <div className="col-span-8">
            <LoadingCard aspectRatio="[5/4]" />
          </div>
          <div className="col-span-8">
            <LoadingCard aspectRatio="[5/6]" />
          </div>
        </>
      ) : (
        <>
          {products?.map((artwork, index) => {
            return (
              <>
                <div key={index} className="col-span-8">
                  <ProductCard product={artwork} />
                </div>
                {!filterSelected && (
                  <GridDisruptor
                    index={index}
                    page={page}
                    showPerPage={showPerPage}
                    gridDisruptors={gridDisruptors}
                  />
                )}
              </>
            )
          })}
        </>
      )}
      <div className="col-span-8 xl:col-span-24">
        {page && totalPages && totalPages > 1 && (
          <PaginationControls
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  )
}
