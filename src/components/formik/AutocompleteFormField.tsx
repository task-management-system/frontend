import React from 'react';
import { useField } from 'formik';
import { TextFieldProps } from '@material-ui/core';
import AutocompleteField, { AutocompleteFieldProps } from 'components/common/AutocompleteField';
import { FieldProps, ExcessProps } from 'types/components/formik/field';

const AutocompleteFormField = <T,>({
  label,
  name,
  ...props
}: React.PropsWithChildren<
  FieldProps & Omit<AutocompleteFieldProps<T>, ExcessProps> & Omit<TextFieldProps, ExcessProps>
>) => {
  const [field, meta, helpers] = useField(name);

  return (
    <AutocompleteField
      id={name}
      label={label}
      name={name}
      value={field.value}
      variant="outlined"
      size="small"
      error={meta.touched && meta.error !== undefined}
      helperText={meta.touched ? meta.error || null : null}
      onChange={(name, value) => helpers.setValue(value)}
      onBlur={field.onBlur}
      {...props}
    />
  );
};

export default AutocompleteFormField;
