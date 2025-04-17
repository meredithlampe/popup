import { EditorialCard } from 'components/cards/EditorialCard'
import { GRID_DISRUPTOR_INDICES } from './utils'
import { ArtistPayloadLite, EditorialPayloadLite } from 'types'
import { ArtistCard } from 'components/cards/ArtistCard'
import { isColoredBackground } from 'lib/utils'

export function GridDisruptor({
  index,
  page,
  showPerPage,
  gridDisruptors,
  bgColor,
}) {
  if (
    GRID_DISRUPTOR_INDICES.includes(index + (page - 1) * showPerPage) &&
    gridDisruptors &&
    index !== 0
  ) {
    const disruptorIndex = GRID_DISRUPTOR_INDICES.indexOf(
      index + (page - 1) * showPerPage,
    )
    if (disruptorIndex < gridDisruptors.length) {
      const disruptor = gridDisruptors[disruptorIndex]
      const type = disruptor?._type
      return (
        <div key={`${index}A`} className="col-span-8 xl:col-span-16">
          {type == 'editorial' && (
            <EditorialCard
              editorial={disruptor as EditorialPayloadLite}
              textColorScheme={'black'}
              isOnColoredBackground={isColoredBackground(bgColor)}
            />
          )}
          {type == 'artist' && (
            <div className="flex flex-col gap-y-[10px]">
              <ArtistCard
                artist={disruptor as ArtistPayloadLite}
                textColorScheme={'black'}
                isOnColoredBackground={isColoredBackground(bgColor)}
              />
            </div>
          )}
        </div>
      )
    }
    return <></>
  }
}
