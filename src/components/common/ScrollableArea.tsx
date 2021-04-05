import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

interface ScrollableAreaProps {
  className?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    scrollbarWidth: 'thin',
    scrollbarColor: '#CDCDCD #F0F0F0',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: 8,
      height: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      border: '1px solid transparent',
      boxShadow: `inset 0 0 0 3px #CDCDCD`,
      '&:hover': {
        boxShadow: `inset 0 0 0 3px #A6A6A6`,
      },
      '&:active': {
        boxShadow: `inset 0 0 0 3px #606060`,
      },
    },
    '&::-webkit-scrollbar-track': {
      background: '#F0F0F0',
    },
  },
}));

const ScrollableArea: React.FC<ScrollableAreaProps> = ({ className, children }) => {
  const classes = useStyles();

  return <div className={clsx(classes.root, className)}>{children}</div>;
};

export default ScrollableArea;
