import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './styles';
import AutocompleteField, { AutocompleteFieldProps } from 'components/common/AutocompleteField';

interface AutocompleteParamViewProps<T> {
  editing: boolean;
  render?: (value: T | null) => React.ReactNode;
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
}: React.PropsWithChildren<AutocompleteParamViewProps<T> & AutocompleteFieldProps<T>>) => {
  const classes = useStyles();

  if (editing) {
    return (
      <AutocompleteField
        label={label}
        name={name}
        value={value}
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionSelected={getOptionSelected}
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

export default AutocompleteParamView;
