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
}));

const NoMatch: React.FC = () => {
  const classes = useStyles();

  return (
    <FullPage>
      <div className={classes.root}>
        <Typography variant="h3">Страница не найдена</Typography>
        <Typography variant="body1">Мы не смогли найти Вашу страницу 🙁</Typography>
        <RouteButton to="/" variant="contained" color="primary">
          Перейти на главную
        </RouteButton>
      </div>
    </FullPage>
  );
};

export default NoMatch;
