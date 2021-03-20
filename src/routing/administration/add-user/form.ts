import * as yup from 'yup';
import { REQUIRED_FIELD } from 'constants/fields';

export const validationSchema = yup.object().shape({
  users: yup.array().of(
    yup.object().shape({
      username: yup.string().required(REQUIRED_FIELD),
      password: yup.string().min(8, 'Минимальная длина 8').required(REQUIRED_FIELD),
      name: yup.string(),
      email: yup.string().email('Невалидный адрес почты'),
      role: yup
        .object()
        .shape({
          id: yup.number(),
          power: yup.number(),
          text: yup.string(),
        })
        .nullable()
        .required(REQUIRED_FIELD),
    })
  ),
});

export const createUserTemplate = () => ({
  username: '',
  password: 'password',
  name: '',
  email: '',
  role: null,
});
