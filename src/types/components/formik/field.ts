import { TextFieldProps } from '@material-ui/core';
import { FormikErrors, FormikTouched } from 'formik';

export interface FieldProps<T> {
  component?: React.ComponentType<TextFieldProps>;
  name: string;
  errors?: FormikErrors<T>;
  touched?: FormikTouched<T>;
}
