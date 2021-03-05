import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

interface ContainerProps {
  className?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const Container: React.FC<ContainerProps> = ({ className, children }) => {
  const classes = useStyles();

  return <div className={clsx(className, classes.root)}>{children}</div>;
};

export default Container;
