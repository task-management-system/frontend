import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import Profile from '../profile/Profile';
import NavigationButton from './NavigationButton';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(0, 3),
    flexGrow: 1,
    alignSelf: 'stretch',
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Task Management System</Typography>
        <div className={classes.wrapper}>
          <NavigationButton to="/">Задачи</NavigationButton>
          <NavigationButton to="/administration">Администрирование</NavigationButton>
        </div>
        <Profile />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
