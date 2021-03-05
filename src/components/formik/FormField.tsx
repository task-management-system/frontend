import React from 'react';
import { getIn } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldProps } from 'types/components/formik/field';

const FormField = <U,>({
  component: Component = TextField,
  label,
  name,
  value,
  errors = {},
  touched,
  onChange,
  ...props
}: React.PropsWithChildren<FieldProps<U> & TextFieldProps>) => {
  const error = getIn(errors, name);
  const isTouched = touched !== undefined ? getIn(touched, name) !== undefined : true;

  return (
    <Component
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
