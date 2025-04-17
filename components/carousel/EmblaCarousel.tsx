export function EmblaCarousel({ emblaRef, children }) {
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>
    </div>
  )
}
