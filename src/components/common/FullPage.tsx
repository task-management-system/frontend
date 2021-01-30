import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

interface IFullPageProps {
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const FullPage: React.FC<IFullPageProps> = ({ className, children }) => {
  const classes = useStyles();

  return <div className={clsx(classes.root, className)}>{children}</div>;
};

export default FullPage;
