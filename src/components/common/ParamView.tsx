import React from 'react';
import { TextField, Typography, makeStyles } from '@material-ui/core';

interface IParamViewProps {
  label: string;
  name: string;
  value?: string;
  editing: boolean;
  render?: (value: string | undefined) => React.ReactNode;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: 40,
  },
  text: {
    fontSize: 13.5,
  },
}));

const ParamView: React.FC<IParamViewProps> = ({
  label,
  name,
  value,
  editing,
  render = value => value,
  onChange,
}) => {
  const classes = useStyles();

  if (editing) {
    return (
      <TextField
        label={label}
        name={name}
        value={value || ''}
        variant="outlined"
        size="small"
        onChange={onChange}
      />
    );
  } else {
    return (
      <div className={classes.root}>
        <Typography variant="subtitle2">{label}</Typography>
        <Typography className={classes.text} variant="body2">
          {render(value) || '—'}
        </Typography>
      </div>
    );
  }
};

export default ParamView;
