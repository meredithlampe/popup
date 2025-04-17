import { getClient } from 'lib/sanity.client'
import { MultiSelect, MultiSelectOption } from '../MultiSelect'
import { useEffect, useState } from 'react'
import { getProductCountQuery } from 'lib/sanity.queries'

export function PriceFilter({
  onChange,
  setSelectedPriceFilters,
  selectedArtistFilters,
  selectedTypeFilters,
  selectedTopicFilters,
  selectedPriceFilters,
  selectedSizeFilters,
  setPage,
}) {
  const [priceFilters, setPriceFilters] = useState<[any, number][]>([])
  const client = getClient()
  useEffect(() => {
    const fetchPrices = async () => {
      const prices = [
        { label: 'under $1,000', value: '0-1000' },
        { label: '$1,000 - $5,000', value: '1000-5000' },
        { label: '5,000 - $15,000', value: '5000-15000' },
        { label: '$15,000 +', value: '15000' },
      ]
      const priceFiltersAndQuantities: [any, number][] = await Promise.all(
        prices.map(async (price): Promise<[any, number]> => {
          const productCount = await client.fetch<number>(
            getProductCountQuery(
              selectedArtistFilters ?? [],
              selectedTypeFilters ?? [],
              selectedTopicFilters ?? [],
              [price.value],
              selectedSizeFilters,
            ),
          )
          return [price, productCount]
        }),
      )
      setPriceFilters(priceFiltersAndQuantities)
    }
    fetchPrices()
  }, [
    selectedArtistFilters,
    selectedTypeFilters,
    selectedTopicFilters,
    selectedSizeFilters,
  ])
  return (
    <div className="flex flex-col gap-y-[9px]">
      <span className="font-bold">Price</span>
      <MultiSelect
        name="price"
        value={selectedPriceFilters?.map((x) =>
          convertPriceToMultiSelectOption(
            priceFilters.find((y) => y[0].value === x) as [any, number],
            selectedPriceFilters,
          ),
        )}
        options={priceFilters.map((priceFilter) => {
          return convertPriceToMultiSelectOption(
            priceFilters.find((y) => y[0].value === priceFilter[0].value) as [
              any,
              number,
            ],
            selectedPriceFilters,
          )
        })}
        onChange={(x) => {
          setSelectedPriceFilters(x.map((y) => y.value))
          setPage(1)
          onChange()
        }}
      />
    </div>
  )
}

function convertPriceToMultiSelectOption(
  priceAndQuantity: [any, number],
  selectedPriceFilters: string[],
): MultiSelectOption {
  return {
    label: `${priceAndQuantity[0].label} ${
      selectedPriceFilters.find((x) => x == priceAndQuantity[0].value)
        ? ''
        : `(${priceAndQuantity[1]})`
    }`,
    quantityIfSelected: priceAndQuantity[1],
    value: priceAndQuantity[0].value,
  }
}
