import React from 'react';
import { useField } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldProps, ExcessProps } from 'types/components/formik/field';

const FormField: React.FC<FieldProps & Omit<TextFieldProps, ExcessProps>> = ({
  component: Component = TextField,
  label,
  name,
  readOnly = false,
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <Component
      label={label}
      name={name}
      value={field.value}
      variant="outlined"
      size="small"
      error={meta.touched && meta.error !== undefined}
      helperText={meta.touched ? meta.error || null : null}
      onChange={field.onChange}
      onBlur={field.onBlur}
      InputProps={{
        readOnly,
        ...props.InputProps,
      }}
      {...props}
    />
  );
};

export default FormField;
