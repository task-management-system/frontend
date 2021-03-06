import React from 'react';
import clsx from 'clsx';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    textDecoration: 'none',
  },
}));

const Link: React.FC<NavLinkProps> = props => {
  const classes = useStyles();

  return <NavLink {...props} className={clsx(classes.root, props.className)} />;
};

export default Link;
