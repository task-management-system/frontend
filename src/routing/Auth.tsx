import React from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardActions, TextField, makeStyles } from '@material-ui/core';
import PasswordField from 'components/common/PasswordField';
import NormalButton from 'components/themed/NormalButton';
import { updateAuthorized } from 'redux/actions/metaData';
import { TDispatch, TPayload } from 'redux/types';

interface IProps {
  updateAuthorized: (payload: TPayload) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

const Auth: React.FC<IProps> = props => {
  const classes = useStyles();

  const handleClick = () => {
    props.updateAuthorized(true);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.body}>
          <TextField label="Имя пользователя" variant="outlined" />
          <PasswordField label="Пароль" variant="outlined" />
        </CardContent>
        <CardActions className={classes.actions}>
          <NormalButton color="primary" variant="contained">
            Войти
          </NormalButton>
          <NormalButton color="secondary" variant="contained" onClick={handleClick}>
            Типа Войти
          </NormalButton>
        </CardActions>
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch: TDispatch) => ({
  updateAuthorized: (payload: TPayload) => dispatch(updateAuthorized(payload)),
});

export default connect(null, mapDispatchToProps)(Auth);
