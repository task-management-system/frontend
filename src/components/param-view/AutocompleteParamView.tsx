import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './styles';
import AutocompleteField, {
  AutocompleteFieldSingleProps,
} from 'components/common/AutocompleteField';

interface AutocompleteParamViewProps<T> {
  editing: boolean;
  disabled?: boolean;
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
  disabled = false,
  render = value => value,
  onChange,
}: React.PropsWithChildren<AutocompleteParamViewProps<T> & AutocompleteFieldSingleProps<T>>) => {
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
        multiple={false}
        disabled={disabled}
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
