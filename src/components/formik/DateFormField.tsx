import React, { useCallback } from 'react';
import { useField } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ru } from 'date-fns/locale';
import { DATE_FORMAT } from 'constants/fields';
import { FieldProps, ExcessProps } from 'types/components/formik/field';

const DateFormField: React.FC<FieldProps & Omit<KeyboardDatePickerProps, ExcessProps>> = ({
  component: Component = TextField,
  label,
  name,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  const Field = useCallback((props: TextFieldProps) => <Component size="small" {...props} />, [
    Component,
  ]);

  const handleChange = (date: Date | null) => {
    helpers.setValue(date);
    helpers.setTouched(true);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
      <KeyboardDatePicker
        label={label}
        name={name}
        value={field.value}
        format={DATE_FORMAT}
        inputVariant="outlined"
        error={meta.touched && meta.error !== undefined}
        helperText={meta.touched ? meta.error || null : null}
        cancelLabel="Отмена"
        okLabel="Ок"
        TextFieldComponent={Field}
        KeyboardButtonProps={{
          size: 'small',
          edge: 'end',
        }}
        onChange={handleChange}
        onBlur={field.onBlur}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateFormField;
