import React from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardActions, TextField, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import FullPage from 'components/common/FullPage';
import PasswordField from 'components/common/PasswordField';
import NormalButton from 'components/themed/NormalButton';
import { setUser, setClaims } from 'redux/actions/metaData';
import { TDispatch, TPayload } from 'redux/types';
import { authentication, getClaims } from 'api/v1';
import { setToken } from 'api/utils';

interface IAuthProps {
  setUser: (payload: TPayload) => void;
  setClaims: (payload: TPayload) => void;
}

interface IAuthForm {
  username: string;
  password: string;
}

const useStyles = makeStyles(theme => ({
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
  username: '',
  password: '',
};

const Auth: React.FC<IAuthProps> = props => {
  const classes = useStyles();

  const handleSubmit = (values: IAuthForm): void => {
    authentication(values).then(async response => {
      const token = response.data?.token ?? null;

      await setToken(token);

      if (token !== null) {
        const claimsResponse = await getClaims();

        props.setClaims(claimsResponse.data || []);
      }

      props.setUser(response.data?.user ?? null);
    });
  };

  return (
    <FullPage>
      <Card className={classes.card}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange, submitForm }) => (
            <>
              <CardContent className={classes.body}>
                <TextField
                  label="Имя пользователя"
                  name="username"
                  value={values.username}
                  variant="outlined"
                  onChange={handleChange}
                />
                <PasswordField
                  label="Пароль"
                  name="password"
                  value={values.password}
                  variant="outlined"
                  onChange={handleChange}
                />
              </CardContent>
              <CardActions className={classes.actions}>
                <NormalButton color="primary" variant="contained" onClick={submitForm}>
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
  setClaims: (payload: TPayload) => dispatch(setClaims(payload)),
});

export default connect(null, mapDispatchToProps)(Auth);
