import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

type ClickableAreaProps = Omit<React.HTMLProps<HTMLButtonElement>, 'type'>;

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    border: 'none',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    textAlign: 'inherit',
    backgroundColor: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
  },
}));

const ClickableArea: React.FC<ClickableAreaProps> = ({ className, children, ...props }) => {
  const classes = useStyles();

  return (
    <button className={clsx(classes.root, className)} type="button" {...props}>
      {children}
    </button>
  );
};

export default ClickableArea;
