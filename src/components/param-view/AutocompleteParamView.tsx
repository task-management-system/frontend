import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import useStyles from './styles';
import { Autocomplete } from '@material-ui/lab';

interface IAutocompleteParamViewProps<T> {
  label: string;
  name: string;
  value: T | null;
  options?: T[];
  getOptionLabel: (option: T) => string;
  getOptionSelected: (option: T, value: T) => boolean;
  editing: boolean;
  render?: (value: T | null) => React.ReactNode;
  onChange: (name: string, value: T | null) => void;
}

const AutocompleteParamView = <T,>({
  label,
  name,
  value,
  options = [],
  getOptionLabel,
  getOptionSelected,
  editing,
  render = value => value,
  onChange,
}: React.PropsWithChildren<IAutocompleteParamViewProps<T>>) => {
  const classes = useStyles();

  if (editing) {
    return (
      <Autocomplete
        value={value}
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionSelected={getOptionSelected}
        renderInput={params => (
          <TextField {...params} label={label} variant="outlined" size="small" />
        )}
        onChange={(event, value) => onChange(name, value)}
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

export default AutocompleteParamView;
