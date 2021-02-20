import React from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardActions, TextField, makeStyles, fade } from '@material-ui/core';
import { Formik } from 'formik';
import FullPage from 'components/common/FullPage';
import PasswordField from 'components/common/PasswordField';
import NormalButton from 'components/themed/NormalButton';
import { setUser, setPermissions } from 'redux/actions/metaData';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { authenticate, getPermissions } from 'api/v1';
import { setToken } from 'api/utils';
import { TDispatch, TPayload } from 'types/redux';
import { IAuthForm } from 'types/components/auth';

interface IAuthProps {
  setUser: (payload: TPayload) => void;
  setPermissions: (payload: TPayload) => void;
}

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

const initialValues: IAuthForm = {
  usernameOrEmail: '',
  password: '',
};

const Auth: React.FC<IAuthProps> = props => {
  const classes = useStyles();

  const sendData = async (values: IAuthForm) => {
    const response = await authenticate(values);
    const token = response.data?.token ?? null;
    await setToken(token);

    if (token !== null) {
      const permissionsResponse = await getPermissions();
      props.setPermissions(permissionsResponse.data || []);
    }

    props.setUser(response.data?.user ?? null);
  };

  const [inProgress, trackedSendData] = usePromiseTrack(sendData);

  return (
    <FullPage className={classes.root}>
      <Card className={classes.card}>
        <Formik initialValues={initialValues} onSubmit={trackedSendData}>
          {({ values, handleChange, submitForm }) => (
            <>
              <CardContent className={classes.body}>
                <TextField
                  label="Имя пользователя"
                  name="usernameOrEmail"
                  value={values.usernameOrEmail}
                  variant="outlined"
                  disabled={inProgress}
                  onChange={handleChange}
                />
                <PasswordField
                  label="Пароль"
                  name="password"
                  value={values.password}
                  variant="outlined"
                  disabled={inProgress}
                  onChange={handleChange}
                />
              </CardContent>
              <CardActions className={classes.actions}>
                <NormalButton
                  color="primary"
                  variant="contained"
                  disabled={inProgress}
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

const mapDispatchToProps = (dispatch: TDispatch) => ({
  setUser: (payload: TPayload) => dispatch(setUser(payload)),
  setPermissions: (payload: TPayload) => dispatch(setPermissions(payload)),
});

export default connect(null, mapDispatchToProps)(Auth);
