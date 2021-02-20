import { FormikErrors, FormikTouched } from 'formik';

export interface IFieldProps<T> {
  name: string;
  errors?: FormikErrors<T>;
  touched?: FormikTouched<T>;
}
