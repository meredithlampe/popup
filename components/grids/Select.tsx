import { Check } from 'components/shared/icons/Check'
import Select from 'react-select'

// https://react-select.com/props#replacing-components
const CustomOption = ({ innerProps, innerRef, data, isSelected }) => {
  return (
    <div
      {...innerProps}
      ref={innerRef}
      className="bg-white hover:bg-lightestGray font-bold border-b border-r border-l border-solid border-black cursor-pointer pt-[16px] pl-[21px] pr-[31px] pb-[20px]"
    >
      <div className="flex gap-x-[10px] items-center">
        <div className={isSelected ? '' : 'invisible'}>
          <Check />
        </div>
        {data.label}
      </div>
    </div>
  )
}

export function SelectInput({ options, name, onChange, placeholder, value }) {
  return (
    <Select
      name={name}
      unstyled
      options={options}
      onChange={onChange}
      className="multiselect"
      placeholder={placeholder}
      value={value}
      closeMenuOnScroll={false}
      hideSelectedOptions={false}
      isSearchable={false}
      escapeClearsValue={false}
      isClearable={false}
      components={{ Option: CustomOption }}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderBottom: state.isFocused ? '1px solid #000' : '1px solid #ccc',
          borderColor: state.isFocused ? '#000' : '#ccc',
          fontWeight: 'bold',
          borderRadius: '0',
          paddingTop: '15px',
          paddingBottom: '18px',
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
      }}
    />
  )
}
