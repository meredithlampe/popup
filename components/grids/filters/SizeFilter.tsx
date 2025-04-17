import { getClient } from 'lib/sanity.client'
import { getProductCountQuery } from 'lib/sanity.queries'
import { useEffect, useState } from 'react'
import { MultiSelect, MultiSelectOption } from '../MultiSelect'

export function SizeFilter({
  onChange,
  selectedArtistFilters,
  selectedTypeFilters,
  selectedTopicFilters,
  selectedPriceFilters,
  selectedSizeFilters,
  setSelectedSizeFilters,
  setPage,
}) {
  const [sizeFilters, setSizeFilters] = useState<[any, number][]>([])
  const client = getClient()
  useEffect(() => {
    const fetchSizes = async () => {
      const sizes = [
        { label: 'Small', value: '0-225' }, // 15 * 15
        { label: 'Medium', value: '256-750' }, // 16 * 16 - 25 * 30
        { label: 'Large', value: '806-2400' }, // 26 * 31 - 40 * 60
        { label: 'Extra-Large', value: '2460' }, // 41 * 61
      ]
      const sizeFiltersAndQuantities: [any, number][] = await Promise.all(
        sizes.map(async (size): Promise<[any, number]> => {
          const productCount = await client.fetch<number>(
            getProductCountQuery(
              selectedArtistFilters ?? [],
              selectedTypeFilters ?? [],
              selectedTopicFilters ?? [],
              selectedPriceFilters,
              [size.value + ''],
            ),
          )
          return [size, productCount]
        }),
      )
      setSizeFilters(sizeFiltersAndQuantities)
    }
    fetchSizes()
  }, [
    selectedArtistFilters,
    selectedTypeFilters,
    selectedTopicFilters,
    selectedPriceFilters,
  ])
  return (
    <div className="flex flex-col gap-y-[9px]">
      <span className="font-bold">Size</span>
      <MultiSelect
        name="size"
        value={selectedSizeFilters?.map((x) =>
          convertSizeToMultiSelectOption(
            sizeFilters.find((y) => y[0].value === x) as [any, number],
            selectedSizeFilters,
          ),
        )}
        options={sizeFilters.map((sizeFilter) => {
          return convertSizeToMultiSelectOption(
            sizeFilters.find((y) => y[0].value === sizeFilter[0].value) as [
              any,
              number,
            ],
            selectedSizeFilters,
          )
        })}
        onChange={(selectedOptions) => {
          setSelectedSizeFilters(
            selectedOptions.map((option) => option.value as string),
          )
          setPage(1)
          onChange()
        }}
      />
    </div>
  )
}

function convertSizeToMultiSelectOption(
  sizeAndQuantity: [any, number],
  selectedSizeFilters: string[],
): MultiSelectOption {
  return {
    label: `${sizeAndQuantity[0].label} ${
      selectedSizeFilters.find((x) => x == sizeAndQuantity[0].value)
        ? ''
        : `(${sizeAndQuantity[1]})`
    }`,
    quantityIfSelected: sizeAndQuantity[1],
    value: sizeAndQuantity[0].value,
  }
}
