export function QuoteMark({ width = '92', height = '80', fill = 'black' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 92 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M53.6243 40.1278C53.6243 17.1246 71.9226 2.8115 92 0V17.1246C82.0884 18.6582 73.7017 26.8371 73.7017 36.2939V40.1278H92V80H53.6243V40.1278ZM0 40.1278C0 17.1246 18.2983 2.8115 38.3757 0V17.1246C28.4641 18.6582 20.0773 26.8371 20.0773 36.2939V40.1278H38.3757V80H0V40.1278Z"
        fill={fill}
      />
    </svg>
  )
}
