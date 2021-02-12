import { FormikErrors } from 'formik';

export interface IFieldProps<T> {
  name: string;
  errors: FormikErrors<T>;
}
