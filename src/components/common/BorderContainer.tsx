import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

interface BorderContainerProps {
  className?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: theme.shape.borderRadius,
    boxSizing: 'border-box',
    display: 'grid',
    padding: theme.spacing(1.3125, 1.75),
    overflow: 'hidden',
    '&:hover': {
      borderColor: theme.palette.text.primary,
    },
    '&:focus-within': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
      '& > *': {
        margin: -1,
      },
    },
  },
  wrapper: {
    padding: theme.spacing(0, 6),
    overflow: 'hidden auto',
  },
}));

const BorderContainer: React.FC<BorderContainerProps> = ({ className, children }) => {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.wrapper}>{children}</div>
    </div>
  );
};

export default BorderContainer;
