import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import useStyles from './styles';

interface TextParamViewProps {
  label: string;
  name: string;
  value?: string;
  editing: boolean;
  disabled?: boolean;
  render?: (value: string | undefined) => React.ReactNode;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const TextParamView: React.FC<TextParamViewProps> = ({
  label,
  name,
  value,
  editing,
  disabled = false,
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
        disabled={disabled}
        onChange={onChange}
        autoComplete="off"
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

export default TextParamView;
