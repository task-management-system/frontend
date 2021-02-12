import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  users: yup.array().of(
    yup.object().shape({
      username: yup.string().required('Является обязательным'),
      password: yup.string().min(8, 'Минимальная длина 8').required('Является обязательным'),
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
        .required('Является обязательным'),
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
