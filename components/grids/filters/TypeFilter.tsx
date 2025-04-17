import { getClient } from 'lib/sanity.client'
import { getProductCountQuery, productTypesQuery } from 'lib/sanity.queries'
import { useEffect, useState } from 'react'
import { ProductType } from 'types'
import { MultiSelect, MultiSelectOption } from '../MultiSelect'

export function TypeFilter({
  onChange,
  filterParams,
  selectedTypeFilters,
  selectedTopicFilters,
  setSelectedTypeFilters,
  selectedArtistFilters,
  selectedPriceFilters,
  selectedSizeFilters,
  setPage,
}) {
  const [typeQueryFilters, setTypeQueryFilters] = useState<
    string[] | undefined
  >(filterParams?.getAll('type'))
  useEffect(() => {
    setTypeQueryFilters(filterParams?.getAll('type') ?? [])
  }, [filterParams])

  // get types from URL
  useEffect(() => {
    setSelectedTypeFilters(typeQueryFilters)
  }, [typeQueryFilters])

  // set up state for storing type filters (all types that appear in menu)
  const [typeFilters, setTypeFilters] = useState<[ProductType, number][]>([])

  // get all types to show in dropdown
  useEffect(() => {
    const fetchTypes = async () => {
      const client = getClient()
      const types = await client.fetch<ProductType[]>(productTypesQuery)

      // get additional info for each type: how many products would be shown
      // if type artist was selected
      var typeFiltersWithQuantity: [ProductType, number][] = await Promise.all(
        types.map(async (type): Promise<[ProductType, number]> => {
          const productCount = await client.fetch<number>(
            getProductCountQuery(
              selectedArtistFilters ?? [],
              [type.slug],
              selectedTopicFilters ?? [],
              selectedPriceFilters,
              selectedSizeFilters,
            ),
          )
          return [type, productCount]
        }),
      )
      setTypeFilters(typeFiltersWithQuantity)
    }
    fetchTypes()
  }, [
    selectedTypeFilters,
    selectedArtistFilters,
    selectedTopicFilters,
    selectedPriceFilters,
    selectedSizeFilters,
  ])

  return (
    <div className="flex flex-col gap-y-[9px]">
      <span className="font-bold">Type</span>
      {typeFilters && typeFilters.length > 0 ? (
        <MultiSelect
          name="type"
          value={selectedTypeFilters?.map((x) => {
            return convertTypePayloadLiteToMultiSelectOption(
              typeFilters.find((y) => y[0].slug === x) as [ProductType, number],
              selectedTypeFilters,
            )
          })}
          options={typeFilters.map((typeFilter) => {
            return convertTypePayloadLiteToMultiSelectOption(
              typeFilter,
              selectedTypeFilters,
            )
          })}
          onChange={(x) => {
            setSelectedTypeFilters(x.map((y) => y.value))
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

function convertTypePayloadLiteToMultiSelectOption(
  typeAndQuantity: [ProductType, number],
  selectedTypeFilters: string[], // slugs
): MultiSelectOption {
  return {
    label: `${typeAndQuantity[0].title} ${
      selectedTypeFilters.find((x) => x === typeAndQuantity[0].slug)
        ? ''
        : ` (${typeAndQuantity[1]})`
    }`,
    quantityIfSelected: typeAndQuantity[1],
    value: typeAndQuantity[0].slug,
  }
}
