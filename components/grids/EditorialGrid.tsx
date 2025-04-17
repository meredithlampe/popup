import { LoadingCard } from 'components/cards/LoadingCard'
import { getClient } from 'lib/sanity.client'
import {
  editorialTypesQuery,
  getEditorialCountQuery,
  getEditorialGridQuery,
  topicsQuery,
} from 'lib/sanity.queries'
import { useEffect, useState } from 'react'
import {
  ArtistPayloadLite,
  EditorialPayloadLite,
  EditorialType,
  ProductType,
  Topic,
} from 'types'

import { MultiSelect, MultiSelectOption } from './MultiSelect'
import { SortBy } from './SortBy'
import { EditorialCard } from 'components/cards/EditorialCard'
import { useSearchParams } from 'next/navigation'
import {
  convertTopicPayloadLiteToMultiSelectOption,
  convertTypePayloadLiteToMultiSelectOption,
} from './utils'
import { SelectInput } from './Select'
import { PaginationControls } from './PaginationControls'
import { GridDisruptor } from './GridDisruptor'
import { Subscription } from 'rxjs'

interface EditorialGridProps {
  defaultSort: string
  gridDisruptors?: Array<ArtistPayloadLite | EditorialPayloadLite>
  featured: Array<EditorialPayloadLite>
}

const SORTS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
]
const SORTS_WITHOUT_FEATURED = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
]

const PER_PAGE_OPTIONS = [
  { label: '25 per page', value: 25 },
  { label: '50 per page', value: 50 },
  { label: '100 per page', value: 100 },
]

