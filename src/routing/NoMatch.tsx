import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import FullPage from 'components/common/FullPage';
import RouteButton from 'components/common/RouteButton';

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 'max-content',
    justifyItems: 'start',
  },
  buttons: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    justifyContent: 'space-between',
  },
  button: {
    minWidth: 120,
  },
}));

const NoMatch: React.FC = () => {
  const classes = useStyles();

  return (
    <FullPage>
      <div className={classes.root}>
        <Typography variant="h3">Страница не найдена</Typography>
        <Typography variant="body1">Мы не смогли найти Вашу страницу 🙁</Typography>
        <div className={classes.buttons}>
          <RouteButton className={classes.button} back variant="contained" color="primary">
            Назад
          </RouteButton>
          <RouteButton className={classes.button} to="/" variant="contained" color="primary">
            На главную
          </RouteButton>
        </div>
      </div>
    </FullPage>
  );
};

export default NoMatch;
