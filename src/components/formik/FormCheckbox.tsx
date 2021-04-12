import React from 'react';
import { useField } from 'formik';
import { FormControlLabel, Checkbox, CheckboxProps } from '@material-ui/core';
import { CheckboxFieldProps, ExcessProps } from 'types/components/formik/field';

const FormCheckbox: React.FC<CheckboxFieldProps & Omit<CheckboxProps, ExcessProps>> = ({
  label,
  name,
  value,
  ...props
}) => {
  const [field] = useField(name);

  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          value={value}
          checked={field.value.includes(value)}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...props}
        />
      }
      label={label}
    />
  );
};

export default FormCheckbox;
