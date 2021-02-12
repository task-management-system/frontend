import React from 'react';
import { getIn } from 'formik';
import { TextFieldProps } from '@material-ui/core';
import AutocompleteField, { IAutocompleteFieldProps } from 'components/common/AutocompleteField';
import { IFieldProps } from 'types/components/formik/field';

const AutocompleteFormField = <U, T>({
  label,
  name,
  value,
  errors,
  onChange,
  ...props
}: React.PropsWithChildren<
  IFieldProps<U> & IAutocompleteFieldProps<T> & Omit<TextFieldProps, 'onChange'>
>) => {
  const error = getIn(errors, name);

  return (
    <AutocompleteField
      label={label}
      name={name}
      value={value}
      variant="outlined"
      size="small"
      error={error !== undefined}
      helperText={error || null}
      onChange={onChange}
      {...props}
    />
  );
};

export default AutocompleteFormField;
