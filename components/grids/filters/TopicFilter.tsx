import { getClient } from 'lib/sanity.client'
import { getProductCountQuery, topicsQuery } from 'lib/sanity.queries'
import { useEffect, useState } from 'react'
import { Topic } from 'types'
import { MultiSelect, MultiSelectOption } from '../MultiSelect'

export function TopicFilter({
  onChange,
  filterParams,
  setSelectedTopicFilters,
  selectedTopicFilters,
  selectedArtistFilters,
  selectedTypeFilters,
  selectedPriceFilters,
  selectedSizeFilters,
  setPage,
}) {
  const [topicQueryFilters, setTopicQueryFilters] = useState<
    string[] | undefined
  >(filterParams?.getAll('topic'))
  useEffect(() => {
    setTopicQueryFilters(filterParams?.getAll('topic') ?? undefined)
  }, [filterParams])

  // get topics from url
  useEffect(() => {
    setSelectedTopicFilters(topicQueryFilters)
  }, [topicQueryFilters])

  // set up state for storing topic filters (all topics that appear in menu)
  const [topicFilters, setTopicFilters] = useState<[Topic, number][]>([])

  // get all topics to show in dropdown
  useEffect(() => {
    const fetchTopics = async () => {
      const client = getClient()
      const topics = await client.fetch<Topic[]>(topicsQuery)

      // get additional info for each topic: how many products would be shown
      // if that topic was selected
      var topicFiltersWithQuantity: [Topic, number][] = await Promise.all(
        topics.map(async (topic): Promise<[Topic, number]> => {
          const productCount = await client.fetch<number>(
            getProductCountQuery(
              selectedArtistFilters ?? [],
              selectedTypeFilters ?? [],
              [topic.slug],
              selectedPriceFilters,
              selectedSizeFilters,
            ),
          )
          return [topic, productCount]
        }),
      )
      setTopicFilters(topicFiltersWithQuantity)
    }
    fetchTopics()
  }, [
    selectedTypeFilters,
    selectedArtistFilters,
    selectedTopicFilters,
    selectedPriceFilters,
    selectedSizeFilters,
  ])

  return (
    <div className="flex flex-col gap-y-[9px]">
      <span className="font-bold">Topic</span>
      {topicFilters && topicFilters.length > 0 ? (
        <MultiSelect
          name="topic"
          value={selectedTopicFilters?.map((x) => {
            return convertTopicPayloadLiteToMultiSelectOption(
              topicFilters.find((y) => y[0].slug === x) as [Topic, number],
              selectedTopicFilters,
            )
          })}
          options={topicFilters.map((topicFilter) => {
            return convertTopicPayloadLiteToMultiSelectOption(
              topicFilter,
              selectedTopicFilters,
            )
          })}
          onChange={(x) => {
            setSelectedTopicFilters(x.map((y) => y.value))
            setPage(1)
            onChange()
          }}
        />
      ) : (
        <MultiSelect />
      )}
    </div>
  )
}

function convertTopicPayloadLiteToMultiSelectOption(
  topicAndQuantity: [Topic, number],
  selectedTopicFilters: string[],
): MultiSelectOption {
  return {
    label: `${topicAndQuantity[0].title} ${
      selectedTopicFilters.find((x) => x === topicAndQuantity[0].slug)
        ? ''
        : ` (${topicAndQuantity[1]})`
    }`,
    quantityIfSelected: topicAndQuantity[1],
    value: topicAndQuantity[0].slug,
  }
}
