import { SelectInput } from './Select'

export function SortBy({ sort, setSort, options, value }) {
  return (
    <SelectInput
      options={options}
      value={value}
      name="sort"
      onChange={setSort}
      placeholder="Sort by"
    />
  )
}
