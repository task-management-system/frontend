import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  FormControlLabel,
  Switch,
  makeStyles,
  fade,
} from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import FullPage from 'components/common/FullPage';
import PasswordField from 'components/common/PasswordField';
import NormalButton from 'components/themed/NormalButton';
import { setUser, setPermissions, setStatuses } from 'redux/actions/metaData';
import { setStatus } from 'redux/actions/tabs';
import { authenticate, getPermissions, getStatuses } from 'api/v1';
import { setToken } from 'api/utils';
import { User, Permission, Status } from 'types';
import { Dispatch } from 'types/redux';
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
  username: string;
  email: string;
  password: string;
}

const initialValues: AuthForm = {
  username: '',
  email: '',
  password: '',
};

const Auth: React.FC<AuthDispatch> = ({ setUser, setPermissions, setStatuses, setStatus }) => {
  const classes = useStyles();
  const [isEmail, setIsEmail] = useState(false);

  const sendData = async (values: AuthForm, helpers: FormikHelpers<AuthForm>) => {
    helpers.setSubmitting(true);

    const data = !isEmail
      ? ({ username: values.username, password: values.password } as AuthWithUsername)
      : ({ email: values.email, password: values.password } as AuthWithEmail);
    const response = await authenticate(data);
    const token = response.data?.token ?? null;
    await setToken(token);

    if (token !== null) {
      const [permissions, statuses] = await Promise.all([getPermissions(), getStatuses()]);

      setPermissions(permissions.data || []);
      if (statuses.data !== null && statuses.data.length > 0) {
        setStatuses(statuses.data);
        setStatus(statuses.data[0].id);
      }
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
                {!isEmail ? (
                  <TextField
                    label="Имя пользователя"
                    name="username"
                    value={values.username}
                    variant="outlined"
                    disabled={isSubmitting}
                    onChange={handleChange}
                  />
                ) : (
                  <TextField
                    label="Почта"
                    type="email"
                    name="email"
                    value={values.email}
                    variant="outlined"
                    disabled={isSubmitting}
                    onChange={handleChange}
                  />
                )}
                <PasswordField
                  label="Пароль"
                  name="password"
                  value={values.password}
                  variant="outlined"
                  disabled={isSubmitting}
                  onChange={handleChange}
                />
                <FormControlLabel
                  className={classes.switch}
                  control={
                    <Switch
                      checked={isEmail}
                      onChange={() => setIsEmail(isEmail => !isEmail)}
                      name="isEmail"
                      color="primary"
                    />
                  }
                  label="По почте"
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
  setStatus: (payload: number) => dispatch(setStatus(payload)),
});

type AuthDispatch = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(Auth);
