import React, { useState, useEffect } from 'react';
import AutocompleteFormField, {
  AutocompleteFormFieldProps,
} from 'components/formik/AutocompleteFormField';
import { Executor } from 'types';
import { getUsers } from 'api/v1';

const ExecutorsAutocomplete: React.FC<
  Omit<
    AutocompleteFormFieldProps<Executor>,
    'options' | 'getOptionLabel' | 'getOptionSelected' | 'multiple'
  >
> = props => {
  const [executors, setExecutors] = useState<Executor[]>([]);

  useEffect(() => {
    getUsers().then(response => {
      setExecutors(response.data?.list || []);
    });
  }, []);

  return (
    <AutocompleteFormField
      {...props}
      options={executors}
      getOptionLabel={option => option.name || option.username}
      getOptionSelected={(option, value) => option.id === value.id}
      multiple
      filterSelectedOptions
    />
  );
};

export default ExecutorsAutocomplete;