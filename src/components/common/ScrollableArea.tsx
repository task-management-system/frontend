import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

interface ScrollableAreaProps {
  className?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: 6,
      height: 6,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 3,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const ScrollableArea: React.FC<ScrollableAreaProps> = ({ className, children }) => {
  const classes = useStyles();

  return <div className={clsx(classes.root, className)}>{children}</div>;
};

export default ScrollableArea;
