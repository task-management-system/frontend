import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import Profile from '../profile/Profile';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Task Management System
        </Typography>
        <Profile />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
