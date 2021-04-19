import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import {
  Card,
  CardContent,
  CardActions,
  FormControlLabel,
  Switch,
  makeStyles,
  fade,
} from '@material-ui/core';
import { Formik, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import FullPage from 'components/common/FullPage';
import FormField from 'components/formik/FormField';
import PasswordField from 'components/common/PasswordField';
import NormalButton from 'components/themed/NormalButton';
import { REQUIRED_FIELD } from 'constants/fields';
import { setUser, setPermissions, setStatuses } from 'redux/actions/metaData';
import { authenticate, getPermissions, getStatuses } from 'api/v1';
import { setToken } from 'api/utils';
import { AuthWithUsername, AuthWithEmail } from 'types/api/v1';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `linear-gradient(40deg, transparent, ${fade(
      theme.palette.primary.dark,
      0.6
    )}), radial-gradient(circle at 0% 80%, ${fade(
      theme.palette.secondary.light,
      0.6
    )}, transparent)`,
    backgroundColor: '#3f3f3f',
  },
  card: {
    width: 480,
    margin: theme.spacing(2),
  },
  body: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  switch: {
    justifySelf: 'start',
  },
  actions: {
    padding: theme.spacing(2),
  },
}));

interface AuthForm {
  useEmail: boolean;
  username: string;
  email: string;
  password: string;
}

const initialValues: AuthForm = {
  useEmail: false,
  username: '',
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  useEmail: yup.boolean(),
  username: yup.string().when('useEmail', {
    is: false,
    then: yup.string().required(REQUIRED_FIELD),
  }),
  email: yup.string().when('useEmail', {
    is: true,
    then: yup.string().email('Невалидный адрес почты').required(REQUIRED_FIELD),
  }),
  password: yup.string().min(8, 'Минимальная длина 8').required(REQUIRED_FIELD),
});

const Auth: React.FC<ConnectedAuthProps> = ({ setUser, setPermissions, setStatuses }) => {
  const classes = useStyles();

  const sendData = async (values: AuthForm, helpers: FormikHelpers<AuthForm>) => {
    helpers.setSubmitting(true);

    const data = !values.useEmail
      ? ({ username: values.username, password: values.password } as AuthWithUsername)
      : ({ email: values.email, password: values.password } as AuthWithEmail);

    try {
      const response = await authenticate(data);
      const token = response.data?.token ?? null;
      await setToken(token);

      if (token !== null) {
        const [permissions, statuses] = await Promise.all([getPermissions(), getStatuses()]);

        setPermissions(permissions.data || []);
        if (statuses.data !== null && statuses.data.length > 0) {
          setStatuses(statuses.data);
        }
      }

      helpers.setSubmitting(false);

      setUser(response.data?.user ?? null);
    } catch (error) {
      helpers.setSubmitting(false);
    }
  };

  return (
    <FullPage className={classes.root}>
      <Card className={classes.card}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur
          onSubmit={sendData}
        >
          {({ values, handleChange, handleSubmit, submitForm, isSubmitting }) => (
            <Form>
              <CardContent className={classes.body}>
                {!values.useEmail ? (
                  <FormField
                    label="Имя пользователя"
                    name="username"
                    size="medium"
                    readOnly={isSubmitting}
                  />
                ) : (
                  <FormField
                    label="Почта"
                    type="email"
                    name="email"
                    size="medium"
                    readOnly={isSubmitting}
                  />
                )}
                <FormField
                  component={PasswordField}
                  label="Пароль"
                  name="password"
                  size="medium"
                  readOnly={isSubmitting}
                />
                <FormControlLabel
                  className={classes.switch}
                  control={
                    <Switch
                      color="primary"
                      name="useEmail"
                      checked={values.useEmail}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  }
                  label="По почте"
                />
              </CardContent>
              <CardActions className={classes.actions}>
                <NormalButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Войти
                </NormalButton>
              </CardActions>
            </Form>
          )}
        </Formik>
      </Card>
    </FullPage>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators({ setUser, setPermissions, setStatuses }, dispatch),
});

const connector = connect(null, mapDispatchToProps);

type ConnectedAuthProps = ConnectedProps<typeof connector>;

export default connector(Auth);
