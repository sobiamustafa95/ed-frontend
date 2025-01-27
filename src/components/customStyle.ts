import { StylesConfig } from 'react-select';

import { IDropdownOption } from '@/@types';

export const customStyles: StylesConfig<IDropdownOption, false> = {
  control: (provided, state) => ({
    ...provided,
    'display': 'flex',
    'minHeight': '40px',
    'maxHeight': '40px',
    'fontSize': '12px',
    'borderRadius': '8px',
    'border': `2px solid ${state.isFocused ? '#6666FF' : '#E7E7E7'}`,
    '&:hover': {
      borderColor: state.isFocused ? '#6666FF' : '#E7E7E7',
    },
    'cursor': 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    background: '#fff',
    zIndex: 9999,
    borderRadius: '8px',
    padding: '10px',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '12px',
    backgroundColor: state.isFocused ? '#EAF3F8' : '#fff',
    color: state.isSelected ? '#6666FF' : '#000',
    cursor: 'pointer',
  }),
  indicatorsContainer: () => ({
    display: 'flex',
    flexDirection: 'row',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    'color': '#6666FF',
    '&:hover': {
      color: '#6666FF',
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  placeholder: (provided) => ({
    ...provided,
    padding: '0 2px',
    color: 'gray',
    fontSize: '12px',
  }),
};
