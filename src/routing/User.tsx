import React, { useState } from 'react';
import { TextField, Typography, makeStyles, Checkbox } from '@material-ui/core';
import FormControl from 'components/themed/FormControl';

interface IUserProps {}

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  columns: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

const User: React.FC<IUserProps> = () => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);

  return (
    <div className={classes.root}>
      <Typography variant="h6">Профиль пользователя {_props.username}</Typography>
      <div className={classes.columns}>
        <FormControl label="Логин">
          <TextField variant="outlined" />
        </FormControl>
        <FormControl label="Почта">
          <TextField variant="outlined" />
        </FormControl>
        <FormControl label="Пароль">
          <TextField variant="outlined" />
        </FormControl>
        <FormControl label="Имя">
          <TextField variant="outlined" />
        </FormControl>
        <FormControl label="Активен" flow="row">
          <Checkbox />
        </FormControl>
      </div>
    </div>
  );
};

export default User;

const _props = {
  username: 'John',
};
