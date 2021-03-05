import React from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardActions, TextField, makeStyles, fade } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import FullPage from 'components/common/FullPage';
import PasswordField from 'components/common/PasswordField';
import NormalButton from 'components/themed/NormalButton';
import { setUser, setPermissions, setStatuses } from 'redux/actions/metaData';
import { authenticate, getPermissions, getStatuses } from 'api/v1';
import { setToken } from 'api/utils';
import { User, Permission, Status } from 'types';
import { Dispatch } from 'types/redux';
import { AuthForm } from 'types/components/auth';

interface AuthProps {}

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
  actions: {
    padding: theme.spacing(2),
  },
}));

const initialValues: AuthForm = {
  usernameOrEmail: '',
  password: '',
};

const Auth: React.FC<AuthProps & AuthDispatch> = ({ setUser, setPermissions, setStatuses }) => {
  const classes = useStyles();

  const sendData = async (values: AuthForm, helpers: FormikHelpers<AuthForm>) => {
    helpers.setSubmitting(true);

    const response = await authenticate(values);
    const token = response.data?.token ?? null;
    await setToken(token);

    if (token !== null) {
      const [permissions, statuses] = await Promise.all([getPermissions(), getStatuses()]);

      setPermissions(permissions.data || []);
      setStatuses(statuses.data || []);
    }

    helpers.setSubmitting(false);

    setUser(response.data?.user ?? null);
  };

  return (
    <FullPage className={classes.root}>
      <Card className={classes.card}>
        <Formik initialValues={initialValues} onSubmit={sendData}>
          {({ values, isSubmitting, handleChange, submitForm }) => (
            <>
              <CardContent className={classes.body}>
                <TextField
                  label="Имя пользователя"
                  name="usernameOrEmail"
                  value={values.usernameOrEmail}
                  variant="outlined"
                  disabled={isSubmitting}
                  onChange={handleChange}
                />
                <PasswordField
                  label="Пароль"
                  name="password"
                  value={values.password}
                  variant="outlined"
                  disabled={isSubmitting}
                  onChange={handleChange}
                />
              </CardContent>
              <CardActions className={classes.actions}>
                <NormalButton
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Войти
                </NormalButton>
              </CardActions>
            </>
          )}
        </Formik>
      </Card>
    </FullPage>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (payload: User | null) => dispatch(setUser(payload)),
  setPermissions: (payload: Permission[]) => dispatch(setPermissions(payload)),
  setStatuses: (payload: Status[]) => dispatch(setStatuses(payload)),
});

type AuthDispatch = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(Auth);
