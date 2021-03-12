import React from 'react';
import { useField } from 'formik';
import { TextFieldProps } from '@material-ui/core';
import { AutocompleteProps } from '@material-ui/lab';
import AutocompleteField, {
  AutocompleteFieldSingleProps,
  AutocompleteFieldMultipleProps,
} from 'components/common/AutocompleteField';
import { FieldProps, ExcessProps } from 'types/components/formik/field';

export type AutocompleteFormFieldProps<T> = FieldProps &
  (
    | Omit<AutocompleteFieldSingleProps<T>, ExcessProps>
    | Omit<AutocompleteFieldMultipleProps<T>, ExcessProps>
  ) &
  Omit<TextFieldProps, ExcessProps> &
  Omit<AutocompleteProps<T, boolean, false, false>, ExcessProps | 'renderInput'>;

const AutocompleteFormField = <T,>({
  label,
  name,
  ...props
}: React.PropsWithChildren<AutocompleteFormFieldProps<T>>) => {
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
      onChange={(name: any, value: any) => helpers.setValue(value)}
      onBlur={field.onBlur}
      {...props}
    />
  );
};

export default AutocompleteFormField;
