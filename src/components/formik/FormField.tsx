import React from 'react';
import { getIn } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';
import { IFieldProps } from 'types/components/formik/field';

const FormField = <U,>({
  label,
  name,
  value,
  errors,
  onChange,
  ...props
}: React.PropsWithChildren<IFieldProps<U> & TextFieldProps>) => {
  const error = getIn(errors, name);

  return (
    <TextField
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

export default FormField;
