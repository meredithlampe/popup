import { ArtistPayloadLite } from 'types'
import { MultiSelect, MultiSelectOption } from '../MultiSelect'
import { useEffect, useState } from 'react'
import { getClient } from 'lib/sanity.client'
import { artistNamesQuery, getProductCountQuery } from 'lib/sanity.queries'

export function ArtistFilter({
  onChange,
  filterParams,
  selectedArtistFilters,
  selectedTypeFilters,
  selectedTopicFilters,
  selectedPriceFilters,
  selectedSizeFilters,
  setSelectedArtistFilters,
  setPage,
}) {
  // get artits filters pre-fill from url
  const [artistQueryFilters, setArtistQueryFilters] = useState<
    string[] | undefined
  >(filterParams?.getAll('artist'))
  useEffect(() => {
    setArtistQueryFilters(filterParams?.getAll('artist') ?? [])
  }, [filterParams])

  // set up state for storing artist filters (all artists that appear in menu)
  const [artistFilters, setArtistFilters] = useState<
    [ArtistPayloadLite, number][]
  >([])

  useEffect(() => {
    const fetchArtists = async () => {
      const client = getClient()

      // get all artists to show in dropdown
      const artists = await client.fetch<ArtistPayloadLite[]>(artistNamesQuery)

      // get additional info for each artist: how many products would be shown
      // if that artist was selected
      var artistFiltersWithQuantity: [ArtistPayloadLite, number][] =
        await Promise.all(
          artists.map(async (artist): Promise<[ArtistPayloadLite, number]> => {
            const productCount = await client.fetch<number>(
              getProductCountQuery(
                [artist.slug],
                selectedTypeFilters ?? [],
                selectedTopicFilters ?? [],
                selectedPriceFilters,
                selectedSizeFilters,
              ),
            )
            return [artist, productCount]
          }),
        )
      setArtistFilters(artistFiltersWithQuantity)
    }
    fetchArtists()
  }, [
    selectedTypeFilters,
    selectedTopicFilters,
    selectedPriceFilters,
    selectedSizeFilters,
  ])

  useEffect(() => {
    setSelectedArtistFilters(artistQueryFilters)
  }, [artistQueryFilters])

  return (
    <div className="flex flex-col gap-y-[9px]">
      <span className="font-bold">Artist</span>
      {artistFilters && artistFilters.length > 0 ? (
        <MultiSelect
          name="artists"
          value={selectedArtistFilters?.map((x) =>
            convertArtistPayloadLiteToMultiSelectOption(
              artistFilters.find((y) => y[0].slug === x) as [
                ArtistPayloadLite,
                number,
              ],
              selectedArtistFilters,
            ),
          )}
          options={artistFilters.map((artistFilter) => {
            return convertArtistPayloadLiteToMultiSelectOption(
              artistFilter,
              selectedArtistFilters,
            )
          })}
          onChange={(x) => {
            setSelectedArtistFilters(x.map((y) => y.value))
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

function convertArtistPayloadLiteToMultiSelectOption(
  artistAndQuantity: [ArtistPayloadLite, number],
  selectedArtistFilters?: string[], // slugs
): MultiSelectOption {
  return {
    label: `${artistAndQuantity[0].firstName} ${
      artistAndQuantity[0].lastName
    } ${
      selectedArtistFilters?.find((x) => x === artistAndQuantity[0].slug)
        ? ''
        : `(${artistAndQuantity[1]})`
    }`,
    quantityIfSelected: artistAndQuantity[1],
    value: artistAndQuantity[0].slug,
  }
}
