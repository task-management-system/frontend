import React from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, makeStyles } from '@material-ui/core';

interface IAdministrationProps {}

const useStyles = makeStyles(theme => ({}));

const Administration: React.FC<IAdministrationProps> = props => {
  const classes = useStyles();

  // TODO Сделать проверку на роль пользователя
  if (false) {
    return <Redirect to="/" />;
  }

  return <Typography variant="h3">Administration</Typography>;
};

export default Administration;
