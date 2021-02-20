import React from 'react';
import { getIn } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';
import { IFieldProps } from 'types/components/formik/field';

const FormField = <U,>({
  label,
  name,
  value,
  errors = {},
  touched,
  onChange,
  ...props
}: React.PropsWithChildren<IFieldProps<U> & TextFieldProps>) => {
  const error = getIn(errors, name);
  const isTouched = touched !== undefined ? getIn(touched, name) !== undefined : true;

  return (
    <TextField
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

export default FormField;
