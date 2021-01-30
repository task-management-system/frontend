import React from 'react';
import { makeStyles } from '@material-ui/core';
import Navbar from './Navbar';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    minHeight: '100vh',
    display: 'grid',
    gridTemplateRows: 'max-content 1fr',
  },
  content: {
    overflow: 'auto',
  },
}));

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Layout;
