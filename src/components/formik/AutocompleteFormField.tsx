import React from 'react';
import { getIn } from 'formik';
import { TextFieldProps } from '@material-ui/core';
import AutocompleteField, { AutocompleteFieldProps } from 'components/common/AutocompleteField';
import { FieldProps } from 'types/components/formik/field';

const AutocompleteFormField = <U, T>({
  label,
  name,
  value,
  errors = {},
  touched,
  onChange,
  ...props
}: React.PropsWithChildren<
  FieldProps<U> & AutocompleteFieldProps<T> & Omit<TextFieldProps, 'onChange'>
>) => {
  const error = getIn(errors, name);
  const isTouched = touched !== undefined ? getIn(touched, name) !== undefined : true;

  return (
    <AutocompleteField
      label={label}
      name={name}
      value={value}
      variant="outlined"
      size="small"
      error={isTouched && error !== undefined}
      helperText={isTouched ? error || null : null}
      onChange={onChange}
      {...props}
    />
  );
};

export default AutocompleteFormField;
