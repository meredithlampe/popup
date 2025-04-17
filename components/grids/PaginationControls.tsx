import { RightArrow } from 'components/shared/RightArrow'
import { useState } from 'react'

export function PaginationControls({
  page,
  setPage,
  totalPages,
}: {
  page: number
  setPage: (page: number) => void
  totalPages: number
}) {
  const [rightArrowHovering, setRightArrowHovering] = useState(false)
  const [leftArrowHovering, setLeftArrowHovering] = useState(false)
  return (
    <div className="flex gap-x-[133px] items-center justify-center">
      <div
        className={`rotate-180 ${
          page && page > 1 ? 'cursor-pointer' : 'cursor-not-allowed'
        }`}
        onMouseEnter={() => setLeftArrowHovering(true)}
        onMouseLeave={() => setLeftArrowHovering(false)}
        onClick={() => {
          if (page && page > 1) {
            setPage(page - 1)
            // scroll to top of page
            window.scrollTo(0, 0)
          }
        }}
      >
        {page && page > 1 ? (
          <RightArrow
            width="20"
            height="17"
            fill={leftArrowHovering ? '#727379' : 'black'}
          />
        ) : (
          <RightArrow width="20" height="17" fill="#727379" />
        )}
      </div>
      <div className="flex gap-x-[8px] font-bold">
        {Array.from(Array(totalPages)).map((_, index) => (
          <h6
            key={index}
            className={`cursor-pointer hover:text-[#727379] ${
              page == index + 1 ? 'text-[#727379]' : ''
            }`}
            onClick={() => {
              setPage(index + 1)
              // scroll to top of page
              window.scrollTo(0, 0)
            }}
          >
            {index + 1}
          </h6>
        ))}
      </div>
      <div
        className={`${
          page == totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={() => {
          if (page && totalPages && page < totalPages) {
            setPage(page + 1)
            // scroll to top of page
            window.scrollTo(0, 0)
          }
        }}
        onMouseEnter={() => setRightArrowHovering(true)}
        onMouseLeave={() => setRightArrowHovering(false)}
      >
        {page < totalPages ? (
          <RightArrow
            width="20"
            height="17"
            fill={rightArrowHovering ? '#727379' : 'black'}
          />
        ) : (
          <RightArrow width="20" height="17" fill="#727379" />
        )}
      </div>
    </div>
  )
}