export function EditorialGrid({
  defaultSort,
  gridDisruptors,
  featured,
}: EditorialGridProps) {
  const [sort, setSort] = useState(defaultSort)
  const [loading, setLoading] = useState(true)
  const [editorials, setEditorials] = useState<EditorialPayloadLite[] | null>(
    null,
  )
  const [showPerPage, setShowPerPage] = useState<null | number>(null)
  const [page, setPage] = useState<null | number>(null) // 1-indexed
  const [totalPages, setTotalPages] = useState<null | number>(null)
  const filterParams = useSearchParams()
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  // types
  const [typeQueryFilters, setTypeQueryFilters] = useState<
    string[] | undefined
  >(filterParams?.getAll('type'))
  useEffect(() => {
    setTypeQueryFilters(filterParams?.getAll('type') ?? [])
  }, [filterParams])
  const [typeFilters, setTypeFilters] = useState<ProductType[]>([])
  const [selectedTypeFiters, setSelectedTypeFilters] = useState<
    MultiSelectOption[] | undefined
  >(undefined)

  // topics
  const [topicQueryFilters, setTopicQueryFilters] = useState<
    string[] | undefined
  >(filterParams?.getAll('topic'))
  useEffect(() => {
    setTopicQueryFilters(filterParams?.getAll('topic') ?? [])
  }, [filterParams])
  const [topicFilters, setTopicFilters] = useState<Topic[]>([])
  const [selectedTopicFilters, setSelectedTopicFilters] = useState<
    MultiSelectOption[] | undefined
  >(undefined)

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
    const fetchEditorials = async () => {
      setLoading(true)
      const client = getClient()
      if (selectedTypeFiters && selectedTopicFilters && showPerPage && page) {
        if (subscription) {
          subscription.unsubscribe()
        }
        const currSubscription = client.observable
          .fetch<EditorialPayloadLite[]>(
            getEditorialGridQuery(
              sort == 'featured' ? 'newest' : sort,
              selectedTypeFiters.map((x) => x.value),
              selectedTopicFilters.map((x) => x.value),
              showPerPage,
              page,
            ),
          )
          .subscribe((editorials) => {
            if (sort == 'featured') {
              const newestEditorialsAfterFeatured = editorials.filter(
                (editorial) => {
                  let inFeatured = false
                  featured.map((featuredEditorial) => {
                    if (featuredEditorial.slug == editorial.slug) {
                      inFeatured = true
                    }
                  })
                  return !inFeatured
                },
              )
              setEditorials(featured.concat(newestEditorialsAfterFeatured))
            } else {
              setEditorials(editorials)
            }
            setLoading(false)
          })
        setSubscription(currSubscription)
      }
    }
    fetchEditorials()
  }, [sort, selectedTypeFiters, selectedTopicFilters, showPerPage, page])

  useEffect(() => {
    const fetchEditorialCount = async () => {
      const client = getClient()
      if (selectedTypeFiters && selectedTopicFilters && showPerPage) {
        const editorialCount = await client.fetch<number>(
          getEditorialCountQuery(
            selectedTypeFiters.map((x) => x.value),
            selectedTopicFilters.map((x) => x.value),
          ),
        )
        setTotalPages(Math.ceil(editorialCount / showPerPage))
      }
    }
    fetchEditorialCount()
  }, [selectedTypeFiters, selectedTopicFilters, showPerPage])

  useEffect(() => {
    const fetchTypes = async () => {
      const client = getClient()
      const types = await client.fetch<EditorialType[]>(editorialTypesQuery)
      setTypeFilters(types)
    }
    fetchTypes()
  }, [])

  // use types to get title for selected filters passed in via url
  useEffect(() => {
    // use types to get title for selected filters passed in via url
    const selectedFilters = typeFilters.filter(
      (type) => typeQueryFilters?.includes(type.slug),
    )
    setSelectedTypeFilters(
      selectedFilters.map(convertTypePayloadLiteToMultiSelectOption),
    )
  }, [typeQueryFilters, typeFilters])

  // get all topics to show in dropdown
  useEffect(() => {
    const fetchTopics = async () => {
      const client = getClient()
      const topics = await client.fetch<Topic[]>(topicsQuery)
      setTopicFilters(topics)
    }
    fetchTopics()
  }, [])

  // use topics to get title for selected filters passed in via url
  useEffect(() => {
    const selectedFilters = topicFilters.filter((topic) => {
      return topicQueryFilters?.includes(topic.slug)
    })
    const newFilters = selectedFilters.map(
      convertTopicPayloadLiteToMultiSelectOption,
    )
    setSelectedTopicFilters(newFilters)
  }, [topicQueryFilters, topicFilters])

  const [filterSelected, setFilterSelected] = useState(false)
  useEffect(() => {
    setFilterSelected(
      (selectedTypeFiters != undefined && selectedTypeFiters.length > 0) ||
        (selectedTopicFilters != undefined && selectedTopicFilters.length > 0),
    )
  }, [selectedTopicFilters, selectedTypeFiters])
  useEffect(() => {
    if (filterSelected && sort == 'featured') {
      setSort('newest')
    }
  }, [filterSelected])

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
            }
            setPage(1)
          }}
          value={SORTS.find((x) => x.value == sort)}
          options={featured.length > 0 ? SORTS : SORTS_WITHOUT_FEATURED}
        />
      </div>

      {/* show per page */}
      <div className="col-start-1 col-end-9 xl:col-start-21 xl:col-end-25">
        <SelectInput
          options={PER_PAGE_OPTIONS}
          name="sort"
          value={PER_PAGE_OPTIONS.find((x) => x.value == showPerPage)}
          onChange={(x) => {
            setShowPerPage(x.value)
            setPage(1)
          }}
          placeholder={`25 per page`}
        />
      </div>

      {/* filters */}
      <div className="col-span-8 xl:col-span-24 custom-grid custom-gap gap-y-[23px] mb-[13px] xl:mb-[0px]">
        {/* type */}
        <div className="col-span-8 xl:col-span-5 flex flex-col gap-y-[9px]">
          <span className="font-bold">Type</span>
          <MultiSelect
            name="type"
            value={selectedTypeFiters}
            options={typeFilters.map(convertTypePayloadLiteToMultiSelectOption)}
            onChange={(x) => {
              setSelectedTypeFilters(x)
              if (sort == 'featured') {
                setSort('newest')
              }
              setPage(1)
            }}
          />
        </div>

        {/* topic */}
        <div className="col-span-8 xl:col-span-5 flex flex-col gap-y-[9px]">
          <span className="font-bold">Topic</span>
          <MultiSelect
            name="topic"
            value={selectedTopicFilters}
            options={topicFilters.map(
              convertTopicPayloadLiteToMultiSelectOption,
            )}
            onChange={(x) => {
              setSelectedTopicFilters(x)
              if (sort == 'featured') {
                setSort('newest')
              }
              setPage(1)
            }}
          />
        </div>
      </div>

      {/* editorial grid */}
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
          {editorials?.map((editorial, index) => {
            return (
              <>
                <div key={index} className="col-span-8">
                  <EditorialCard
                    editorial={editorial}
                    shortSummaryWider={true}
                    textColorScheme="black"
                  />
                </div>
                {!filterSelected ? (
                  <GridDisruptor
                    index={index}
                    page={page}
                    showPerPage={showPerPage}
                    gridDisruptors={gridDisruptors}
                  />
                ) : (
                  <></>
                )}
              </>
            )
          })}
        </>
      )}
      <div className="col-span-8 xl:col-span-24">
        {page && totalPages && totalPages > 1 ? (
          <PaginationControls
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
