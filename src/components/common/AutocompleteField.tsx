import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { Autocomplete, AutocompleteProps } from '@material-ui/lab';

interface AutocompleteFieldBase<T> {
  label: string;
  name: string;
  options?: T[];
  getOptionLabel: (option: T) => string;
  getOptionSelected: (option: T, value: T) => boolean;
  filterSelectedOptions?: boolean;
  onBlur?: (event: React.FocusEvent<any>) => void;
}

export type AutocompleteFieldSingleProps<T> = AutocompleteFieldBase<T> & {
  multiple?: false;
  value: T | null;
  onChange: (name: string, value: T | null) => void;
};

export type AutocompleteFieldMultipleProps<T> = AutocompleteFieldBase<T> & {
  multiple?: true;
  value: T[] | null;
  onChange: (name: string, value: T[] | null) => void;
};

type AutocompleteFieldProps<T> = (
  | AutocompleteFieldSingleProps<T>
  | AutocompleteFieldMultipleProps<T>
) &
  Omit<TextFieldProps, 'value' | 'onChange'> &
  Omit<AutocompleteProps<T, boolean, false, false>, 'value' | 'onChange' | 'renderInput'>;

const AutocompleteField = <T,>({
  label,
  name,
  value,
  options = [],
  multiple = false,
  filterSelectedOptions = false,
  getOptionLabel,
  getOptionSelected,
  onChange,
  onBlur,
  ...props
}: React.PropsWithChildren<AutocompleteFieldProps<T>>) => {
  return (
    <Autocomplete
      id={props.id}
      value={value}
      options={options}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      renderInput={params => (
        <TextField {...params} label={label} variant="outlined" size="small" {...props} />
      )}
      onChange={(event, value) => onChange(name, value as any)}
      onBlur={onBlur}
      multiple={multiple}
      filterSelectedOptions={filterSelectedOptions}
      ChipProps={{
        size: 'small',
      }}
    />
  );
};

export default AutocompleteField;
