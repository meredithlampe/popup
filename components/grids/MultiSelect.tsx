import { SquareFilled } from 'components/shared/icons/SquareFilled'
import { SquareOutline } from 'components/shared/icons/SquareOutline'
import Select from 'react-select'

// https://react-select.com/props#replacing-components
const CustomOption = ({ innerProps, innerRef, data, isSelected, options }) => {
  // find index of current option
  const index = options.findIndex((option) => option.value === data.value)
  return (
    <div
      {...innerProps}
      ref={innerRef}
      className={`bg-white hover:bg-lightestGray font-bold ${
        index != options.length - 1 ? 'border-b ' : ''
      }border-r border-l border-solid border-black cursor-pointer pt-[16px] pl-[21px] pr-[31px] pb-[20px]`}
    >
      <div className="flex gap-x-[10px] items-center">
        <div>{isSelected ? <SquareFilled /> : <SquareOutline />}</div>
        {data.label}
      </div>
    </div>
  )
}

export interface MultiSelectOption {
  label: string
  quantityIfSelected: number
  value: string
}

export function MultiSelect({ options, name, onChange, value = undefined }) {
  return (
    <Select
      name={name}
      isMulti
      unstyled
      value={value}
      options={options}
      onChange={onChange}
      className="multiselect"
      placeholder="Select"
      closeMenuOnSelect={false}
      closeMenuOnScroll={false}
      hideSelectedOptions={false}
      escapeClearsValue={false}
      isClearable={false}
      isSearchable={false}
      components={{ Option: CustomOption }}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: state.isFocused ? '1px solid #000' : '1px solid #ccc',
          borderColor: state.isFocused ? '#000' : '#ccc',
          fontWeight: 'bold',
          borderRadius: '0',
          paddingTop: '15px',
          paddingBottom: '18px',
          paddingLeft: '21px',
          paddingRight: '21px',
          outline: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexWrap: 'nowrap',
        }),
        valueContainer: (baseStyles, state) => ({
          display: 'flex',
          maxWidth: '100%',
          overflow: 'hidden',
          columnGap: '10px',
        }),
        multiValueRemove: (baseStyles) => ({
          display: 'none',
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          borderBottom: '1px solid #000',
        }),
      }}
    />
  )
}
