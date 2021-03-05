import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

export interface AutocompleteFieldProps<T> {
  label: string;
  name: string;
  value: T | null;
  options?: T[];
  getOptionLabel: (option: T) => string;
  getOptionSelected: (option: T, value: T) => boolean;
  onChange: (name: string, value: T | null) => void;
}

const AutocompleteField = <T,>({
  label,
  name,
  value,
  options = [],
  getOptionLabel,
  getOptionSelected,
  onChange,
  ...props
}: React.PropsWithChildren<AutocompleteFieldProps<T> & Omit<TextFieldProps, 'onChange'>>) => {
  return (
    <Autocomplete
      value={value}
      options={options}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      renderInput={params => (
        <TextField {...params} label={label} variant="outlined" size="small" {...props} />
      )}
      onChange={(event, value) => onChange(name, value)}
    />
  );
};

export default AutocompleteField;
