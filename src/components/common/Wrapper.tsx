import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

interface WrapperProps {
  className?: string;
  outlined?: boolean;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    overflow: 'hidden',
    '&$outlined': {
      padding: theme.spacing(1),
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: theme.shape.borderRadius,
    },
  },
  outlined: {},
}));

const Wrapper: React.FC<WrapperProps> = ({ className, outlined = false, children }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, outlined && classes.outlined, className)}>{children}</div>
  );
};

export default Wrapper;
