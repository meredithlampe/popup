export function LoadingCard({ aspectRatio = '[3/4]' }) {
  // only artwork is supported at the moment
  return (
    <div className="flex flex-col animate-pulse">
      <div className={`bg-lightestGray w-[100%] aspect-${aspectRatio}`}></div>
      <div className="mt-[10px]">
        <h5 className="font-bold italic">...</h5>
        <h5>...</h5>
      </div>
    </div>
  )
}
