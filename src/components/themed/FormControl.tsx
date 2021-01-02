import React from 'react';
import clsx from 'clsx';
import { Typography, makeStyles } from '@material-ui/core';

interface IFormControlProps {
  label: string;
  flow?: 'row' | 'column';
}

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(0.5),
    display: 'grid',
  },
  flowRow: {
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    alignItems: 'center',
    '& > $label': {
      gridRow: 1,
      gridColumn: 2,
    },
  },
  flowColumn: {
    gridAutoFlow: 'row',
    gridAutoRows: 'max-content',
    '& > $label': {
      justifySelf: 'start',
    },
  },
  label: {
    cursor: 'pointer',
  },
}));

const FormControl: React.FC<IFormControlProps> = ({ children, label, flow = 'column' }) => {
  const classes = useStyles();

  return (
    <label
      className={clsx(
        classes.root,
        flow === 'row' && classes.flowRow,
        flow === 'column' && classes.flowColumn
      )}
    >
      <Typography className={classes.label} variant="subtitle2" component="p">
        {label}
      </Typography>
      {children}
    </label>
  );
};

export default FormControl;
