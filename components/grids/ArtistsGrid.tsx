import { LoadingCard } from 'components/cards/LoadingCard'
import { getClient } from 'lib/sanity.client'
import {
  getArtistsGridQuery,
  productTypesQuery,
  topicsQuery,
} from 'lib/sanity.queries'
import { ReactNode, useEffect, useState } from 'react'
import {
  ArtistPayloadLite,
  EditorialPayloadLite,
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
  GRID_DISRUPTOR_INDICES,
} from './utils'
import { ArtistCard } from 'components/cards/ArtistCard'

interface ArtistsGridProps {
  defaultSort: string
  gridDisruptors?: Array<ArtistPayloadLite | EditorialPayloadLite>
  featured: Array<ArtistPayloadLite>
}

export function ArtistsGrid({
  defaultSort,
  gridDisruptors,
  featured,
}: ArtistsGridProps) {
  const [sort, setSort] = useState(defaultSort)
  const [loading, setLoading] = useState(true)
  const [artists, setArtists] = useState<ArtistPayloadLite[] | null>(null)
  const filterParams = useSearchParams()

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

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true)
      const client = getClient()
      if (selectedTypeFiters && selectedTopicFilters) {
        const artists = await client.fetch<ArtistPayloadLite[]>(
          getArtistsGridQuery(
            sort == 'featured' ? 'newest' : sort,
            selectedTypeFiters.map((x) => x.value),
            selectedTopicFilters.map((x) => x.value),
          ),
        )
        if (sort == 'featured') {
          const newestArtistsAfterFeatured = artists.filter((artist) => {
            let inFeatured = false
            featured.map((featuredArtist) => {
              if (featuredArtist.slug == artist.slug) {
                inFeatured = true
              }
            })
            return !inFeatured
          })
          setArtists(featured.concat(newestArtistsAfterFeatured))
        } else {
          setArtists(artists)
        }
        setLoading(false)
      }
    }
    fetchArtists()
  }, [sort, selectedTypeFiters, selectedTopicFilters])

  useEffect(() => {
    const fetchTypes = async () => {
      const client = getClient()
      const types = await client.fetch<ProductType[]>(productTypesQuery)
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

  return (
    <div className="custom-grid custom-gap gap-y-[23px] xl:gap-y-[61px]">
      {/* sort by dropdown */}
      <div className="col-span-8 xl:col-span-24 custom-grid custom-gap">
        <div className="col-span-8 xl:col-span-5">
          <SortBy
            sort={sort}
            setSort={(x) => {
              setSort(x.value)
            }}
            options={
              featured.length > 0
                ? [
                    { label: 'Featured', value: 'featured' },
                    { label: 'Newest', value: 'newest' },
                    { label: 'A-Z', value: 'alphabetical_asc' },
                    { label: 'Z-A', value: 'alphabetical_desc' },
                  ]
                : [
                    { label: 'Newest', value: 'newest' },
                    { label: 'A-Z', value: 'alphabetical_asc' },
                    { label: 'Z-A', value: 'alphabetical_desc' },
                  ]
            }
          />
        </div>
      </div>

      {/* filters */}
      {/* add custom-grid back here */}
      <div className="hidden col-span-8 xl:col-span-24  custom-gap gap-y-[23px] mb-[13px] xl:mb-[0px]">
        {/* type */}
        <div className="col-span-8 xl:col-span-5 flex flex-col gap-y-[9px]">
          <span className="font-bold">Type</span>
          <MultiSelect
            name="type"
            value={selectedTypeFiters}
            options={typeFilters.map(convertTypePayloadLiteToMultiSelectOption)}
            onChange={(x) => {
              setSelectedTypeFilters(x)
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
            }}
          />
        </div>
      </div>

      {/* artist grid */}
      {loading ? (
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
          {artists?.map((artist, index) => {
            let gridDisruptor: ReactNode | null = null
            if (
              GRID_DISRUPTOR_INDICES.includes(index) &&
              gridDisruptors &&
              index !== 0
            ) {
              const disruptorIndex = GRID_DISRUPTOR_INDICES.indexOf(index)
              if (disruptorIndex < gridDisruptors.length) {
                const disruptor = gridDisruptors[disruptorIndex]
                const type = disruptor?._type
                gridDisruptor = (
                  <div key={`${index}A`} className="col-span-8 xl:col-span-16">
                    {type == 'editorial' && (
                      <>
                        <EditorialCard
                          editorial={disruptor as EditorialPayloadLite}
                          textColorScheme={'black'}
                        />
                      </>
                    )}
                  </div>
                )
              }
            }
            return (
              <>
                <div key={index} className="col-span-8">
                  <ArtistCard artist={artist} textColorScheme="black" />
                </div>
                {gridDisruptor}
              </>
            )
          })}
        </>
      )}
    </div>
  )
}
